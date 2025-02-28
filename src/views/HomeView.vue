<!-- <script>
import CardProducts from "@/components/CardProducts.vue";
import Hero from "@/components/Hero.vue";
import Navbar from "@/components/Navbar.vue";
import axios from "axios";

export default {
  name: "Home",
  components: {
    Navbar,
    Hero,
    CardProducts,
  },
  data() {
    return {
      products: [],
    };
  },
  methods: {
    setProduct(data) {
      this.products = data;
    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/products")
      .then(function (response) {
        console.log("berhasil", response);
      })
      .catch(function (error) {
        console.log(error);
      });
  },
};
</script> -->

<script setup>
import CardProducts from "@/components/CardProducts.vue";
import Hero from "@/components/Hero.vue";
import Navbar from "@/components/Navbar.vue";
import axios from "axios";
import { ref, onMounted } from "vue";

const products = ref([]);

const setProduct = (data) => {
  products.value = data;
};

onMounted(() => {
  axios
    .get("http://localhost:3000/best-products/")
    .then((response) => {
      console.log("berhasil", response);
      setProduct(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});
</script>

<template>
  <main>
    <div class="home">
      <Navbar />
      <div class="container">
        <Hero />

        <div class="row mt-4">
          <div class="col">
            <h2>Best <strong>Foods</strong></h2>
          </div>
          <div class="col">
            <router-link to="foods" class="btn btn-success float-end">Lihat Semua </router-link>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-md-4 mt-4" v-for="product in products" :key="product.id">
            <CardProducts :product="product" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
