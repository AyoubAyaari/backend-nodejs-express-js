const enchereModel = require("../models/Enchere");
const db =require('../config/db');

class EnchereController {
  static async getencherebypersonne(req, res) {
    const email = req.params.email; 
    var result = await enchereModel.getenchere(email);

    if (result) res.send(result);
}

  static async addnewenchere(req, res) {
    try {
      const { email, idproduit,montant } = req.body;
      
      const success = await enchereModel.addenchere(email, idproduit,montant);
  
      if (success) {
        res.send("Add successfully");
      } else {
        res.send("Add failed");
      }
    } catch (error) {
      console.error("Error in addnewenchere route:", error);
      res.status(500).send("Internal Server Error");
    }
}

  static async deleteencheres(req, res) {
    const { idpersonne, idproduit } = req.body;
    
   
      if ((idpersonne) && (idproduit)) {
        var result = await enchereModel.deleteenchere(idpersonne, idproduit);
        if (result) res.send("delete done");
        else res.send("failed to delete");
      }
    
  }

  static async updateenchere(req, res) {
    const idproduit = req.body.idproduit;
    const idpersonne =req.body.idpersonne;
    const nvmontant=req.body.montant;

    

    var x = await enchereModel.edit(idproduit,idpersonne,nvmontant);
    if (x) res.send("data updated successfully");
    else send("erreur");
  }
}
module.exports = EnchereController;
