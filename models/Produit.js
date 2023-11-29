const db =require('../config/db')
const fs = require('fs');
const path = require('path');
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
    

    static async addproduit(email, nom, description, prix, imgPath, datelimite, min, max) {
        try {
            // Read the image file as a buffer
            const imgBuffer = await fs.readFile(imgPath);
    
            // Define the path to save the image in the "assets" folder
            const imageName = `${Date.now()}_${path.basename(imgPath)}`;
            const imagePath = path.join(__dirname, './assets', imageName);
    
            // Save the image to the "assets" folder
            await fs.writeFile(imagePath, imgBuffer);
    
            // Get the idpersonne using the provided email
            const checkEmailResult = await db.query("SELECT id FROM personne WHERE email = ?", [email]);
            const idpersonne = checkEmailResult[0].id;
    
            // Insert data into the database
            return new Promise(async (resolve) => {
                db.query(
                    "INSERT INTO produit (nom, description, prix, img, datelimite, min, max, idpersonne) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                    [nom, description, prix, imageName, datelimite, min, max, idpersonne],
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