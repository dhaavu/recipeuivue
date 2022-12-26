<template>
<div class="lookupWrapper">
     <div class="lookup">
      <input class="card" type="text" id="currentId" v-model="currentId" style="display:none">
      <input class="card" id="Ingredient" type="text" name="Ingredient" placeholder="Ingredient Name" v-model="currentValue" @keyup="search()" autocomplete="off" >
      <span class=" action action-icon material-icons material-icons-outlined" data-v-0d9f370a="" @click="addIngredient"> add </span>
    </div>
   
    <div id="text" v-if="ingredients.length != 0">
        <ul class="ul">
             <li  v-for="item in ingredients" :key="item.row_id" v-on:click="updateIngredient(item.name, item.row_id)">
                {{ item.name }}
            </li>
        </ul>
  
    </div>
</div>
 

</template>

<script>
export default {
props:{
        buttonText:String,  
        backgroundColor: String
    }, 
data(){
    return {
        ingredients: [], 
        currentValue: '', 
        currentId:''
    }
}, 

methods: {
    async search(){
        console.log(this.currentValue); 
        if(this.currentValue == ''){
            this.ingredients = []; 
        }else {
             var resp = await fetch('https://zen-recipe.herokuapp.com/api/ingredient')
            var arr = await resp.json(); 
            this.ingredients = arr.ingredient; 

            var exp = new RegExp(this.currentValue, 'i'); 
            var data = this.ingredients.filter(ingredient => exp.test(ingredient.name)); 
            if(data.length ==0)
            this.ingredients = []; 
            else 
            this.ingredients = data; 
           // console.log("This is the ingredients :" + this.ingredients[0].row_id); 
        
        } 
    } , 
     updateIngredient(name, id){
         console.log(name); 
         this.currentValue = name; 
         this.currentId= id; 
         this.ingredients = []; 
             this.$emit('update', this.currentValue, this.currentId); 
    }, 
    async addIngredient(){
        const rawResponse = await fetch('https://zen-recipe.herokuapp.com/api/ingredient/new/', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: this.currentValue})
        });
        const content = await rawResponse.json();
        this.currentId = content.ingredient[0].row_id; 
        this.$emit('update', this.currentValue, this.currentId); 
        
        console.log(content);
    }
},

}
</script>

<style scoped>
.ul li {
    list-style: none;
    text-align: left;

    padding: 10px 20px;

    border-bottom: 1px #8080803d solid;
  

}
.ul li:hover {
background: rgb(207, 25, 25);
color:white; 

}
.ul{
    padding: 0px;
    margin:0px; 
    border: 1px #8080806b solid;
    border-radius:0px; 

}
/* input{
    box-sizing: border-box;
    width:100%; 
     height:30px; 
    font-size: 20px;
    border-radius: 5px;
    padding:10px 20px; 
    margin-right: 10px; 
} */
.lookup{
    display: flex;
    align-items: center;
    gap: 20px;
}

.lookupWrapper{
    flex-grow: 2;
}
</style>