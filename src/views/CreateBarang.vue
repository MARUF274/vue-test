<template>
    <div class="container">
        <form @submit="createBarang">
            <div class="form-group">
                <label for="exampleInputEmail1">Nama barang</label>
                <input type="email" class="form-control" v-model="namaBarang" id="exampleInputEmail1"
                    aria-describedby="emailHelp" placeholder="Nama Barang">
            </div>

            <div class="form-group">
                <label for="exampleInputPassword1">Harga barang</label>
                <input type="text" class="form-control" v-model="harga" id="exampleInputPassword1"
                    placeholder="Harga Barang">
            </div>

            <div class="form-group">
                <label for="exampleInputPassword1">Stock barang</label>
                <input type="text" class="form-control" v-model="stok" id="exampleInputPassword1"
                    placeholder="Stock Barang">
            </div>

            <div class="form-group">
                <label for="exampleInputPassword1">Supplier</label>
                <input type="text" class="form-control" v-model="supplier" id="exampleInputPassword1"
                    placeholder="Supplier">
            </div>

            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
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
        data() {
            return {
                namaBarang: '',
                harga: '',
                stok: '',
                supplier: {},
            };
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

            return {
                datas,
            }
        },
        methods: {
            createStore() {
                const url = "http://159.223.57.121:8090/"
                const payload = JSON.stringify({
                    namaBarang: this.namaBarang,
                harga: this.harga,
                stok: this.stok,
                supplier: {},
                });
                axios.post()
            },
        },

    }
</script>