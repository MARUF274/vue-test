<template>
    <div class="container">
        <form @submit="createBarang">
            <div class="form-group">
                <label for="exampleInputEmail1">Nama barang</label>
                <input type="text" class="form-control" v-model="namaBarang" id="exampleInputEmail1"
                    aria-describedby="emailHelp" placeholder="Nama Barang">
            </div>

            <div class="form-group">
                <label for="exampleInputPassword1">Harga barang</label>
                <input type="number" class="form-control" v-model="harga" id="exampleInputPassword1"
                    placeholder="Harga Barang">
            </div>

            <div class="form-group">
                <label for="exampleInputPassword1">Stock barang</label>
                <input type="number" class="form-control" v-model="stok" id="exampleInputPassword1"
                    placeholder="Stock Barang">
            </div>

            <div class="form-group">
                <select v-model="selectedSupplier">
                    <option value="">Select Supplier</option>
                    <option v-for="supplier in datas" :value="supplier.id" :key="supplier.id">
                        {{ supplier.namaSupplier }}
                        {{ supplier.id }}
                    </option>
                </select>
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
                selectedSupplier: ''
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
                })
                .catch(error => {
                    console.log(error)
                })

            return {
                datas,
            }

        },
        methods: {
            createBarang(event) {
                event.preventDefault(); // Prevent form submission
                const selectedSupplier = this.datas.find(supplier => supplier.id === this.selectedSupplier);
                if (selectedSupplier) {
                    const parsedSupplier = JSON.parse(JSON.stringify(selectedSupplier));
                    // Perform actions with the selected supplier
                    console.log('Selected Supplier:', selectedSupplier);
                    const url = "http://159.223.57.121:8090/"
                    let token = localStorage.getItem('token')
                    const customConfig = {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    }
                    const payload = {
                        namaBarang: this.namaBarang, //string
                        harga: this.harga, //string
                        stok: this.stok, //string
                        supplier: parsedSupplier, //object
                    };
                    console.log(payload)
                    axios.post(`${url}barang/create`, payload, customConfig)
                        .then(response => {
                            this.$router.push('/home');
                        })
                        .catch(error => {
                            console.log(error)
                        })
                }
            }
        },

    }
</script>