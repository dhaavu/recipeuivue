<template>
<div class="app">
 <Header :menu="getHeader" :title="'Slurp'"></Header>
 <div class="container mt-5">
  <router-view> </router-view>
  </div>
<Footer/>
</div>

</template>

<script>
import Header from './components/header.vue'
import Footer from './components/footer.vue'
export default {
 name: 'App', 
 components:{
   Header, 
   Footer 
 }, 
 computed:{
   getHeader(){
   //  console.log(this.$store.state.menu); 
    return this.$store.getters.getHeaderMenu; 
   }
 }
}
</script>

<style>
body{
  font-family: 'Exo', sans-serif;
  /* font-family: 'BenchNine', sans-serif; */
  box-sizing: border-box;
  margin:0px; 
  font-weight: bolder;
}

a{
  text-decoration: none;
  color:inherit; 
}

li{
  list-style: none;
}

.container{
width:95%; 
margin: 10px auto; 
}


.card{
  box-shadow: 0 .5rem 1rem rgba(0,0,0,.15); 
  border:1px solid rgb(230, 230, 230)
}

.shadow{
  box-shadow: 0 .5rem 1rem rgba(0,0,0,.15); 
}

.rounded{
  border-radius:10px; 
}
.roundedTop{
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.formInput {
  display: flex;
  flex-wrap: wrap;
  margin: 20px;
  justify-content: space-evenly;
  align-content: center;
  gap: 10px;
}


.formInput input {
  height: 40px;
  padding: 5px 25px;
  color: rgb(66, 66, 66);
  align-self: center;
  flex-grow: 4;
}

.formInput textarea {
  color: rgb(66, 66, 66);
  padding: 15px 25px;
  flex-grow: 4;
}

.formInput select {
  align-self: center;
  height: 40px;
  padding: 5px 25px;
  flex-grow: 4;

  outline:rgb(207, 25, 25);
}
.formInput h3 {

flex-basis: 30%;

}
form {
  /* padding: 20px;
  margin: 20px auto;
  gap: 10px; */
}


.btnGrp {
  display: flex;
  justify-content: center;
  gap: 50px;
  margin:20px 0px; 
}

input:focus {
    outline: #cf1819;
    border: 3px solid #cf1819 ;
}
.hide {
  display: none;
}

.toolbar{
    display:flex; 
    justify-content: right;
    align-items:flex-end;
    margin:10px; 
    gap:20px; 
}

.action {
   
   background: rgb(207, 25, 25);
  color:white; 
  padding:10px;
  font-weight: 500; 
  border-radius: 5px;
  cursor: pointer;
  border: none;
  font-size: 16px;

}

.btn{
  background: rgb(207, 25, 25);
  color:white; 
  padding:10px;
  font-weight: 500; 
  border-radius: 5px; 
  cursor: pointer;
   border: none;
   font-size: 16px;
  font-family: inherit;
}

.center{
  justify-content: center;
}

@media screen and (max-width: 600px) {
.formInput h3 {

flex-basis: 100%;

}

.formInput {
  margin: 5px;
  
}
}

/* spinner  */

.loader,
.loader:before,
.loader:after {
  background: #cf1919;
  -webkit-animation: load1 1s infinite ease-in-out;
  animation: load1 1s infinite ease-in-out;
  width: 1em;
  height: 4em;
}
.loader {
  color: #cf1919;
  text-indent: -9999em;
  margin: 88px auto;
  position: relative;
  font-size: 11px;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}
.loader:before,
.loader:after {
  position: absolute;
  top: 0;
  content: '';
}
.loader:before {
  left: -1.5em;
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}
.loader:after {
  left: 1.5em;
}
@-webkit-keyframes load1 {
  0%,
  80%,
  100% {
    box-shadow: 0 0;
    height: 4em;
  }
  40% {
    box-shadow: 0 -2em;
    height: 5em;
  }
}
@keyframes load1 {
  0%,
  80%,
  100% {
    box-shadow: 0 0;
    height: 4em;
  }
  40% {
    box-shadow: 0 -2em;
    height: 5em;
  }
}


</style>
