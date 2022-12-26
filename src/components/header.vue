<template>
  <div class="header">
    <nav class="navbar">
      <div class="logo">
        <img src="../assets/logo.png" alt="">
      </div>
      <router-link class="navbar-brand" :to="{ path: '/' }">
        <h4>{{title}}</h4>
      </router-link>
      <div class="menu" @click="expandMenu">
        <span v-if="hide" class="material-icons burger">
          menu
        </span>
        <span v-if="!hide" class="material-icons">
          close
        </span>
       
      </div>
    </nav>
     <ul :class="{hide: hide}" class="menulist">
            <li  v-for="item in menu" :key="item.name" class="menuItem">
                <router-link :to="{ path: item.link }" >
                    {{item.name}}
                </router-link>
            </li>
        </ul>
  </div>
</template>

<script>
export default {
  name:"Header", 
  props: {
      title:String, 
      menu: Array
  }, 
  data(){
      return{
          hide: true
      }
  }, 
  methods: {
      expandMenu(){
          this.hide = !this.hide; 
      }
  }
};
</script>

<style scoped>
.hide{
    display:none; 
}
.menuItem{
    background: rgb(233, 232, 232); 
    margin-bottom: 1px; 
}

ul{
    padding:0; 
    margin:0; 
}
li{
    text-align: center;
    padding:10px; 
}

li:hover{
    background:rgb(207, 25, 25); 
    color: white; 
}
.navbar a{
  font-family: 'Bonheur Royale' ; 
  font-size: 3rem;

}
.navbar{
  box-shadow: 0 .5rem 1rem rgba(0,0,0,.15); 
  height: 85px;
  display:flex; 
  align-items: center;
  gap:20px; 
  justify-content:space-between; 
}
.navbar-brand{
  padding:10px;  
  flex-grow:4; 
  justify-content: center;
  display: flex;
}
.menu{
    width: 75px;
    text-align: center;
 flex-grow: 1;
}
.burger{
  cursor: pointer;
}
.logo img{
  width:75px; 
}
.logo{
  flex-grow: 1;
  text-align: right;
}
</style>

