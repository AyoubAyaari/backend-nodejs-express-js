const express=require('express')
const personnecontroller = require("../controllers/PersonneController")
const produitcontroller = require ("../controllers/ProduitController")
const transactioncontroller = require ("../controllers/TransactionController")
const router=require('express').Router();
const {check}=require("express-validator");



router.get("/",(req,res,next)=>{
    res.send("hello")
})
router.get("/allpersonne",personnecontroller.getallpersonnes)
router.get("/allproduit",produitcontroller.getallproduits)
router.get("/alltransactions",transactioncontroller.getalltransactions)
router.post("/addpersonne",personnecontroller.addnewpersonne)
router.post("/addproduit",produitcontroller.addnewproduit)
router.post("/addtransaction",transactioncontroller.addnewtransaction)
router.delete("/deletepersonne",[check("id").exists().withMessage("id does not exist").isNumeric().withMessage("id should be number")],personnecontroller.deletepersonne)
router.delete("/deleteproduit",produitcontroller.deleteproduit)
router.delete("/deletetransaction",transactioncontroller.deletetransaction)
router.put("/editpersonne",personnecontroller.updatepersonne)
router.put("/editproduit",produitcontroller.updateproduit)
router.put("/edittransaction",transactioncontroller.updatetransaction)
module.exports=router;