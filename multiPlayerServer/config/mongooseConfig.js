const mongoose = require("mongoose");
require("dotenv").config()

const mongooseConnect = async()=>{
   await main().then(()=>console.log("database connected"))
    main().catch((err) => console.log(err));
    async function main() {
      await mongoose.connect(process.env.MONGO_URL);
    }    
}

module.exports = {mongooseConnect}