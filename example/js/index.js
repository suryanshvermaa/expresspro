const express = ("expresspro");
const {resp,AppError} = ("expresspro");

const app=express();

app.use(express.json());
app.use(express.cors());
const auth=new express.auth("mySecret","authtoken");

app.get("/",express.asyncHandler(async(req,res)=>{
    return resp(res,200,"server is running",{});
}))

app.get("/gettoken",express.asyncHandler(async(req,res)=>{
    const token=await auth.createToken({user:"demo",purpose:"testing"},100);
    return resp(res,200,"server is running",{token});
}))

//protected route-> pass tokenname(in query|authorization header|custom tokenname header) which defined in auth class's second argument
app.get("/protected",auth.authMiddleware(),express.asyncHandler(async(req,res)=>{
    const tokenData=req.user;
    return resp(res,200,"protected route is working",{tokenData});
}))

app.get("error",express.asyncHandler(async(req,res)=>{
    throw new AppError("This is testing error",400);
}))

app.use(express.error);
app.listen(3000,()=>{
    console.log("Server is running");
})