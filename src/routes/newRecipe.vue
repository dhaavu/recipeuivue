<template>
  <div class="contents">
    <h1>Edit Recipe</h1>
    <form class="card" action="">
      <div class="formInput">
        <h3>Id</h3>
        <input class="card" readonly type="text" v-model="row_id" />
      </div>
      <div class="formInput">
        <h3>Title</h3>
        <input class="card" type="text" v-model="name" />
      </div>
      <div class="formInput">
        <h3>Category</h3>
        <select class="card" v-model="type" name="category" id="category">
          <option selected>{{ type }}</option>
          <option v-for="category in categoryOptions" :key="category">{{
            category
          }}</option>
        </select>
      </div>
      <div class="formInput">
        <h3>Inage URL</h3>
        <input class="card" type="text" v-model="url" />
      </div>

      <div class="formInput">
        <h3>Procedure</h3>
        <div class="card editor" id="editorjs"></div>
      </div>
       <div class="btnGrp">
        <button class="btn" @click.prevent="saveEditor">Save</button>
      </div>
      <div class="formInput ">
        <h3>Procedure output</h3>
         <textarea
          class="card"
          name="procedure"
          id="procedure"
          cols="50"
          rows="10"
          v-model="procedureData"
        ></textarea>
      </div>
      <div class="formInput ">
        <h3>Procedure</h3>
        <textarea
          class="card"
          name="procedure"
          id="procedure"
          cols="50"
          rows="10"
          v-model="procedure"
        ></textarea>
      </div>
    
    
   
      <div class="btnGrp">
        <button @click.prevent="createRecipe" class="btn card">Submit</button>
        <router-link
          class="action btn"
          :to="{ path: '/recipeDetails/' + row_id }"
          >Cancel
        </router-link>
       
      </div>
    </form>
  </div>
</template>

<script>
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Paragraph from "editorjs-paragraph-with-alignment";
import List from "@editorjs/list";
import SimpleImage from "@editorjs/simple-image";
import Embed from "@editorjs/embed";
import RawTool from "@editorjs/raw";
//import edjsHTML from "editorjs-html"; 
var editor = "";
export default {
  data() {
    return {
      row_id: this.$route.params.id,
      name: "",
      type: "",
      procedure: "",
      procedureData: '{"time":1640672214340,"blocks":[{"id":"X4jxjpagY1","type":"header","data":{"text":"Testing","level":1}}],"version":"2.22.2"}', 
      ingredients: [
        {
          name: "",
          qty: "",
          measure: "",
          checked: false,
        },
      ],
      url: "",
    };
  },
  computed: {
    categoryOptions() {
      var categories = this.$store.getters.getCategories;
      return categories.filter(
        (category) => category.trim() != this.type.trim()
      );
    },
    getProcedureData(){
        console.log(this.procedureData)
        if(this.procedureData !="")
        return JSON.parse(this.procedureData);
        else 
        return "";  
    }
  },
  methods: {
        parseData(data) {
          var str = '<div class="proc" >'; 
          //console.log(data); 
          for(var i =0 ; i< data.length; i++){
              switch(data[i].type){
                  case 'header': 
                    str= str + `<h${data[i].data.level}>${data[i].data.text}</h${data[i].data.level}>`
                    break; 
                  case 'paragraph': 
                    str= str + `<p style="text-align: ${data[i].data.alignment}">${data[i].data.text}</p>`
                    break; 
                  case 'image': 
                    str = str + `<img src="${data[i].data.url}" />`
                  break; 
                  case 'embed': 
                    str = str + `<embed type="video/webm" src="${data[i].data.embed}">`; 
                  break; 
                  case 'list':
                    str = str + '<ul class="unlist" > ' 
                    for(var j =0; j< data[i].data.items.length; j++){
                        str =str + `<li>${data[i].data.items[j]} </li> `
                    }
                    str = str + '</ul>'
                  break; 
                  case 'raw': 
                  var code = data[i].data.html.replaceAll('&lt;','<' );
                  code = code.replaceAll('&gt;', '>')
                  str = str + code; 
                  break; 

              }
          }
          return str + '</div>'; 
      }, 
      loadEditor() {
        console.log("LoadingEditor......")
          editor = new EditorJS({
            holder: "editorjs",
            data: this.getProcedureData, 
            tools: {
              header: {
                class: Header,
                shortcut: "CMD+SHIFT+H",
              },
              list: {
                class: List,
              },
              paragraph: {
                class: Paragraph,
                config: {
                  placeholder: ".",
                },
              },
              image: SimpleImage,
              embed: {
                class: Embed,
                services: {
                  youtube: true,
                },
              },
              raw: RawTool,
            },
          });

          console.log(editor);
        },

        async createRecipe() {
          try {
            var editorData = await editor.save(); 
            this.procedure = this.parseData(editorData.blocks);
            this.procedureData = JSON.stringify(editorData);  
            var data = {
              name: this.name,
              procedure: this.procedure,
              type: this.type,
              url: this.url,
              id: this.row_id,
              procedureData: this.procedureData
            };
            console.log("Recipe creation data ....")
            console.log(data); 

            var resp = await fetch(
              "https://zen-recipe.herokuapp.com/api/recipe/new" ,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data), // body data type must match "Content-Type" header
              }
            );
            var respData = await resp.json();
            if (respData.msg == "success") {
              console.log('Successfully added the recipe '); 
              console.log(respData); 
              data.id = respData.recipe[0].row_id; 
              this.row_id = respData.recipe[0].row_id; 
              this.$store.commit("newRecipe", data);
              this.$router.push({ path: "/recipeDetails/" + this.row_id })
              // var updatedRecipe = {
              //   name: this.name,
              //   procedure: this.procedure,
              //   procedureData:this.procedureData, 
              //   type: this.type,
              //   url: this.url,
              //   row_id: this.row_id,
              // };
              // this.$store.commit("updateRecipe", updatedRecipe);
              // this.$router.push({ path: "/recipeDetails/" + this.row_id });
            }
          } catch (err) {
            console.log(err);
            alert("unable to uodate recipe: " + err);
          }
        }, 
          saveEditor() {
      editor
        .save()
        .then((outputData) => {
          console.log("Article data: ", outputData);
         // var edjsParser = edjsHTML();
          this.procedure = this.parseData(outputData.blocks);
          this.procedureData = JSON.stringify(outputData);  
        })
        .catch((error) => {
          console.log("Saving failed: ", error);
        });
    },    
  }, 
  mounted(){
     this.loadEditor(); 
     
    }

};
</script>

<style scoped>

.editor {
  width: 85%;
}

@media only screen and (max-width: 600px) {
 .editor{
   width:100%; 
 }
}
</style>
