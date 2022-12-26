<template>
<div class="contents">
    <div class="toolbar">
       <router-link
          class="action "
          :to="{ path: '/editRecipe/' + row_id }"
          >Edit</router-link
        >
        <a href="#" @click="deleteRecipe" class="action">Delete</a>
    </div>
      <div class="title">
        {{name}}
    </div>
    <div class="image" :style="{background: 'url(' + url + ')'}"></div>
  
    <div class="category">
       <strong>Category: </strong> {{type}}
    </div>
    <div class="ingredientContents">
        <div class="ingHeader">
            <div class="ingTitle"><h2>Ingredients</h2></div>
            <div class="toolbar">
                <router-link class="action" :to="{path: '/recipe/addIngredient/' + this.row_id, query: {rowid: this.row_id, name: this.name}  }
                " >Add</router-link>
                <span @click="deleteIngredients" class="action">Delete </span>
            </div>
        </div>
        
    
        <ul class="ingredients">
            
            <ingredient-card v-for="ingredient in ingredients" 
            :key="ingredient.row_id" :row_id="ingredient.recipeIngredientId" :name="ingredient.name" 
            :qty="ingredient.qty" :measure="ingredient.measure" :selected="ingredient.checked"
            @selected="selected"/>
        </ul>
    </div>
    
    <div  class="procedure">
      <h2>Procedure</h2>
      <div class="procedureArea" v-html="procedure"></div>
    </div>
    <div id="scr"></div>
</div>
  
</template>

<script>
import ingredientCard from '../components/ingredientCard.vue'
export default {
name: 'recipeDetails', 
components: {
    ingredientCard
}, 
data(){
    return{
        row_id : this.$route.params.id, 
        name: '', 
        type: '', 
        procedure: '', 
        ingredients: [{
            recipeIngredientId: '', 
            name: '', 
            qty: '', 
            measure:'', 
            checked:false
        }], 
        url: ''

    }
} , 
async mounted(){
   this.row_id = this.$route.params.id; 
    //console.log(this.$store.state.data)
   var recipe = this.$store.getters.getRecipeById( this.row_id); 
    if (recipe == null || recipe == undefined || recipe == ""){
       try {
      var resp = await fetch("https://zen-recipe.herokuapp.com/api/recipe");
      var dataText = await resp.text();
      var data = JSON.parse(dataText);
      for(var i=0; i< data.recipe.length; i++ ){
         // console.log("Array Counter: " + i )
          if(data.recipe[i].ingredients.length == 1 ){
           //   console.log("Ingredient length == 1"); 
              if(data.recipe[i].ingredients[0].name === null) {
             //     console.log('recipe Ingredients ==> '); 
              //    console.log(data.recipe[i].ingredients); 
                  data.recipe[i].ingredients.pop(); 
              }
          }
      }
      this.$store.state.data = data.recipe;
     recipe = this.$store.getters.getRecipeById( this.row_id)
      console.log(this.$store.state.data);
    } catch (e) {
      console.log("Error Fetching Data");
      this.$store.state.hideError = false; 
      this.errorMessage = "Error Fetching Data - Technical error - " + e; 
    }
   }
    
    this.name = recipe.name ; 
    this.type = recipe.type; 
    this.procedure = recipe.procedure; 
    this.ingredients = recipe.ingredients; 
    this.url = recipe.url; 
}, 
methods:{
    selected(row_id ){
     
     //   console.log('Selected Ingredient Id: ' + row_id ); 
     //   console.log('Selected Ingredient name: ' + name ); 
        var index = this.ingredients.findIndex(ingredient => ingredient.recipeIngredientId === row_id); 
     //   console.log('index of the selected ingredinet: ' + index); 
        this.ingredients[index].checked = !this.ingredients[index].checked; 
       
    }, 
    async deleteIngredients(){
        var selectedIngredients = {}; 
        selectedIngredients.row_id = this.row_id
        selectedIngredients.ingredients = this.ingredients.filter(ingredient => ingredient.checked === true); 
        selectedIngredients.ingredients.forEach(ingredient => {
            delete ingredient.checked;             
        });
        this.$store.commit("deleteRecipeIngredients", selectedIngredients);
        this.ingredients = this.ingredients.filter(ingredient => !selectedIngredients.ingredients.filter(ing => ing.recipeIngredientId === ingredient.recipeIngredientId).length); 

    }, 
   async  deleteRecipe(){
       try{
          // var resp = await fetch('https://zen-recipe.herokuapp.com/api/recipe/' + this.row_id, {
             var resp = await fetch('http://localhost:4000/api/recipe/' + this.row_id, {
           
            method: "DELETE",
            headers: {
                  "Content-Type": "application/json",
                },
            }); 
            var respData = await resp.json(); 
            console.log('Delete recipe response ...'); 
            console.log(respData); 
            if(respData.msg == 'success'){
                console.log('Successfully deleted the recipe '); 
                console.log(respData); 
                this.$store.commit("deleteRecipe", this.row_id);
              this.$router.push({ path: "/" })
            }
            else {
                console.log('Error deleteing the recipe '); 
                console.log(respData);
            }
       }
       catch(err){
           console.log('Error Deleting the recipe in catch  '); 
           console.log(err); 
       }
       
    }
}
}
</script>

<style>
.contents{
text-align:center; 
}

.image{
    height:30vh; 
    width:100%; 
    background-position:center !important;
    background-size: cover !important;
    
    background-repeat: no-repeat !important;
    margin:0 auto; 
    box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important; 
}

.title{
    font-size: 29px;
    padding:20px; 
    border: 1px solid rgb(238, 236, 236); 
    box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important; 
    margin:2px auto;
    background:rgb(248, 248, 248)
}
.category{
    font-size: 1.25rem;
    margin:2px auto; 
    text-align: left;
    border: 1px solid rgb(238, 236, 236); 
    box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important; 
    padding:1rem; 
}
.ingredientContents{
box-shadow: 0 .5rem 1rem rgba(0,0,0,.15); 
padding:20px; 
}
.ingTitle{
    text-align: left;
}
.ingredients{
    display:flex; 
    gap:10px; 
    margin:10px auto; 
    flex-wrap: wrap;
    justify-content: center;
    
    padding:20px; 
}


.procedure{
      font-size: 1.25rem;
    margin:25px auto; 
    text-align: left;
    border: 1px solid rgb(238, 236, 236); 
    box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important; 
    padding:1rem; 
    
}


.procedureArea {
    text-align:center ;
    padding: 30px;
}

.procedureArea img{
    width:90%; 
    margin: 30px auto; 
    box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important; 
   
}
.procedureArea embed{
    width:90%; 
    margin: 30px auto; 
    box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important; 
   min-height: 100vh;
}

.procedureArea p{
   text-align: left;
  
}

.unlist {
 display: block;
 text-align: left;
}
.unlist li{
    list-style: disc;
}

.ingHeader{
    display: flex;
    justify-content: space-between;
}

@media only screen and (max-width: 600px) {
 .procedureArea embed{
    width:100%; 
   
}
.procedureArea embed{
    width:100%; 

}
}
</style>