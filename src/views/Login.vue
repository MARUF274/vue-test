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
            <form @submit="login" class="signin-form">
              <div class="form-group mb-3">
                <label class="label" for="name">Username</label>
                <input type="text" class="form-control" v-model="username" placeholder="Username" required="">
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
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    login() {
      this.$store.dispatch('login', {
        username: this.username,
        password: this.password,
      }).then(() => {
        // this.$router.push('/home'); // Redirect to the home page
        console.log("aaaaaaaa")
      });
    },
  },
};
</script>

<!-- <script>
import axios from 'axios'

export default {
    name: 'Login',
    data() {
      return {
        form: {
          username: '',
          profileName: '',
          password: ''
        }
      }
    },
    methods: {
      submitForm(event) {
        event.preventDefault()

        const url = 'http://159.223.57.121:8090/auth/register'
        const payload = {
          username: this.form.username,
          password: this.form.password,
          profileName: this.form.profileName
        }

        axios.post(url, payload)
          .then(response => {
            console.log(response.data)
            // Handle the response
          })
          .catch(error => {
            console.log(error)
            // Handle the error
          })
      }
    }
  }
</script> -->