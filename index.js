const express = require('express');
const app = express();

const mongoose = require('mongoose');
const carSchema = require("./cars.Schema");
const url = "mongodb+srv://mohamedhaggag407:Node-Cars-1513@cluster0.fyt8v9e.mongodb.net/carsModel?retryWrites=true&w=majority&appName=Cluster0"

app.use(express.json());

const conectDB = async()=>{
    try{
        mongoose.set("strictQuery", false)
        mongoose.connect(url).then(()=>{
        console.log("Connected to MongoDB")
        })

    }catch(err){
        console.log(err)
        process.exit();
    }
}
conectDB();

// Get All Cars
app.get("/cars", async (req,res)=>{
    const cars = await carSchema.find()
    res.json({ Cars: cars ,message:"Success"})
})

// Get Car By ID
app.get("/cars/:carID", async (req,res)=>{
    const car = await carSchema.findById(req.params.carID)
    if(car){
        res.json({ Cars: car ,message:"Success"})
    }else{
        res.status(404).json({message:"Car Not Found"})
    }
})

// Create a new Car
app.post("/cars", async (req,res)=>{
    try{
        const car = await carSchema.create(req.body)
        res.json({ Cars: car ,message:"Car Created"})
    }catch(err){
        res.status(400).json({message:"Bad Request",Error: err.message})
    }
})
// Update Car Details
app.put("/cars/:carID", async (req,res)=>{
    let carID = req.params.carID;
    await carSchema.findByIdAndUpdate(carID,req.body)

    res.json({message:"Car Updated"})

}) 
app.delete("/cars/:carID", async (req,res)=>{
    let carID = req.params.carID;
    await carSchema.findByIdAndDelete(carID)

    res.json({message:"Car Deleted"})

})




app.listen(6000, () => {
    console.log('listening on port: 6000');
});












// mongodb+srv://mohamedhaggag407:Node-Cars-1513@cluster0.fyt8v9e.mongodb.net/
// Node-Cars-1513  password
// mohamedhaggag407 userName
// 102.45.132.136 ip address