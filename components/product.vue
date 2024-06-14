<script setup lang="ts">
defineModel("products");
const getImagePath = (imageName: string) => {
  return new URL(`../assets/imgs/${imageName}.webp`, import.meta.url).href;
};
const route = useRoute();
</script>
<template>
  <!-- boxes products -->
  <section class="products" v-if="products.length">
    <!-- product -->
    <div
      class="box_product"
      v-for="(item, index) in products"
      :key="item.productName"
    >
      <nuxt-link
        :to="
          item.category.includes('Shoes') || 
          item.category.includes('shirts') || 
          item.category.includes('Audiobooks')
            ? `/products/${item.img}`
            : `/products/${item.img}?variant=${item._id}`
        "
      >
        <div class="box_img">
          <img :src="getImagePath(item.img)" alt="product" loading="lazy" />
        </div>
        <div class="title_and_price">
          <h3>{{ item.productName }}</h3>
          <p>${{ item.price }}</p>
        </div>
        <div class="category">{{ item.category }}</div>
      </nuxt-link>
    </div>
  </section>
  <section v-else-if="route.name == 'Search' && products.length == 0">
     No Results , please search again Or another word
  </section>
  <section v-else>
    Loading....
  </section>
</template>

<style scoped>
.products {
  @apply grid lg:grid-cols-3 md:grid-cols-2 gap-3 py-5;
}
.box_product .box_img {
  @apply bg-neutral-100/50 p-3 flex justify-center mb-3;
}
.box_product .box_img img {
  @apply max-w-[300px];
}
.box_product .title_and_price {
  @apply flex justify-between gap-1 items-center;
}
.box_product .title_and_price h3 {
  @apply text-sm text-gray-950 font-medium tracking-tight;
}
.box_product .title_and_price p {
  @apply text-sm text-gray-900 font-normal;
}
.box_product .category {
  @apply text-sm text-neutral-500 font-mono;
}
</style>
