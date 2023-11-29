const produitModel=require("../models/Produit")
const fs = require('fs');
class ProduitController{

    static async getallproduits(req,res)
    {
      var result = await produitModel.getproduits();

      if(result)
      res.send(result)
    
    }

    static async addnewproduit(req, res) {
        try {
            const { nom, description, prix, img, datelimite, min, max } = req.body;
    
            // Assuming img is the base64-encoded image data received in the request body
            const imgBuffer = Buffer.from(img, 'base64');
    
            const success = await produitModel.addproduit(nom, description, prix, imgBuffer, datelimite, min, max);
    
            if (success) {
                res.send("Added successfully");
            } else {
                res.send("Failed to add");
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