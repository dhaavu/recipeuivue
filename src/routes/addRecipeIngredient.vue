<template>
  <div class="contents">
      <h1>{{$route.query.name}}</h1>
      <h1>Add Ingredients</h1>
      <form  class="inputForm card ">
        <div class="formInput hide">
        <h3>Recipe Name</h3>
        <input class="card" type="text" v-model="recipe" readonly />
      </div>
       <div class="formInput hide" >
        <h3>Recipe Id</h3>
        <input class="card" type="text" v-model="id" readonly />
      </div>
        <div class="formInput hide">
        <h3>Ingredient Id</h3>
        <input class="card" type="text" v-model="ingredientId" readonly />
      </div>
       <div class="formInput">
        <h3>Ingredient Name</h3>
      <lookup @update="getIngredientLookup"> </lookup>
      </div>
       <div class="formInput">
        <h3>Quantity</h3>
        <input class="card" type="number"  v-model="quantity" />
      </div>
       <div class="formInput">
        <h3>Unit Of Measure</h3>
         <select class="card" name="uom" id="uom" v-model="uom">
                <option value="gram">Grams</option>
                <option value="unit">Piece</option>
                <option value="cups">Cups</option>
                <option value="Table Spoon">Table Spoon</option>
                <option value="Tea Spoon">Tea Spoon</option>
                <option value="Pinch">Pinch</option>
                 <option value="Cloves">Cloves</option>
                  <option value="Ounces">Ounces</option>
                 <option value="Pound">Pound</option>
                 <option value="Pound">Can</option>
          </select>
      </div>
      <div class="toolbar center">
                <button class="btn" @click.prevent="sendIngredient">Save</button>
                <router-link class="action" :to="{path: '/recipeDetails/' + this.id }
                " >Cancel</router-link>
           </div>
      </form>
  </div>
</template>

<script>
import lookup from '../components/lookup.vue'
export default {
components:{
lookup
}, 
props: {
  rowid: String, 
  name: String
}, 
data(){
  return {
    id: this.rowid, 
    recipe: this.name, 
    ingredient: '', 
    ingredientId: '', 
    quantity:0, 
    uom:''
  }
}, 
methods:{
   getIngredientLookup(name, id){
            this.ingredient = name;
            this.ingredientId = id;  
            //console.log("Ingredient is: " + this.ingredient); 
        }, 
    async sendIngredient(){
            var data = {}; 
          data.recipe_id = this.id; 
          data.ingredient_id = this.ingredientId; 
          data.qty= this.quantity; 
          data.measure = this.uom; 
          data.name = this.ingredient; 

        
          console.log(data); 
           var resp =  await fetch('https://zen-recipe.herokuapp.com/api/recipe/ingredient/new/', {
          //  var resp =  await fetch('http://localhost:4000/api/recipe/ingredient/new/', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }); 
           var respData = await resp.json(); 
          // console.log('Added Ingredient')
          // console.log(respData);  
            console.log(respData);  
            data.recipeIngredientId = respData.recipe_ingredient[0].row_id; 
           this.$store.commit("addRecipeIngredient", data);
           this.$router.push({ path: "/recipeDetails/" + this.id });    
        }
}
}
</script>

<style>

</style>