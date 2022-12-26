<template>
<div>
     <h1>Login</h1>
     <div>The User is logged In : {{loggedIn}}</div>
  <button @click="login">Submit</button>
</div>
 
</template>

<script>
export default {
name: 'login', 
data(){
    return {
        loggedIn: false
    }
}, 
methods: {
    login(){
        this.loggedIn = true; 
        this.$store.commit("userLogin")
    }
}
}
</script>

<style>

</style>