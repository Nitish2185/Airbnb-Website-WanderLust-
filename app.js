const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const Review=require("./models/review.js");
const listingRouter =require("./routes/listing.js");
const reviewRouter=require("./routes/review.js");
const flash=require("connect-flash");
const session=require("express-session");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");
const userRouter =require("./routes/user.js");

main()
.then(()=> console.log("connected to database"))
.catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

const sessionOptions={
  secret:"Nitish2185",
  resave:false,
  saveUninitialized:true,
};


app.get("/",(req,res)=>{
  res.send("Hi, I am root");
})

app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// app.get("/userdemo",async (req,res)=>{
//   let fakeUser=new User({
//     email:"rier@gmail.com",
//     username:"RiDER"
//   })
//   let registeredUser=await User.register(fakeUser,"hello world!");
//   res.send(registeredUser);  
// })

app.use((req,res,next)=>{
  res.locals.success=req.flash("success");
  next();
})

app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);




    
app.listen(8080,(req,res)=>{
    console.log("server is listening to port 8080");
})
