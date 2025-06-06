const express = require("express")
const PORT = 1516
const app = express()

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Backend is up")
})

app.listen(PORT,()=>{
    console.log(`Server running on http://loaclhost:${PORT}`)
})