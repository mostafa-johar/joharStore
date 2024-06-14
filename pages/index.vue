<script setup lang="ts">
import { useProductStore } from '~/store/store';

const store = useProductStore()
const { AllProducts , pageInIndex , limit , total } = storeToRefs(store)
const { getAllProducts } = store
onMounted(()=>getAllProducts())

useHead({
  title : 'Home'
})
</script>

<!--=================== template ================ -->
<template>
  <div class="Home">
    <div class="container">
      <!-- product -->
      <Product :products="AllProducts" />
      
      <div class="flex justify-center py-2">
        <UPagination
          v-model="pageInIndex"
          :page-count="limit"
          :total="total"
          :active-button="{ color: 'blue' }"
        />
      </div>
    </div>
  </div>
</template>

<!--=================== Style ================ -->
