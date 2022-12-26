<template>
  <div class="errorContainer " >

    <div
    :class="{hidden: hidden}"
      class="message alert alert-warning alert-dismissible fade show"
      role="alert"
    >
      {{ error }}
      <button
        @click="close"
        type="button"
        class="close"
        data-dismiss="alert"
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Error",
  props: {
    error: {
      type: String,
      default: "",
    },
    hidden: {
      type: Boolean,
      default: true,
    },
  },

  methods: {
    close() {
     this.$store.state.hideError = true; 
    },
  },

};
</script>

<style scoped>
.hidden {
  display: none !important;
}
.errorContainer {
  display: flex;
  justify-content: center;
}

.message {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
}
</style>
