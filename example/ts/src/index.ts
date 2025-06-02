import express, { AppError, Request, Response ,resp, statusCodes} from "expresspro";

const app=express();

app.use(express.json());
app.use(express.cors());
const auth=new express.auth("mySecret","authtoken");

app.get("/",express.asyncHandler(async(req:Request,res:Response)=>{
    return resp(res,statusCodes.OK,"server is running",{});
}))

app.get("/gettoken",express.asyncHandler(async(req:Request,res:Response)=>{
    const token=await auth.createToken({user:"demo",purpose:"testing"},100);
    return resp(res,statusCodes.OK,"server is running",{token});
}))

//protected route-> pass tokenname(in query|authorization header|custom tokenname header) which defined in auth class's second argument
app.get("/protected",auth.authMiddleware(),express.asyncHandler(async(req:Request,res:Response)=>{
    const tokenData=req.user;
    return resp(res,statusCodes.OK,"protected route is working",{tokenData});
}))

app.get("error",express.asyncHandler(async(req:Request,res:Response)=>{
    throw new AppError("This is testing error",statusCodes.BAD_REQUEST);
}))

app.use(express.error)
app.listen(3000,()=>{
    console.log("Server is running");
})