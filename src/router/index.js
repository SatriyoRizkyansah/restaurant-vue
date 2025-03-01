import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Foods from "@/views/Foods.vue";
import FoodDetails from "@/views/FoodDetails.vue";
import Cart from "@/views/Cart.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/foods",
      name: "Foods",
      component: Foods,
    },
    {
      path: "/foods/:id",
      name: "FoodDetails",
      component: FoodDetails,
    },
    {
      path: "/cart",
      name: "Cart",
      component: Cart,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
