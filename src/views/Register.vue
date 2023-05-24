<template>
  <div>
    <h2>Register</h2>
    <form @submit="register">
      <input type="text" v-model="username" placeholder="Username" required>
      <input type="text" v-model="profileName" placeholder="Profile Name" required>
      <input type="password" v-model="password" placeholder="Password" required>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      profileName: '',
      password: '',
    };
  },
  methods: {
    register() {
      this.$store.dispatch('register', {
        username: this.username,
        profileName: this.profileName,
        password: this.password,
      }).then(() => {
        // this.$router.push('/');
        console.log("Aaaa")
      });
    },
  },
};
</script>
