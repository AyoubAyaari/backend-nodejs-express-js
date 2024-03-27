const produitModel=require("../models/Produit")
const fs = require('fs');
class ProduitController{

  static async getallproduits(req, res) {
    try {
      // Retrieve new products
      const newProduits = await produitModel.getAndDeleteOldProduits();
  
      if (newProduits.length > 0) {
        res.send(newProduits);
      } else {
        res.status(404).send("No new products found");
      }
    } catch (error) {
      console.error("Error in getallproduits route:", error);
      res.status(500).send("Internal Server Error");
    }
  }
  
  
  
  
    static async getaproduit(req, res) {
      try {
        const id = req.params.id; 
        const result = await produitModel.getproduibyid(id);
    
        if (result.length > 0) {
          res.send(result);
        } else {
          res.send("No products found");
        }
      } catch (error) {
        console.error("Error in getallproduits route:", error);
        res.status(500).send("Internal Server Error");
      }
    }
    static async getproduitper(req, res) {
      try {
        const email = req.params.email; 
        const result = await produitModel.getproduibyemail(email);
        
        if (result.length > 0) {
          res.send(result);
        } else {
          res.send("No products found");
        }
      } catch (error) {
        console.error("Error in getproduitper route:", error);
        res.status(500).send("Internal Server Error");
      }
    }
    static async addnewproduit(req, res) {
        try {
          const { nom, description, prix, email } = req.body;
      
          const success = await produitModel.addproduit(nom, description, prix, email);
      
          if (success) {
            res.send("Add successfully");
          } else {
            res.send("Add failed");
          }
        } catch (error) {
          console.error("Error in addnewproduit route:", error);
          res.status(500).send("Internal Server Error");
        }
      }
      
  static async deleteproduit (req,res){
    const id=req.body.id;
    if (id){
        var result=await produitModel.deleteproduit(id);
        if(result)
        res.send("delete done");
        else 
        res.send("failed to delete");
    }
      }
      static async updateproduit(req,res){
        const id=req.body.id;
        const nvnom=req.body.nom;
        const nvdescription=req.body.description;
        const nvprix=req.body.prix;
        const nvimage=req.body.img;
        const nvdatelimite=req.body.datelimite;
        const nvmin=req.body.min;
        const nvmax=req.body.max;
    var x = await produitModel.edit(id,nvnom,nvdescription,nvprix,nvimage,nvdatelimite,nvmin,nvmax)
    if(x)
    res.send("data updated successfully")
    else
     send ("erreur")
      }
}

module.exports=ProduitController