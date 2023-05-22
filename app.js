require('dotenv/config')
const Route = require('./route/bank_route')
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.send("This is home page")
})

app.use('/api/bank',Route)


app.listen(process.env.PORT,()=>{
    console.log("listing on port 5000");
})

async function main(){
    try {
        const res = await mongoose.connect(process.env.DB)
        const data = await res.default
        console.log(data.STATES.connected);
    } catch (error) {
        console.log(error.message);
    }
}

main()