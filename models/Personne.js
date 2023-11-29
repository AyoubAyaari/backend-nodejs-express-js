const db =require('../config/db');

class PersonneModel{





    static async getpersonnes(email) {
        return new Promise((resolve) => {

            db.query("SELECT * FROM personne where email = ?", [email],(error, result) => {
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
                    [nom, prenom, email, cin, datecreation, montant, 50],
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
    static async getByEmail(email) {
        try {
            const query = 'SELECT * FROM personne WHERE email = ?';
            const [personne] = await db.query(query, [email]);

            // Return the first matching person or null if not found
            return personne.length ? personne[0] : null;
        } catch (error) {
            console.error('Error in getByEmail method:', error);
            throw error;
        }
    }

}
    

module.exports=PersonneModel