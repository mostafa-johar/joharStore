import { defineStore } from "pinia";
import { onMounted ,watch } from "vue";
export const useProductStore = defineStore("products", () => {
  // ======== Start interface =============
  interface product {
    productName: string;
    img: string;
    price: Number;
    category: string;
  }
  // ======== End interface =============

  //   ======= Start states ===============
  const pageInIndex = ref(1);
  const pageInApparel = ref(1);
  const pageInAcessories = ref(1);
  const limit = ref(6);
  const total = ref(0);
  const loadingCart = ref(false)
  const quantity  = ref(1)
  const size =ref('')
  //   ======= End states ===============

  // ========= Fetch Allproducts ===========
  const AllProducts = ref<product[]>([]);
  const getAllProducts = async () => {
    try {
      const data = await $fetch(
        `/api/products?page=${pageInIndex.value}&limit=${limit.value}`
      );
      if (data) {
        AllProducts.value = data.results.results;
        total.value = data.count;
      }
    } catch (err) {
      console.log(err);
    }
  };
  watch(pageInIndex, getAllProducts);
  // -====== End Fetch Allproducts =============

  // ======== Fetch Apparel ===========
  const Apparel = ref<product[]>([]);
  const getApparel = async () => {
    try {
      const data = await $fetch(
        `/api/Apparel?page=${pageInApparel.value}&limit=${limit.value}`
      );
      if (data) {
        Apparel.value = data.results.results;
        total.value = data.count;
      }
    } catch (err) {
      console.log(err);
    }
  };
  watch(pageInApparel, getApparel);
  // ========== End Fetch Apparel =============

  // ======= Fetch Accessories =============
const Accessories = ref<product[]>([]);
const getAccessories = async () => {
  try {
    const data = await $fetch(
      `/api/Accessories?page=${pageInAcessories.value}&limit=${limit.value}`
    );
    if (data) {
      Accessories.value = data.results.results;
      total.value = data.count;
    }
  } catch (err) {
    console.log(err);
  }
};
watch(pageInAcessories, getAccessories);
// =========== End Fetch Accessories ===============

// ========= function Cart ======

interface cart{
  id:string,
  title : string,
  category : string,
  img:string,
  amount :number,
  price:number,
  size : string
}
const Cart = ref<cart[]>([])
const count = ref<number>(0)
const totalPrice = ref<number>(0)

// ------ add product to cart --------
function addToCart(e:any,n:cart,variant:string){
  // check if i choose size or not
  if(size.value == "" && variant==undefined){
    e.preventDefault();
  }
  // operation ...
  else{
    let exists =false
    let sum = 0
    for(const cartItem of Cart.value){
      if((cartItem.id == n.id)&&(cartItem.size == n.size)){
         cartItem.amount = cartItem.amount + 1
         exists = true ;
         break;
      }
    }
    if(!exists){
      Cart.value.push({...n, amount :1})
      
    // count time to add product
    count.value++
    }
    // loading when i click to 'Add to cart' Buttons
    setTimeout(()=>{
      loadingCart.value = !loadingCart.value
    },1000)
  loadingCart.value = !loadingCart.value
  // calculate totalPrice
  for(const num of Cart.value){
    sum = sum + (num.amount * num.price)
  }
  totalPrice.value = sum


  }

}

// ======= check local storage and update cart ========
onMounted(()=>{
  if(getItem('shoppingCart')){
    let strCart = getItem('shoppingCart') as string
    let x = JSON.parse(strCart)  
    Cart.value = x
    count.value = Cart.value.length
  }
  watch(
    Cart,
    (val) => {
      setItem('shoppingCart',JSON.stringify(val))
    },
    { deep: true }
  )
})

// ============ Start local Storge for product ===============

function getItem(item:string) {
  if (process.client) {
    return localStorage.getItem(item)
  } else {
    return undefined
  }
}

function setItem(item :string, value:string) {
  if (process.client) {
    localStorage.setItem(item, value)
  
    return true
  } else {
    return false
  }
}
// ============ End local Storge for product ==========

// -------- remove product to cart
function removeFromCart(index:number){
  Cart.value =  Cart.value.filter((item)=>{
    if(item.amount>1){
      count.value--
      return
    }
     return item !== Cart.value[index]
  })
  // console.log(e.target)
  count.value--
}
  return {
    AllProducts,
    Apparel,
    Accessories,
    getAllProducts,
    getApparel,
    getAccessories,
    addToCart,
    removeFromCart,
    pageInIndex,
    pageInApparel,
    pageInAcessories,
    limit,
    total,
    loadingCart,
    quantity,
    size,
    Cart,
    count,
    totalPrice
  };
});
