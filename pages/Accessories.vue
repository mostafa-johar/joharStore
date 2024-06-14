<script setup lang="ts">
import { useProductStore } from '~/store/store';

const store = useProductStore()
const { Accessories , pageInAcessories , limit , total } = storeToRefs(store)
const { getAccessories } = store
onMounted(()=>getAccessories())
useHead({
  title: "Accessories"
})
</script>
<template>
  <div class="Apparel">
    <div class="container">
      <h3 class="text-2xl font-semibold my-3">Accessories</h3>
      <Product :products="Accessories" />
      <div class="flex justify-center py-2">
        <UPagination
          v-model="pageInAcessories"
          :page-count="limit"
          :total="total"
          :active-button="{ color: 'blue' }"
        />
      </div>
    </div>
  </div>
</template>
