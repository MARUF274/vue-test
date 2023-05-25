<template>
    <div class="container">
        <form @submit="createSupplier">
            <div class="form-group">
                <label for="exampleInputEmail1">Nama Supplier</label>
                <input type="text" class="form-control" v-model="namaSupplier" id="exampleInputEmail1"
                    aria-describedby="emailHelp" placeholder="Nama Supplier">
            </div>

            <div class="form-group">
                <label for="exampleInputPassword1">Alamat Supplier</label>
                <input type="text" class="form-control" v-model="alamat" id="exampleInputPassword1"
                    placeholder="Alamat">
            </div>

            <div class="form-group">
                <label for="exampleInputPassword1">Nomer Telepon</label>
                <input type="text" class="form-control" v-model="noTelp" id="exampleInputPassword1"
                    placeholder="Nomor Telepon">
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
                namaSupplier: '',
                alamat: '',
                noTelp: '',
            };
        },
        methods: {
            createSupplier(event) {
                
                event.preventDefault(); // Prevent form submission
                
                const url = "http://159.223.57.121:8090/"
                    let token = localStorage.getItem('token')
                    const customConfig = {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    }
                    const payload = {
                        namaSupplier: this.namaSupplier, //string
                        alamat: this.alamat, //string
                        noTelp: this.noTelp, //string
                    };
                    console.log(payload)
                    axios.post(`${url}supplier/create`, payload, customConfig)
                        .then(response => {
                            this.$router.push('/supplier');
                        })
                        .catch(error => {
                            console.log(error)
                        })
                
            }
        },

    }
</script>