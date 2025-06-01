import express, { Request, Response ,resp} from "express-pro-test";

//@ts-ignore
const app=express();

app.use(express.json());
app.use(express.cors());

app.get("/",express.async(async(req:Request,res:Response)=>{
    resp(res,200,"server is running",{});
}))

app.use(express.error)
app.listen(3000,()=>{
    console.log("Server is running");
})