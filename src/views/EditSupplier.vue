<template>
    <div class="container">
        <form @submit="editSupplier">
            <div class="form-group">
                <label for="exampleInputEmail1">Nama Supplier</label>
                <input type="text" class="form-control" v-model="namaSupplier" id="exampleInputEmail1"
                    aria-describedby="emailHelp" placeholder="Nama Barang">
            </div>

            <div class="form-group">
                <label for="exampleInputPassword1">Alamat Supplier</label>
                <input type="text" class="form-control" v-model="alamat" id="exampleInputPassword1"
                    placeholder="Harga Barang">
            </div>

            <div class="form-group">
                <label for="exampleInputPassword1">Nomer Telpon</label>
                <input type="text" class="form-control" v-model="noTelp" id="exampleInputPassword1"
                    placeholder="Stock Barang">
            </div>

            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>

<script>
    import {
        ref
    } from 'vue';
    import axios from 'axios';
    import {
        useRoute
    } from 'vue-router';

    export default {
        name: "Supplier",
        setup() {
            const id = useRoute().params.id;

            const namaSupplier = ref('');
            const alamat = ref('');
            const noTelp = ref('');

            const url = "http://159.223.57.121:8090/";
            const token = localStorage.getItem('token')
            const customConfig = {
                        headers: {
                            'Access-Control-Allow-Origin':  'http://127.0.0.1:8083',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    };
            axios.get(`${url}supplier/find-by-id/${id}`, customConfig)
                .then(response => {
                    const supplier = response.data.data;
                    namaSupplier.value = supplier.namaSupplier;
                    alamat.value = supplier.alamat;
                    noTelp.value = supplier.noTelp;

                })
                .catch(error => {
                    console.log(error);
                });
            return {
                namaSupplier,
                alamat,
                noTelp,
                id
            };

        },
        methods: {
            editSupplier(event) {
                event.preventDefault(); // Prevent form submission

                const url = "http://159.223.57.121:8090/";
                    let token = localStorage.getItem('token');
                    const customConfig = {
                        headers: {
                            'Access-Control-Allow-Origin':  'http://127.0.0.1:8083',
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    };
                    const payload = {
                        namaSupplier: this.namaSupplier,
                        alamat: this.alamat,
                        noTelp: this.noTelp,
                    };
                    let id = this.id
                    console.log(payload)
                    axios.put(`${url}supplier/update/${id}`, payload, customConfig)
                        .then(response => {
                            this.$router.push('/supplier');
                        })
                        .catch(error => {
                            console.log(error);
                        });

            }
        }
    };
</script>