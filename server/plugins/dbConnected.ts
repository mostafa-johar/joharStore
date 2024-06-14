import mongoose from "mongoose"

export default defineNitroPlugin(async()=>{
    try{
        let conn = await mongoose.connect(useRuntimeConfig().mongo_url)
        if(conn){
            console.log('connected Db successfully')
        }
    }catch(err){
        console.log("erro in database" , err)
    }
})