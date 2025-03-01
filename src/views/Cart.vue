<template>
  <div class="cart">
    <navbar :updateOrders="carts" />

    <div class="container">
      <!-- Breadmbumb -->
      <div class="row mt-4">
        <div class="col">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
              <li class="breadcrumb-item"><router-link to="/foods">Foods</router-link></li>
              <li class="breadcrumb-item active" aria-current="page"><strong>Cart</strong></li>
            </ol>
          </nav>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <h2>Keranjang <strong>Saya</strong></h2>
        </div>
        <div class="table-responsive mt-3">
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Foto</th>
                <th scope="col">Makanan</th>
                <th scope="col">Keterangan</th>
                <th scope="col">Jumlah</th>
                <th scope="col">Harga</th>
                <th scope="col">Total Harga</th>
                <th scope="col">Hapus</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(cart, index) in carts" :key="cart.id">
                <th scope="row">{{ index + 1 }}</th>
                <td>
                  <img :src="'assets/images/menus/' + cart.product.gambar" class="rounded img-fluid shadow" alt="..." />
                </td>
                <td>
                  <strong>{{ cart.product.nama }}</strong>
                </td>
                <td>{{ cart.pesan.keterangan }}</td>
                <td>{{ cart.pesan.jumlah_pemesanan }}</td>
                <td>Rp. {{ cart.product.harga }}</td>
                <td>Rp. {{ cart.product.harga * cart.pesan.jumlah_pemesanan }}</td>
                <td class="text-danger" align="center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16" @click="deleteCart(cart.id)">
                    <path
                      d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"
                    />
                  </svg>
                </td>
              </tr>

              <tr>
                <td colspan="6" align="right">
                  <strong>Total Harga : </strong>
                </td>
                <td align="right">
                  <strong>Rp. {{ total_harga }}</strong>
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Form Checkout -->
      <div class="row justify-content-end">
        <div class="col-md-4">
          <form v-on:submit.prevent="pesanFood">
            <div class="form-group">
              <label for="nama">Nama</label>
              <input type="text" class="form-control" id="nama" v-model="pesan.nama" />
            </div>
            <div class="form-group mt-2">
              <label for="nomer_meja">Nomer Meja</label>
              <input type="text" class="form-control" id="nomer_meja" v-model="pesan.nomer_meja" />
            </div>

            <button type="submit" class="btn btn-success mt-2 float-end" @click="checkout">
              <div class="float-start">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-plus-fill mb-1 me-1" viewBox="0 0 16 16">
                  <path
                    d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0"
                  />
                </svg>
              </div>
              Checkout
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue";
import { ref, onMounted } from "vue";
import axios from "axios";
import { useToast } from "vue-toast-notification";
import { useRouter } from "vue-router";

const toast = useToast();
const carts = ref([]);
const total_harga = ref(0);
const pesan = ref({});
const router = useRouter();

const getCart = (data) => {
  carts.value = data;
  getTotalHarga();
};

// const getTotalHarga = () => {
//   total_harga.value = 0;
//   for (let i = 0; i < carts.value.length; i++) {
//     total_harga.value += carts.value[i].product.harga * carts.value[i].pesan.jumlah_pemesanan;
//   }
// };

const deleteCart = (id) => {
  axios
    .delete("http://localhost:3000/carts/" + id)
    .then(() => {
      toast.success("Cart berhasil dihapus .", {
        type: "success",
        position: "top-right",
        duration: 3000,
        dismissible: true,
      });

      // Update data keranjang
      axios
        .get("http://localhost:3000/carts/")
        .then((response) => {
          console.log("berhasil", response);
          getCart(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
};

onMounted(() => {
  axios
    .get("http://localhost:3000/carts/")
    .then((response) => {
      console.log("berhasil", response);
      getCart(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

const getTotalHarga = () => {
  total_harga.value = carts.value.reduce((total, cart) => {
    return total + cart.product.harga * cart.pesan.jumlah_pemesanan;
  }, 0);
};

const checkout = () => {
  if (pesan.value.nama && pesan.value.nomer_meja) {
    const finalOrders = [pesan.value, carts.value];
    axios
      .post("http://localhost:3000/orders/", finalOrders)
      .then(() => {
        // Delete all carts
        carts.value.map((cart) => {
          axios.delete("http://localhost:3000/carts/" + cart.id).catch((error) => {
            console.log(error);
          });
        });

        router.push({ path: "/orders" });
        toast.success("Checkout berhasil dibuat .", {
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
    toast.error("Nama dan nomer meja harus di isi!", {
      type: "error",
      position: "top-right",
      duration: 3000,
      dismissible: true,
    });
  }
};
</script>

<style></style>
