const db =require('../config/db');

class EnchereModel{



static async getenchere() {
    return new Promise((resolve) => {
        db.query("SELECT * FROM enchere", (error, result) => {
            if (error) {
                console.error("Error executing SQL query:", error);
                resolve([]);
            } else {
                resolve(result);
            }
        });
    });
}
static async addenchere(email,idproduit,montant) {
    try {
      const idpersonne = await new Promise((resolve) => {
        db.query(
          "SELECT id FROM personne WHERE email = ?",
          [email],
          (error, result) => {
            if (!error) {
              // Assuming that the email is unique, so the result should contain only one record
              const idpersonne = result.length > 0 ? result[0].id : null;
              resolve(idpersonne);
            } else {
              console.error("Error in retrieving idpersonne:", error);
              resolve(null);
            }
          }
        );
      });
  
      if (!idpersonne) {
        console.error("Unable to retrieve idpersonne for email:", email);
        return false;
      }
  
      const insertResult = await new Promise((resolve) => {
        db.query(
          "INSERT INTO enchere (idpersonne, idproduit, montant) VALUES (?, ?, ?)",
          [idpersonne, idproduit, montant],
          (error, result) => {
            if (!error) {
              resolve(true);
            } else {
              console.error("Error in addproduit query:", error);
              resolve(false);
            }
          }
        );
      });
  
      return insertResult;
    } catch (error) {
      console.error("Error in addproduit:", error);
      return false;
    }
  }

static async deleteenchere(idpersonne,idproduit) {
    try {
        
    
        await db.query("DELETE FROM enchere WHERE idpersonne = ? and idproduit = ?", [idpersonne,idproduit]);

        return true;
    } catch (error) {
        console.error("Error in deletepersonne:", error);
        return false;
    }
}
static async edit(idproduit,idpersonne,montant)
{
    return new Promise(resolve=>{
        db.query("update enchere  set montant=?   where idproduit=? and idpersonne=?",[montant,idproduit,idpersonne],(erreur,result)=>{
            if(!erreur)
            resolve(result)
    })
    })

}
}module.exports=EnchereModel