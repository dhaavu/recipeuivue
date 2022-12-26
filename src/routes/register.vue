<template>
  <div>
      <h1>Register</h1>
      <input type="text" v-model="username" placeholder="User Name">
      <input type="email" v-model="email" placeholder="email">
       <input type="password" v-model="password" placeholder="Password">
      <input type="password" v-model="confirmPassword" placeholder="Confirm Password">
      
      <button @click.prevent="registerUser">Register</button>
        <div>{{submitData}}</div>
  </div>
</template>

<script>
export default {
name: 'register', 
methods: {
    registerUser(){
        this.submitData = this.username + this.email + this.password + this.confirmPassword; 
    }
}, 
data(){
    return { 
        submitData: '', 
        username: '', 
        email: '', 
        password: '', 
        confirmPassword: ''
    }
}
}
</script>

<style>

</style>