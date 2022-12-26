<template>
  <div class="card shadow rounded" style="width: 20rem; min-height:635px;">
    <!-- <img class="card-img-top"  :src="url" alt="Card image cap"> -->
    <div
      class="imageHolder roundedTop shadow"
      :style="{ background: getImgURL }"
    ></div>
    <div class="card-body">

      <h5 class="card-title">{{ name }}</h5>
      <p class="card-text">{{ getProcedure }}</p>
     
        <router-link
          class="btn btn-danger "
          :to="{ path: '/recipeDetails/' + row_id }"
          >Details</router-link
        >

    </div>
  </div>
</template>

<script>
import jQuery from "jquery/src/jquery.js";

export default {
  name: "cards",
  props: {
    url: String,
    name: String,
    procedure: String,
    category: String,
    ingredients: Array,
    row_id:String
  },
  computed: {
    getProcedure() {
      // console.log(this.name + '~~~~~~~~~~~~' + jQuery(this.procedure).text())
      if (this.procedure != "" && jQuery(this.procedure).text() != "")
        return jQuery(this.procedure).text().substring(0,200)+ '....';
      else return this.procedure;
    },
    getImgURL() {
     // console.log("return URL is -----" + this.url);
      return "url(" + this.url + ")";
    },
  },
  mounted() {
    //console.log(this.url);
  },
};
</script>

<style scoped>
.imageHolder {
  width: 100%;
  height:18rem; 
  background-size: cover !important;
  background-repeat: no-repeat !important;
}
.card-body{
  padding:10px; 
}
.card-text {
  overflow: hidden;
  text-overflow: ellipsis;
  margin:0px 0px 20px 0px; 
  padding: 0px 10px;  
  height:150px; 
}
.card-title {

  overflow: hidden;
  text-overflow: ellipsis;
  font-size:24px; 
  height:65px; 
}



.card-img-top {
  object-fit: cover;
}

.card-body {
  text-align: center;
}

h5{
  margin:20px auto; 
}

/* .btn{
  width:50%; 
  margin:10px auto; 
} */
</style>
