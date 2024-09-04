const express=require("express");
const router=express.Router({mergeParams:true});
const Review=require("../models/review.js");
const Listing=require("../models/listing.js");


// Review Post Route
router.post("/",async (req,res)=>{
    let {id}=req.params;
    let listing =await Listing.findById(id);
    let newReview=new Review(req.body.review);

    listing.review.push(newReview);
    await newReview.save();
    await listing.save();

    console.log("review saved");
    res.redirect(`/listings/${listing._id}`);

    // res.render("listings/edit.ejs",{listing});
}) 
// Review Delete Route
router.delete("/:reviewId",async (req,res)=>{
    let {id,reviewId}=req.params;
    let deletedReview= await Review.findByIdAndDelete(reviewId);
    await Listing.findByIdAndUpdate(id,{$pull:{review:reviewId}});
    res.redirect(`/listings/${id}`);
});

module.exports=router;