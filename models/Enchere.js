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
static async addenchere(idpersonne,idproduit,montant) {
    try {
        return new Promise((resolve) => {
            db.query(
                "INSERT INTO enchere (idpersonne,idproduit,montant) VALUES (?, ?, ?)",
                [idpersonne,idproduit,montant],
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
    } 

catch (error) {
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