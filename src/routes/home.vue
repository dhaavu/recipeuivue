<template>
  <div class="content">
   
    <Error :error="errorMessage" :hidden="$store.state.hideError"/>
   <div v-if="loading" class="loader">Loading...</div>
   <div v-else class="lists">

     <div class="toolbar">
     <div class="searchContainer card rounded">
        <span class=" search-icon action-icon material-icons material-icons-outlined"> search </span>
        <div class="inputContainer">
            <input type="text" class="search" v-on:keyup="search">
        </div>
      
     </div>
    
        <router-link
          class="action "
          :to="{ path: '/newRecipe'}"
          > <span class=" action-icon material-icons material-icons-outlined"> add </span>
        </router-link>

    </div>

    <div class="list">
      <Cards
        class="cards"
        v-for="item in items"
        :key="item.row_id"
        :url="item.url"
        :name="item.name"
        :procedure="item.procedure"
        :ingredients="item.ingredients"
        :category="item.category"
        :row_id="item.row_id"
      >
      </Cards>
    </div>
   </div>
   
  </div>
</template>

<script>
import Cards from "../components/cards.vue";
import Error from "../components/errorMessage.vue";
export default {
  name: "Home",

  components: { Cards, Error },

  data(){
    return {
      errorMessage: "Error will show here", 
      loading: true, 
      searchTerm: "", 
      items: []
    }
  }, 

  methods: {
    search(event){
      this.searchTerm = event.target.value; 
      if(this.searchTerm != ""){
           this.items = this.$store.state.data.filter(item => item.name.toLowerCase().includes(this.searchTerm.toLowerCase()) || item.type.toLowerCase().includes(this.searchTerm.toLowerCase())); 
      }
      else{
            this.items = this.$store.state.data; 
       }
   }
  }, 

  async mounted() {
    try {
      var resp = await fetch("https://zen-recipe.herokuapp.com/api/recipe");
      var dataText = await resp.text();
      var data = JSON.parse(dataText);
      this.$store.state.data = data.recipe;
      this.items = data.recipe; 
      this.loading = false; 
      console.log(this.$store.state.data);
    } catch (e) {
      console.log("Error Fetching Data");
      this.$store.state.hideError = false; 
      this.errorMessage = "Error Fetching Data - Technical error - " + e; 
    }
  },
};
</script>

<style scoped>
.list {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  justify-content: center;
}
.toolbar{
justify-content: center;
margin:20px auto; 
gap:10px; 
width:80%; 

}

.searchContainer{
  display: flex;
  flex-grow: 2;
  padding:10px; 
}
.inputContainer{
  flex-grow: 2;
}
.search{
  width: 100%;
  font-size: 20px;
  border:none; 
outline:none; 
}
.search:focus {
    border:none; 
    outline:none; 
}
.search-icon{
  font-size: 30px;
  color: grey; 
}

.loader{
  margin:40vh auto; 
}
</style>
