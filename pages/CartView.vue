<script setup>
import { useProductStore } from "~/store/store";

const store = useProductStore();
const { Cart ,totalPrice } = storeToRefs(store);
const { removeFromCart } = store;

const getImagePath = (imageName) => {
  return new URL(`../assets/imgs/${imageName}.webp`, import.meta.url).href;
};
useHead({
  title: "Shopping Cart"
})
</script>
<template>
  <div class="cartPage">
    <div class="container">
      <h3 class="text-2xl font-semibold my-3">Your Shopping Cart</h3>
      <div v-if="Cart.length !== 0">
        <!-- Box product -->
        <ul
          class="flex flex-col border-b-2 mb-5"
          v-for="(item, index) in Cart"
          :key="index"
        >
          <!-- product -->
          <li class="flex gap-5 items-center border-t-2 py-2">
            <!-- left side -->
            <section class="w-[130px] border-[2px] rounded-md">
              <!-- img -->
              <img :src="getImagePath(item.img)" alt="img" class="w-full" />
            </section>

            <!-- right side -->
            <section class="flex-1 flex flex-col gap-5 py-2">
              <!-- top -->
              <div class="flex justify-between gap-2">
                <span>
                  <NuxtLink :to="`/products/${item.img}`"
                    ><h4 class="text-base font-medium">
                      {{ item.title }}
                    </h4></NuxtLink
                  >
                  <p class="text-base text-neutral-500">{{ item.category }}</p>
                  <p
                    class="text-base text-neutral-500"
                    v-if="
                      item.category.includes('Shoes') ||
                      item.category.includes('shirts') ||
                      item.category.includes('Audiobooks')
                    "
                  >
                    variant : {{ item.size }}
                  </p>
                </span>
                <span>
                  <p class="text-gray-950 font-semibold">${{ item.price }}</p>
                </span>
              </div>
              <!-- bottom -->
              <div class="flex justify-between gap-2">
                <div class="text-gray-950 font-bold">
                  Qty: {{ item.amount }}
                </div>
                <button
                  class="text-sm text-neutral-500 hover:text-neutral-600"
                  @click="removeFromCart(index)"
                >
                  Remove
                </button>
              </div>
            </section>
          </li>
        </ul>

        <section
          class="flex justify-between gap-2 border-[1px] rounded-md px-2 py-5 bg-neutral-50/100"
        >
          <div>
            <h4 class="text-base font-semibold">Your Total</h4>
            <p class="text-sm text-neutral-500">
              Shipping will be calculated in the next step
            </p>
          </div>
          <p class="text-gray-950 font-semibold">${{ totalPrice }}</p>
        </section>
        <section class="flex justify-center">
          <button
            class="bg-gray-900 hover:bg-gray-950 text-white px-5 py-3 my-6 w-[300px] max-w-full rounded-lg"
          >
            Checkout
          </button>
        </section>
      </div>
      <!-- no cart -->
      <div v-else class="flex justify-center items-center flex-col gap-3">
        <p class="text-lg font-medium text-gray-950">Shopping Cart is empty , Go shopping .. </p>
        <img src="../assets/imgs/shoppingCart.png" alt="shoppingcart" class="max-w-[300px]">
      </div>
    </div>
  </div>
</template>
