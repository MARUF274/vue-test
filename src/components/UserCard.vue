<template>
<div class="card">

<div class="card-body text-center">
  <h5 class="card-title">{{ profile }}</h5>
  <div class="my-5">
  <a href="/supplier" class="btn col-12 my-3 btn-primary">Supplier</a>
  <a href="/home" class="btn col-12 my-3 btn-primary">Barang</a>
  </div>
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
