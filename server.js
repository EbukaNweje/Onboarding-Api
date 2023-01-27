const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config({path: "./config/index.env"})
const Db = process.env.DATABASE

mongoose.connect(Db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("MongoDB Connected!")
})

const app = require("./app")

app.listen(process.env.PORT || 7000, ()=>{
    console.log("Conneted")
})