const db =require('../config/db');

class PersonneModel{





    static async getpersonnes() {
        return new Promise((resolve) => {

            db.query("SELECT * FROM personne ",(error, result) => {
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
    static async getPersonByEmail(email) {
        return new Promise((resolve) => {
            db.query('SELECT * FROM personne WHERE email = ?', [email], (error, result) => {
                if (error) {
                    console.error('Error executing SQL query:', error);
                    resolve([]);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static async signInAndGenerateToken(email) {
        try {
            // Retrieve the user with the provided email
            const user = await this.getPersonByEmail(email);

            // Check if the user exists
            if (user.length === 0) {
                return { success: false, message: 'Invalid email.' };
            }

            // Generate a token with a 24-hour expiration
            const token = jwt.sign({ email }, 'your_secret_key', { expiresIn: '24h' });

            return { success: true, token };
        } catch (error) {
            console.error('Error in signInAndGenerateToken:', error);
            return { success: false, message: 'An error occurred during sign-in.' };
        }
    }
 
}

    

module.exports=PersonneModel