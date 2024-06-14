import mongoose from "mongoose";

const useSChema :mongoose.Schema = new mongoose.Schema(
    {
        productName  :{
            type : String,
            require : true
        },
        img  :{
            type : String,
            require : true
        },
        price  :{
            type : Number,
            require : true
        },
        category  :{
            type : String,
            require : true
        },
        discount  :{
            type : Boolean,
            require : true
        },

    },
    {timestamps : true}
)

export default mongoose.model('products',useSChema)