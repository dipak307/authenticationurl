const express=require("express");
const path=require("path");
const app=express();
const cookieParser=require('cookie-parser');
const {connectToMongoDB}=require('./connect');
const {restrictToLoggedIn,checkAuth}=require('./middleware/auth');
///router 
const urlRoute=require('./routes/url')
const userRoute=require("./routes/user");
const staticRoute=require("./routes/staticRoute")

const PORT=8001;

connectToMongoDB('mongodb://localhost:27017/short-url')
  .then(()=>console.log("mongodb connected.."));

app.set("view engine","ejs");
app.set("views" , path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use('/url',restrictToLoggedIn,urlRoute);
app.use("/",checkAuth,staticRoute);
app.use("/user", userRoute);


app.listen(PORT,()=>{
    console.log("server started at "+PORT)
})



