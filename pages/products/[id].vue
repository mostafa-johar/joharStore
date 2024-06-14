<script setup>
// =========  Store =================
import { useProductStore } from "~/store/store";

const store = useProductStore();
const { addToCart } = store;
const { size ,loadingCart } = storeToRefs(store);
// ========= route Params=================
const route = useRoute();
const id = route.params.id;
const variant = route.query.variant;
// ========== to choose size ==============
const list = ref();
const onClickSize = (e) => {
  // Remove classess from all li
  [...list.value].forEach((el) => {
    el.classList.remove("bg-black", "text-white");
  });
  // add classes in li target
  e.target.classList.add("bg-black", "text-white");

  size.value = e.target.textContent;
};
// =============== fetch product =================
const product = ref([]);
const getData = async () => {
  try {
    const data = await $fetch(`/api/product/${id}`);
    product.value = data.product;
  } catch (err) {
    console.log(err);
  }
};
getData();
// =============== End fetch product =================
const getImagePath = (imageName) => {
  return new URL(`../../assets/imgs/${imageName}.webp`, import.meta.url).href;
};
useHead({
  title: `${id}`
})
</script>
<template>
  <div class="product">
    <div class="container">
      <section
        class="flex md:flex-row flex-col gap-5"
        v-for="(item, index) in product"
        :key="item._id"
      >
        <!-- left img -->
        <div class="flex-1 bg-neutral-100/50 p-3 mb-3 flex justify-center">
          <img :src="getImagePath(item.img)" :alt="item.img" loading="lazy" class="max-w-full" />
        </div>
        <!-- right info -->
        <div class="info flex flex-col gap-5 py-5">
          <h3 class="text-xl text-gray-950 font-semibold">
            {{ item.productName }}
          </h3>
          <p class="text-gray-900 font-medium">$ {{ item.price }}</p>
          <!--=========== Start Options ======== -->
          <!-- [1] shoes -->
          <ul class="flex gap-3" v-if="item.category.includes('Shoes')">
            <li
              class="border-[1px] border-neutral-100 rounded-md font-medium hover:bg-black hover:text-white cursor-pointer py-3 px-5"
              v-for="(size, index) in ['M', 'L', 'XL']"
              :key="index"
              ref="list"
              @click="onClickSize($event)"
            >
              {{ size }}
            </li>
          </ul>
          <!-- [2] T-shirt -->
          <ul class="flex gap-3" v-if="item.category.includes('shirts')">
            <li
              class="border-[1px] border-neutral-100 rounded-md font-medium hover:bg-black hover:text-white cursor-pointer py-3 px-5"
              v-for="(size, index) in ['s', 'M', 'L', 'XL', 'XXL']"
              :key="index"
              ref="list"
              @click="onClickSize($event)"
            >
              {{ size }}
            </li>
          </ul>

          <!-- [3] AudioBooks -->
          <ul class="flex gap-3" v-if="item.category.includes('Audiobooks')">
            <li
              class="border-[1px] border-neutral-100 rounded-md font-medium hover:bg-black hover:text-white cursor-pointer py-3 px-5"
              v-for="(size, index) in ['DVD', 'iTunes', 'CD']"
              :key="index"
              ref="list"
              @click="onClickSize($event)"
            >
              {{ size }}
            </li>
          </ul>
          <!--=========== End Options ======== -->
          <button
            class="bg-gray-900 hover:bg-black transition-all text-white font-medium lg:w-[300px] max-w-full px-5 py-3"
            :class="`${
              size || variant ? 'cursor-pointer' : 'cursor-not-allowed'
            }`"
            @click="
              addToCart(
                $event,
                {
                  id: item._id,
                  title: item.productName,
                  category: item.category,
                  img: item.img,
                  price: item.price,
                  size: size,
                },
                variant
              )
            "
          >
           {{ loadingCart ? 'processing...'  : 'Add to Cart'}} 
          </button>
        </div>
      </section>
    </div>
  </div>
</template>
