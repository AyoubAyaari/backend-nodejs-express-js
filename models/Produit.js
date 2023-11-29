const db =require('../config/db')
class Produit{





    static async getproduits(){
        return new Promise((resolve) => {
            db.query("SELECT * FROM produit", (error, result) => {
                if (error) {
                    console.error("Error executing SQL query:", error);
                    resolve([]);
                } else {
                    resolve(result);
                }
            });
        });

    }
    static async getproduibyid(id){
      
        return new Promise((resolve) => {
          let query = "SELECT * FROM produit where id =?";
          
          // If an id is provided, add a WHERE clause to filter by id
         
      
          db.query(query, [id], (error, result) => {
            if (error) {
              console.error("Error executing SQL query:", error);
              resolve([]);
            } else {
              resolve(result);
            }
          });
        });
      }
      static async getproduibyidpersonne(idpersonne){
      
        return new Promise((resolve) => {
          let query = "SELECT * FROM produit where idpersonne =?";
          
          // If an id is provided, add a WHERE clause to filter by id
         
      
          db.query(query, [idpersonne], (error, result) => {
            if (error) {
              console.error("Error executing SQL query:", error);
              resolve([]);
            } else {
              resolve(result);
            }
          });
        });
      }
      
    static async addproduit(nom, description, prix, min, max, email) {
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
              "INSERT INTO produit (nom, description, prix, min, max, idpersonne) VALUES (?, ?, ?, ?, ?, ?)",
              [nom, description, prix, min, max, idpersonne],
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
      
      static async deleteproduit(id) {
        try {
            // Check if the record with the specified id exists
            const checkResult = await db.query("SELECT id FROM produit WHERE id = ?", [id]);
            
            // If the record doesn't exist, return false
            if (checkResult.length === 0) {
                console.log(`Record with id ${id} does not exist.`);
                return false;
            }
    
            // Now, delete the record in produit table
            await db.query("DELETE FROM produit WHERE id = ?", [id]);
    
            return true;
        } catch (error) {
            console.error("Error in deleteproduit:", error);
            return false;
        }
    }
    static async edit(id,nom,description,prix,img,datelimite,min,max)
    {
        return new Promise(resolve=>{
            db.query("update produit  set nom=? ,description=? ,prix=? ,img=?,datelimite=?,min =?, max=?  where id=?",[nom,description,prix,img,datelimite,min,max,id],(erreur,result)=>{
                if(!erreur)
                resolve(result)
        })
        })
    }



}

module.exports=Produit