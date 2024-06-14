<script setup lang="ts">
// import [imgs and icons ]
import logo from "~/assets/imgs/johar-brand.png";
import UserIcon from "./icons/UserIcon.vue";
import CartIcon from "./icons/CartIcon.vue";
import MenuIcon from "./icons/MenuIcon.vue";

// --- to toggleMenu [open & close ] ----
const active = ref(false);
const togglemenu = () => {
  active.value = !active.value;
};
// =========  Store =================
import { useProductStore } from "~/store/store";

const store = useProductStore();
const { size ,count } = storeToRefs(store);
</script>

<template>
  <header class="box_header">
    <div class="container mx-auto">
      <!-- =========== left side ============= -->
      <section class="header_left">
        <!-- Logo -->
        <nuxt-link to="/" class="box_logo">
          <img :src="logo" alt="joharLOGO" />
        </nuxt-link>

        <!-- links -->
        <ul>
          <li v-for="link in ['All', 'Apparel', 'Accessories']" :key="link">
            <nuxt-link
              :to="`/${link === 'All' ? '' : link}`"
              @click="size = ''"
              >{{ link }}</nuxt-link
            >
          </li>
        </ul>
      </section>

      <!-- =========== Right side ============= -->
      <section class="header_right">
        <!-- search -->
        <form action="/Search">
          <input
            type="search"
            name="search"
            placeholder="Search for products...."
          />
        </form>

        <!-- login -->
        <nuxt-link to="/login">
          <UserIcon />
        </nuxt-link>

        <!-- shopping bag cart -->
        <nuxt-link to="/cartView" class="relative">
          <CartIcon />
          <span
            class="absolute bottom-[-7px] right-[-6px] w-4 h-4
             bg-blue-400/100 text-sm font-normal flex justify-center items-center text-white p-1"
            >{{ count }}</span
          >
        </nuxt-link>

        <div class="menuIcon" @click="togglemenu">
          <MenuIcon />
        </div>
      </section>
    </div>

    <!-- ==== search_and_Links =============  -->
    <div
      class="search_and_Links absolute"
      :class="active ? 'translate-y-0' : 'translate-y-[-150vh]'"
    >
      <!-- search -->
      <input
        type="search"
        name="search"
        placeholder="Search for products...."
      />
      <!-- links -->
      <ul>
        <li v-for="link in ['All', 'Apparel', 'Accessories']" :key="link">
          <nuxt-link
            :to="`${link === 'All' ? '/' : link}`"
            @click="size = ''"
            >{{ link }}</nuxt-link
          >
        </li>
      </ul>
    </div>
  </header>
</template>

<style scoped>
/* ---- box_header --- */
.box_header .container {
  @apply justify-between;
}

/* ---- left side --- */
.box_header .box_logo img {
  @apply max-w-[150px];
}

.header_right ul li a {
  @apply text-neutral-500 font-medium;
}
/* ---- right side --- */
.header_right input {
  @apply w-[250px] max-w-full;
}
.menuIcon {
  @apply md:hidden flex;
}

/* --- common ----- */
.box_header .container,
.box_header .header_left,
.box_header .header_right,
.header_right ul {
  @apply flex gap-5 items-center;
}
.header_left ul,
.header_right input {
  @apply hidden md:flex gap-5;
}
.box_header input {
  @apply px-3 py-2 outline-none border-[1px] border-neutral-300 lg:w-[350px] rounded-md;
}

/* ---- search_and_Links ---- */
.search_and_Links {
  @apply bg-white w-full h-[100vh] z-[-1] p-3 transition-all duration-700;
}
.search_and_Links input {
  @apply w-full;
}
.search_and_Links ul {
  @apply flex flex-col w-full justify-start my-3;
}
.search_and_Links ul li {
  @apply border-t-[1px] p-3;
}
</style>
