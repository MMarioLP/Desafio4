const mongoose = require("mongoose");
const productSchema= new mongoose.Schema(
    {
        id: {
            type: Number,
          
          },
          name: {
            type: String,
           
          },
          price: {
            type: Number,
           
          },
          description: {
            type: String,
           
          },
          images:{
          type: String
        }
         });
         

        

module.exports = mongoose.model('product',productSchema);