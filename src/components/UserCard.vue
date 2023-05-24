<template>
<div class="card">

<div class="card-body text-center">
  <h5 class="card-title">{{ profile }}</h5>
  <a href="#" class="btn btn-primary">Go somewhere</a>
</div>
</div>
</template>

<script>
export default {
  data() {
    return {
      profile: localStorage.getItem('user'),
      // Other data properties
    };
  },
};
</script>
