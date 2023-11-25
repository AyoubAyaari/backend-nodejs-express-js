const db =require('../config/db');
const { deletepersonne } = require('../controllers/PersonneController');
class PersonneModel{





    static async getpersonnes() {
        return new Promise((resolve) => {
            db.query("SELECT * FROM personne", (error, result) => {
                if (error) {
                    console.error("Error executing SQL query:", error);
                    resolve([]);
                } else {
                    resolve(result);
                }
            });
        });
    }
   static async addpersonne(nom, prenom, email, cin, datecreation, montant, score) {
        try {
            return new Promise((resolve) => {
                db.query(
                    "INSERT INTO personne (nom, prenom, email, cin, datecreation, montant, score) VALUES (?, ?, ?, ?, ?, ?, ?)",
                    [nom, prenom, email, cin, datecreation, montant, score],
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
    static async deletepersonne(id) {
        try {
            // Delete related transactions where the person is the sender or receiver
            await db.query("DELETE FROM transaction WHERE id_sender = ? OR id_receiver = ?", [id, id]);
    
            // Now, delete the record in personne table
            await db.query("DELETE FROM personne WHERE id = ?", [id]);
    
            return true;
        } catch (error) {
            console.error("Error in deletepersonne:", error);
            return false;
        }
    }

    static async edit(id,nom,prenom,email,cin,montant,score)
    {
        return new Promise(resolve=>{
            db.query("update personne  set nom=? ,prenom=? ,email=? ,cin=?,montant=?,score =? where id=?",[nom,prenom,email,cin,montant,score,id],(erreur,result)=>{
                if(!erreur)
                resolve(result)
        })
        })
    }


}
    

module.exports=PersonneModel