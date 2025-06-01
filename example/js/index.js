const express =require("express-pro-test");
const {resp} =require("express-pro-test");

const app=express();

app.use(express.json());
app.use(express.cors());

app.get("/",express.asyncHandler(async(req,res)=>{
    resp(res,200,"server is running",{});
}))

app.use(express.error)
app.listen(3000,()=>{
    console.log("Server is running");
})