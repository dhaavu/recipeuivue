<template>
          <li @click="checkIngredient($event)" class="ingredient" :class="{checked: checked}">
            <p class='name'>{{name}}</p>
            <p class='qty'>{{qty}}</p>
            <p class='measure'>{{measure}}</p>
            <!-- <input v-model="checked" type="checkbox" name="check" class="check"> -->
            <span v-if="checked" class="check material-icons">
                check_box
            </span>
            <span  v-if="!checked" class="check material-icons">
                check_box_outline_blank
            </span>
           

        </li>
</template>

<script>
export default {
name: "ingredientCard", 
props: {
row_id: String, 
name: String, 
qty: Number, 
measure: String, 
selected: Boolean
},
data(){
return {
    checked: false
}
}, 
methods: {
    checkIngredient(){
        this.checked = !this.checked 
        this.$emit('selected', this.row_id);

    }
}
}
</script>

<style>
.ingredient{
    
    width:200px;
    height:200px;  
    border: 1px solid rgb(238, 236, 236); 
    box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important; 
    display:grid; 
    grid-template-columns: 50% 50%;
    grid-template-rows: auto;
      grid-template-areas: 
    "header header"
    "qty measure"
    "check check";
    row-gap: 0px;
}
.ingredient p{
    font-size: 1rem;
     border-bottom: 3px solid rgb(238, 236, 236); 
     justify-self: center;
     align-self:center;
     width:100%; 
     margin:0px; 
    padding-bottom: 20px;
}
.name {
    grid-area: header;
    font-size: 1.5rem !important;
}

.qty{
    grid-area: qty;
   border-right: 5px solid rgb(238, 236, 236); 
    
}
.measure{
    grid-area: measure;
    
}
.check{
    grid-area: check;
     justify-self: center;
     align-self:center;
    
      width:100%; 
     margin:0px; 
    padding-bottom: 20px;
     font-size: 1.5rem;
}

.checked{
    background:rgb(207, 25, 25); 
    color:white; 
}
.selected{
    display:none; 
}
</style>