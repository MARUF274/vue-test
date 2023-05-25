<template>
    <div class="container-fluid d-flex" style="width: 99%;">
      <div class="py-5 m-2 col-3">
        <!-- //card -->
        <UserCard :profile="profile"></UserCard>
      </div>
      <div class="py-5 col-9 text-center d-flex">
        <div class="col-12">
          <table class="table table table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Nama Supplier</th>
                <th scope="col">Alamat Supplier</th>
                <th scope="col">No. telp Supplier</th>
                <th scope="col">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in datas" :key="item.id">
                <th scope="row">{{ item.id }}</th>
                <td>{{ item.namaSupplier }}</td>
                <td>{{ item.alamat }}</td>
                <td>{{ item.noTelp }}</td>
                <td>
                  <button class="btn btn-danger m-1" @click="deleteItem(item.id)">Delete</button>
                  <button class="btn btn-danger m-1" @click="editItem(item.id)">Edit</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script>
    import {
      ref
    } from 'vue'
    import axios from 'axios'
    import UserCard from '../components/UserCard.vue'
    export default {
      name: "Supplier",
      components: {
        UserCard
      },
      setup() {
        const datas = ref(null) // Create a reactive reference for datas
        // const userDatas = ref(null)
  
        const url = "http://159.223.57.121:8090/"
        const payload = {
          username: 'bbbbb',
          password: 'bbbbb'
        }
        axios.post(`${url}auth/login`, payload).then(response => {
            console.log(response.data)
            let userDatas = response.data.data.profileName
            token = response.data.data.token
  
            localStorage.setItem('user', userDatas)
            localStorage.setItem('token', token);
          })
          .catch(error => {
            console.log(error)
          })
        const params = {
          limit: 20,
          offset: 1
        }
        let token = localStorage.getItem('token')
        const customConfig = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
  
        axios.get(`${url}supplier/find-all`, {
            params,
            ...customConfig
          })
          .then(response => {
            datas.value = response.data.data
            console.log(response.data.data[0])
          })
          .catch(error => {
            console.log(error)
          })
        var profile = localStorage.getItem('user')
  
        const deleteItem = (itemId) => {
          axios.delete(`${url}supplier/delete/${itemId}`, customConfig)
            .then(response => {
              datas.value = datas.value.filter(item => item.id !== itemId);
            })
            .catch(error => {
              console.log(error);
            });
        };
  
        return {
          datas,
          profile,
          deleteItem
          // userDatas // Expose datas to the template
        }
      },
      methods: {
        editItem(id) {
        // Route to '/edit-barang' with the id parameter
        console.log(id);
        this.$router.push({
          name: 'EditSupplier',
          params: {
            id
          }
        });
      }
      }
  
    }
  </script>