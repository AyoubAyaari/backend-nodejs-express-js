const express=require('express')
const personnecontroller = require("../controllers/PersonneController")
const produitcontroller = require ("../controllers/ProduitController")
const transactioncontroller = require ("../controllers/TransactionController")
const encherecontroller = require ("../controllers/EnchereController")
const router=require('express').Router();
const {check}=require("express-validator");
const multer = require('multer');
const upload = multer();



router.get("/",(req,res,next)=>{
    res.send("hello")
})
router.get("/allpersonne",personnecontroller.getallpersonnes)
router.get("/allproduit",produitcontroller.getallproduits)
router.get("/alltransactions",transactioncontroller.getalltransactions)
router.get("/allenchere",encherecontroller.getallencheres)
router.post("/addpersonne",personnecontroller.addnewpersonne)
router.post("/addproduit", produitcontroller.addnewproduit)
router.post("/addtransaction",transactioncontroller.addnewtransaction)
router.post("/addenchere",encherecontroller.addnewenchere)
router.post("/signin",personnecontroller.signInAndGenerateToken)
router.delete("/deletepersonne",[check("id").exists().withMessage("id does not exist").isNumeric().withMessage("id should be number")],personnecontroller.deletepersonne)
router.delete("/deleteproduit",produitcontroller.deleteproduit)
router.delete("/deletetransaction",transactioncontroller.deletetransaction)
router.delete("/deleteenchere",encherecontroller.deleteencheres)
router.put("/editpersonne",personnecontroller.updatepersonne)
router.put("/editproduit",produitcontroller.updateproduit)
router.put("/edittransaction",transactioncontroller.updatetransaction)
router.put("/editenchere",encherecontroller.updateenchere)

module.exports=router;