const db =require('../config/db');

class EnchereModel{



  static async getenchere(email) {
    try {
     
        const idPersonne = await new Promise((resolve) => {
            db.query(
                "SELECT id FROM personne WHERE email = ?",
                [email],
                (error, result) => {
                    if (!error) {
                        const idPersonne = result.length > 0 ? result[0].id : null;
                        resolve(idPersonne);
                    } else {
                        console.error("Erreur lors de la récupération de l'ID de la personne :", error);
                        resolve(null);
                    }
                }
            );
        });

        if (!idPersonne) {
            console.error("Impossible de récupérer l'ID de la personne pour l'email :", email);
            return [];
        }

        
        const enchereProduits = await new Promise((resolve) => {
            db.query(
                "SELECT produit.* ,montant FROM produit JOIN enchere ON produit.id = enchere.idproduit WHERE enchere.idpersonne = ?",
                [idPersonne],
                (error, result) => {
                    if (!error) {
                        resolve(result);
                    } else {
                        console.error("Erreur lors de la récupération des produits de l'enchère :", error);
                        resolve([]);
                    }
                }
            );
        });

        return enchereProduits;
    } catch (error) {
        console.error("Erreur dans getenchere :", error);
        return [];
    }
}
static async addenchere(email, idproduit, montant) {
  try {
    
    const idpersonne = await new Promise((resolve) => {
      db.query(
        "SELECT id FROM personne WHERE email = ?",
        [email],
        (error, result) => {
          if (!error) {
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


    const productInfo = await new Promise((resolve) => {
      db.query(
        "SELECT min, max, prix FROM produit WHERE id = ?",
        [idproduit],
        (error, result) => {
          if (!error && result.length > 0) {
            resolve(result[0]);
          } else {
            console.error("Error in retrieving product information:", error);
            resolve(null);
          }
        }
      );
    });

    if (!productInfo) {
      console.error("Unable to retrieve product information for product:", idproduit);
      return false;
    }

    const { min, max, prix } = productInfo;

   
    const currentDate = new Date();

   
    const recordExists = await new Promise((resolve) => {
      db.query(
        "SELECT idpersonne, idproduit FROM enchere WHERE idpersonne = ? AND idproduit = ?",
        [idpersonne, idproduit],
        (error, result) => {
          if (!error) {
            const exists = result.length > 0;
            resolve(exists);
          } else {
            console.error("Error checking if record exists in enchere table:", error);
            resolve(false);
          }
        }
      );
    });

    
    let updatedScore = 0;

    if (montant === prix) {
      updatedScore = 10; 
    } else if (montant >= min && montant <= max) {
      updatedScore = 5; 
    } else {
      updatedScore = -5; 
    }
    if (recordExists) {
 
      await new Promise((resolve) => {
        db.query(
          "UPDATE enchere SET montant = ? WHERE idpersonne = ? AND idproduit = ?",
          [montant, idpersonne, idproduit],
          (error, result) => {
            if (!error) {
              resolve(true);
            } else {
              console.error("Error updating existing row in enchere table:", error);
              resolve(false);
            }
          }
        );
      });
    } else {
      
      await new Promise((resolve) => {
        db.query(
          "INSERT INTO enchere (idpersonne, idproduit, montant, datecreation) VALUES (?, ?, ?, ?)",
          [idpersonne, idproduit, montant, currentDate],
          (error, result) => {
            if (!error) {
              resolve(true);
            } else {
              console.error("Error inserting new row into enchere table:", error);
              resolve(false);
            }
          }
        );
      });
    }

    await new Promise((resolve) => {
      db.query(
        "UPDATE personne SET score = score + ? WHERE id = ?",
        [updatedScore, idpersonne],
        (error, result) => {
          if (!error) {
            resolve(true);
          } else {
            console.error("Error updating user's score:", error);
            resolve(false);
          }
        }
      );
    });

    return true; // Return success
  } catch (error) {
    console.error("Error in addenchere:", error);
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