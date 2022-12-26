import { createApp } from 'vue'
import { createStore} from 'vuex'; 
import {createRouter, createWebHistory} from 'vue-router'
import App from './App.vue'
import Home from './routes/home.vue'; 
import About from './routes/about.vue'; 
import RecipeDetails from './routes/recipeDetails.vue'
import EditRecipe from './routes/editRecipe.vue'
import AddRecipeIngredient from './routes/addRecipeIngredient.vue'
import NewRecipe from './routes/newRecipe.vue'
import Profile from './routes/profile.vue'
import Login from './routes/login.vue'
import Register from './routes/register.vue'
//import 'bootstrap/dist/css/bootstrap.min.css'

//import 'bootstrap/dist/js/bootstrap.min.js'
//import { createPopper } from '@popperjs/core';
const app = createApp(App)
const route = createRouter({
    history:createWebHistory(), 
    routes: [{
        path: '/', 
        name: 'home', 
        component: Home, 
        props:true
    }, 
    {
        path: '/newRecipe', 
        name: 'new', 
        component: NewRecipe, 
        props:true
    }, 
    {   
        path: '/about',
        name: 'about',  
        component: About
    }, 
    {   
        path: '/profile',
        name: 'profile',  
        component: Profile
    }, 
    {   
        path: '/login',
        name: 'login',  
        component: Login
    }, 
    {   
        path: '/register',
        name: 'register',  
        component: Register
    }, 
    {   
        path: '/recipeDetails/:id',
        name: 'recipeDetails',  
        component: RecipeDetails, 
       
    }, 
    {
        path:'/editRecipe/:id', 
        name: 'editRecipe', 
        component: EditRecipe
    }, 
    {
        path: '/recipe/addIngredient/:id', 
        name: 'addRecipeIngredient', 
        component: AddRecipeIngredient, 
        props:  (route) => ({ rowid: route.query.rowid, name: route.query.name  })
        
        
       
    }], 
    scrollBehavior (to, from, savedPosition) {
        if (savedPosition) {
          return savedPosition
        } else {
          return {  left: 0, top: 0}
        }
      }
    
    
})

const store = createStore({
    state(){
        return {
            hideError:true, 
            category:['Appetizer', 'Entry', 'Breakfast', 'Drinks', 'Dessert', 'Side'], 
            menu: [{ 
                name: 'Home', 
                link: '/'
              },
               { name: 'About', 
               link:'/about'
               }, 
            {name: 'Login', 
            link: '/login' }, 
            {
                name: 'Register', 
                link: '/register', 
            }], 
            data: [{
                name: "", 
                procedure: "", 
                procedureData:"", 
                row_id: "", 
                url: "", 
                type: "", 
                ingredients: []
            }]
        }
    }, 
    getters: {
       
            getRecipeById: (state) => (id) => {
             var resp =   state.data.find(recipe => recipe.row_id == id); 
            console.log('Recipe getter data ')
             console.log(resp); 
              return resp 
            }, 
            getCategories: (state) => {
                return state.category; 
            }, 
            getHeaderMenu: (state) => {
                return state.menu; 
            } 
        
    }, 
    mutations:{
        userLogin (state){
            state.menu = state.menu.filter(item => item.name !== 'Login'); 
            state.menu = state.menu.filter(item => item.name !== 'Register'); 
            state.menu.push({
                name: 'Profile', 
                link: '/profile'
            })
            
        }, 
        createRecipe(state, data){
            state.data.push(data); 
            console.log("Recipe insert complete..."); 
            console.log(state.data); 

        }, 
        updateRecipe(state, updatedRecipe){
            console.log('Recipe Data ')
            console.log(updatedRecipe); 
            var recipeIndex =  state.data.findIndex(recipe => recipe.row_id == updatedRecipe.row_id)
            state.data[recipeIndex].name  = updatedRecipe.name; 
            state.data[recipeIndex].row_id  = updatedRecipe.row_id; 
            state.data[recipeIndex].procedure  = updatedRecipe.procedure; 
            state.data[recipeIndex].type  = updatedRecipe.type;
            state.data[recipeIndex].url  = updatedRecipe.url; 
            state.data[recipeIndex].procedureData  = updatedRecipe.procedureData; 
            console.log('state'); 
            console.log(state.data);
        }, 
        deleteRecipe(state, row_id){
            var recipeIndex = state.data.findIndex(recipe => recipe.row_id === row_id ); 
            if (recipeIndex != -1 ){
                state.data.splice(recipeIndex, 1)
            }
        }, 
        addRecipeIngredient(state, data){ 
         
            var recipeIndex = state.data.findIndex(recipe => recipe.row_id == data.recipe_id ); 
            state.data[recipeIndex].ingredients.push({ingredientId: data.ingredient_id, measure: data.measure, name: data.name, qty: data.qty, recipeIngredientId: data.recipeIngredientId})   

        }, 
        async deleteRecipeIngredients(state, data){
           // console.log('Ingredients to be deleted : '); 
           // console.log(data);
           data.ingredients.forEach(async (ingredient) => {
            var resp = await fetch(
                "https://zen-recipe.herokuapp.com/api/recipe/ingredient/" + ingredient.recipeIngredientId,
                {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  }
                }
              );
              var respData = await resp.json();
              if (respData.msg == "success") {
                  console.log("ingredient Deleted "); 
                  console.log(respData); 
              } 
           }); 
         
            var recipeIndex = state.data.findIndex(recipe => recipe.row_id === data.row_id); 
            state.data[recipeIndex].ingredients =  state.data[recipeIndex].ingredients.filter(ingredient => !data.ingredients.filter(ing => ing.recipeIngredientId === ingredient.recipeIngredientId).length); 
            
            // console.log('Ingredients after deleted : '); 
           // console.log(state.data[recipeIndex]); 

        }
    }
})

app.use(route); 
app.use(store); 

app.mount('#app'); 
