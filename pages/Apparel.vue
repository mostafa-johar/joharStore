<script setup lang="ts">

import { useProductStore } from '~/store/store';

const store = useProductStore()
const { Apparel , pageInApparel , limit , total } = storeToRefs(store)
const { getApparel } = store
onMounted(()=>getApparel())
useHead({
  title: "Apparel"
})
</script>
<template>
  <div class="Apparel">
    <div class="container">
      <h3 class="text-2xl font-semibold my-3">Apparel</h3>
      <Product :products="Apparel" />
      <div class="flex justify-center py-2">
        <UPagination
          v-model="pageInApparel"
          :page-count="limit"
          :total="total"
          :active-button="{ color: 'blue' }"
        />
      </div>
    </div>
  </div>
</template>
