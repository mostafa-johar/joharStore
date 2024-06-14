<script setup lang="ts">
const route = useRoute()
let {search } = route.query
const page = ref(1);
const limit = ref(6);
const total = ref(0);
// ---- Fetch Allproducts -----------
const AllProducts = ref<any>([]);
const getData = async () => {
  try {
    const data = await $fetch(
      `/api/search?search=${search}&page=${page.value}&limit=${limit.value}`
    );
    if (data) {
      AllProducts.value = data.results.results;
      total.value = data.count;
    }
  } catch (err) {
    console.log(err);
  }
};
getData();
watch(page, getData);
// ---- End Fetch Allproducts --------------
useHead({
  title: `search about : ${search}`
})
</script>
<template>
    <div class="Apparel">
      <div class="container">
        <h3 class="text-2xl font-semibold my-3">results about : {{search}}</h3>
        <Product :products="AllProducts" />
        <div class="flex justify-center py-2">
          <UPagination
            v-model="page"
            :page-count="limit"
            :total="total"
            :active-button="{ color: 'blue' }"
          />
        </div>
      </div>
    </div>
  </template>