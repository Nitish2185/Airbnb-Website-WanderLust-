const express=require("express");
const router=express.Router();
const Listing=require("../models/listing.js");

router.get("/",async (req,res)=>{
    const allListings=await Listing.find({});
    res.render("./listings/index.ejs",{allListings});
    });

    // New Route
    router.get("/new",async (req,res)=>{
    res.render("listings/new.ejs");
})
// Show route
router.get("/:id",async (req,res)=>{
    let {id}=req.params;
    const listing =await Listing.findById(id).populate("review");
    res.render("listings/show.ejs",{listing})
})
// Create Route
router.post("/",async (req,res)=>{
    const newListing=new Listing(req.body.listing);
    await newListing.save();
    req.flash("success","New Listing Created");
    res.redirect("/listings");
})
//Edit Route
router.get("/:id/edit",async (req,res)=>{
    let {id}=req.params;
    const listing =await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
})
// Update Route
router.put("/:id",async (req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}`);
})
// Delete Route
router.delete("/:id",async (req,res)=>{
    let {id}=req.params;
    let deletedListing= await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
});

module.exports=router;