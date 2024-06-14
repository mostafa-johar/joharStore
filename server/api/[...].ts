import productModel from '../plugins/model/product.model'
const router = createRouter()

// Get All products?page=n&limit=m
router.get('/products',defineEventHandler(async(Event)=>{
      const data  = getQuery(Event) 
    
      let page = Number(data.page)
      let limit = Number(data.limit)

      const startIndex = (page - 1) * limit
      const lastIndex = page * limit

      const products = await productModel.find({})
      interface results{
            next ?:{page: Number ,limit: number} ,
            prev ?:{page: Number ,limit: number} ,
            results?:unknown
      }
      let results :results = {} 
      if(lastIndex < products.length){
            results.next = {
                  page : page + 1,
                  limit : limit
            }
      }

      if(startIndex > 0){
            results.prev = {
                  page : page - 1,
                  limit : limit
            }
      }

      results.results = products.slice(startIndex, lastIndex)

      return {results ,count : products.length }

}))

// Get All Apparel?page=n&limit=m
router.get('/Apparel',defineEventHandler(async(Event)=>{
      const data  = getQuery(Event) 
    
      let page = Number(data.page)
      let limit = Number(data.limit)

      const startIndex = (page - 1) * limit
      const lastIndex = page * limit

      const products = await productModel.find({category : ['T-shirts','Shoes','Sweatshirts' ,'polo Shirts']})
      interface results{
            next ?:{page: Number ,limit: number} ,
            prev ?:{page: Number ,limit: number} ,
            results?:unknown
      }
      let results :results = {} 
      if(lastIndex < products.length){
            results.next = {
                  page : page + 1,
                  limit : limit
            }
      }

      if(startIndex > 0){
            results.prev = {
                  page : page - 1,
                  limit : limit
            }
      }

      results.results = products.slice(startIndex, lastIndex)

      return {results , count : products.length}

}))

// Get All Accessories?page=n&limit=m
router.get('/Accessories',defineEventHandler(async(Event)=>{
      const data  = getQuery(Event) 
    
      let page = Number(data.page)
      let limit = Number(data.limit)

      const startIndex = (page - 1) * limit
      const lastIndex = page * limit

      const products = await productModel.find({category : ['AudioBooks','Sunglasses','Sweatshirts','Gift cards' ,'Homewares']})
      interface results{
            next ?:{page: Number ,limit: number} ,
            prev ?:{page: Number ,limit: number} ,
            results?:unknown
      }
      let results :results = {} 
      if(lastIndex < products.length){
            results.next = {
                  page : page + 1,
                  limit : limit
            }
      }

      if(startIndex > 0){
            results.prev = {
                  page : page - 1,
                  limit : limit
            }
      }

      results.results = products.slice(startIndex, lastIndex)

      return {results , count : products.length}

}))
// Get search?page=n&limit=m$search=s
router.get('/search',defineEventHandler(async(Event)=>{
      const data  = getQuery(Event) 
      let search = getQuery(Event).search
      let page = Number(data.page)
      let limit = Number(data.limit)

      const startIndex = (page - 1) * limit
      const lastIndex = page * limit

      let products = await productModel.find({})
      products = products.filter((product : any)=>{
      const c = product.category.toLowerCase().includes(search?.toString().toLowerCase()) 
      const title  = product.productName.toLowerCase().includes(search?.toString().toLowerCase()) 
         return c || title
      })
      interface results{
            next ?:{page: Number ,limit: number} ,
            prev ?:{page: Number ,limit: number} ,
            results?:unknown
      }
      let results :results = {} 
      if(lastIndex < products.length){
            results.next = {
                  page : page + 1,
                  limit : limit
            }
      }

      if(startIndex > 0){
            results.prev = {
                  page : page - 1,
                  limit : limit
            }
      }

      results.results = products.slice(startIndex, lastIndex)

      return {results , count : products.length}

}))

// Get ---- product----
router.get('/product/:id',defineEventHandler(async(event)=>{
      const { id }  = event.context.params as { id : string }
      const decodeText = await decodeURIComponent(id)
      const product = await productModel.find({img : decodeText})
 
      return {product , count : product.length}

}))







export default useBase('/api/',router.handler)