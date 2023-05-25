<template>
    <div class="container">
        <form @submit="editBarang">
            <!-- <p v-for="item in datas" :key="item.id">
                {{ item.namaBarang }}
            </p> -->
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
                    <option v-for="supplier in datasSupplier" :value="supplier.id" :key="supplier.id">
                        {{ supplier.namaSupplier }}
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
    } from 'vue';
    import axios from 'axios';
    import {
        useRoute
    } from 'vue-router';

    export default {
        name: "Supplier",
        setup() {
            const id = useRoute().params.id;

            const namaBarang = ref('');
            const harga = ref('');
            const stok = ref('');
            const selectedSupplier = ref('');

            const datas = ref([]);
            const datasSupplier = ref([]);

            const url = "http://159.223.57.121:8090/";
            const params = {
                limit: 20,
                offset: 1
            };
            let token = localStorage.getItem('token');
            const customConfig = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            };

            axios.get(`${url}supplier/find-all`, {
                    params,
                    ...customConfig
                })
                .then(response => {
                    datasSupplier.value = response.data.data;
                    console.log(`all:`, response.data.data);
                })
                .catch(error => {
                    console.log(error);
                });

            axios.get(`${url}barang/find-by-id/${id}`, customConfig)
                .then(response => {
                    const barang = response.data.data;
                    namaBarang.value = barang.namaBarang;
                    harga.value = barang.harga;
                    stok.value = barang.stok;
                    selectedSupplier.value = barang.supplier.id;
                    console.log(`Find:`, barang);
                })
                .catch(error => {
                    console.log(error);
                });
            console.log(namaBarang)
            return {
                namaBarang,
                harga,
                stok,
                selectedSupplier,
                datas,
                datasSupplier,
                id
            };

        },
        methods: {
            editBarang(event) {
                event.preventDefault(); // Prevent form submission

                // Retrieve the selected supplier object
                const selectedSupplier = this.datasSupplier.find(supplier => supplier.id === this.selectedSupplier);

                if (selectedSupplier) {
                    const parsedSupplier = JSON.parse(JSON.stringify(selectedSupplier));

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
                        namaBarang: this.namaBarang,
                        harga: this.harga,
                        stok: this.stok,
                        supplier: parsedSupplier
                        // supplier: parsedSupplier
                    };
                    // const id = useRoute().params.id;
                    // console.log(this.id)
                    let id = this.id
                    console.log(payload)
                    axios.put(`${url}barang/update/${id}`, payload, customConfig)
                        .then(response => {
                            this.$router.push('/home');
                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
            }
        }
    };
</script>