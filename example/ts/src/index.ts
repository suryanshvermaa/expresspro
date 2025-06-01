import express, { NextFunction, Request, Response ,resp,Application} from "express-pro-test";

//@ts-ignore
const app=express();

app.use(express.json());
// app.use(express.cors());
// app.use(express.auth({secret:"my-secret",tokenname:"authToken"}));s

app.get("/",express.async(async(req:Request,res:Response,next:NextFunction)=>{
    resp(res,200,"server is running",{});
}))

app.use(express.error)
app.listen(3000,()=>{
    console.log("Server is running");
})