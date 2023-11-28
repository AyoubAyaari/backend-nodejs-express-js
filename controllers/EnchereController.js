const enchereModel = require("../models/Enchere");

class EnchereController {
  static async getallencheres(req, res) {
    var result = await enchereModel.getenchere();

    if (result) res.send(result);
  }
  static async addnewenchere(req, res) {
    try {
      const { idpersonne, idproduit, montant } = req.body;

      const success = await enchereModel.addenchere(
        idpersonne,
        idproduit,
        montant
      );

      if (success) {
        res.send("add successfully");
      } else {
        res.send("add failed");
      }
    } catch (error) {
      console.error("Error in addnewpersonne route:", error);
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
