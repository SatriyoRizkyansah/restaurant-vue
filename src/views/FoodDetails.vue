<template>
  <Navbar />
  <div class="food-detail">
    <div class="container">
      <div class="row mt-4">
        <div class="col">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
              <li class="breadcrumb-item"><router-link to="/foods">Foods</router-link></li>
              <li class="breadcrumb-item active" aria-current="page"><strong>Food Detail</strong></li>
            </ol>
          </nav>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <img :src="'../assets/images/menus/' + product.gambar" alt="" class="img-fluid shadow rounded" />
        </div>
        <div class="col-md-6">
          <h2>
            <strong>{{ product.nama }}</strong>
          </h2>
          <hr />
          <h4>
            Harga : <strong>Rp.{{ product.harga }}</strong>
          </h4>
          <form v-on:submit.prevent="pesanFood">
            <div class="form-group">
              <label for="jumlah_pemesanan">Jumlah Pemesanan</label>
              <input type="number" class="form-control" v-model="pesan.jumlah_pemesanan" />
            </div>
            <div class="form-group mt-2">
              <label for="keterangan">Keterangan</label>
              <textarea name="keterangan" class="form-control" placeholder="Keterangan spt : Pedes, Nasi Setengah..." v-model="pesan.keterangan"></textarea>
            </div>

            <button type="submit" class="btn btn-success mt-2" @click="pemesanan">
              <div class="float-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-plus-fill mb-1 me-1" viewBox="0 0 16 16">
                  <path
                    d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0"
                  />
                </svg>
              </div>
              Pesan
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { watch } from "vue";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-default.css";
import { offset } from "@popperjs/core";

const route = useRoute();
const router = useRouter();
const toast = useToast();
const product = ref([]);
const pesan = ref({});

const pesanFood = () => {
  console.log("Pesan berhasil dikirim:", pesan.value);
};

const pemesanan = () => {
  const dataKirim = {
    product: product.value,
    pesan: pesan.value,
  };

  if (pesan.value.jumlah_pemesanan) {
    axios
      .post("http://localhost:3000/orders", dataKirim)
      .then(() => {
        router.push({ path: "/cart" });
        toast.success("Pesanan berhasil dibuat .", {
          type: "success",
          position: "top-right",
          duration: 3000,
          dismissible: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    toast.error("Jumlah pemesanan harus di isi!", {
      type: "error",
      position: "top-right",
      duration: 3000,
      dismissible: true,
    });
  }
};

const setProduct = (data) => {
  product.value = data;
};

onMounted(() => {
  axios
    .get("http://localhost:3000/products/" + route.params.id)
    .then((response) => {
      console.log("berhasil", response);
      setProduct(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});
</script>

<style></style>
