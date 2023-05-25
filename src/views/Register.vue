<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-12 col-lg-10">
        <div class="wrap justify-content-center d-md-flex">
          <div class="login-wrap p-4 p-md-5">
            <div class="d-flex">
              <div class="w-100">
                <h3 class="mb-4">Sign In</h3>
              </div>
              <div class="w-100">
                <p class="social-media d-flex justify-content-end">
                  <a href="#" class="social-icon d-flex align-items-center justify-content-center"><span
                      class="fa fa-facebook"></span></a>
                  <a href="#" class="social-icon d-flex align-items-center justify-content-center"><span
                      class="fa fa-twitter"></span></a>
                </p>
              </div>
            </div>
            <form @submit="register" class="signin-form">
              <div class="form-group mb-3">
                <label class="label" for="name">Username</label>
                <input type="text" class="form-control" v-model="username" placeholder="Username" required="">
              </div>
              <div class="form-group mb-3">
                <label class="label" for="name">Profile Name</label>
                <input type="text" class="form-control" v-model="profileName" placeholder="Profile Name" required="">
              </div>
              <div class="form-group mb-3">
                <label class="label" for="password">Password</label>
                <input type="password" class="form-control" v-model="password" placeholder="Password" required="">
              </div>
              <div class="form-group">
                <button type="submit" class="form-control btn btn-primary rounded submit px-3">Login</button>
              </div>
              <div class="form-group d-md-flex">
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "Login",
    data() {
      return {
        username: '',
        password: '',
        profileName: ''
      };
    },
    methods: {
      register(event) {

        event.preventDefault(); // Prevent form submission

        const url = "http://159.223.57.121:8090/"
        const customConfig = {
          headers: {
            'Content-Type': 'application/json',
          }
        }
        const payload = {
          username: this.username,
          password: this.password,
          profileName: this.profileName
        };
        console.log(payload)
        axios.post(`${url}auth/register`, payload, customConfig)
          .then(response => {
            console.log(response.data)
            // let token = response.data.data.token
            // localStorage.setItem('token', token)
            this.$router.push('/');
          })
          .catch(error => {
            console.log(error)
          })

      }
    },

  }
</script>