const express=require("express");
const router=express.Router();
const URL=require("../models/url");
const { handleGenerateNewShortURL, handleAnalytic }=require("../controller/url");

router.post("/",handleGenerateNewShortURL);
router.get("/:shortId", async (req,res)=>{
      const shortId=req.params.shortId;
    const entry = await URL.findOneAndUpdate({
         shortId
      },
      {
        $push : {
        visitHistory:{
          timestamp : Date.now(),
        }
      }})
      res.redirect(entry.redirectURL);
})

router.get("/analytics/:shortId",handleAnalytic)





module.exports=router;

