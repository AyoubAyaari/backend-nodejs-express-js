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
    static async addproduit(nom, description, prix, img, datelimite, min, max) {
        try {
            return new Promise((resolve) => {
                db.query(
                    "INSERT INTO produit (nom, description, prix, img, datelimite, min, max) VALUES (?, ?, ?, ?, ?, ?, ?)",
                    [nom, description, prix, img, datelimite, min, max],
                    (error, result) => {
                        if (!error) {
                            resolve(true);
                        } else {
                            console.error("Error in addpersonne query:", error);
                            resolve(false);
                        }
                    }
                );
            });
        } catch (error) {
            console.error("Error in addpersonne:", error);
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