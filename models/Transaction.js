const db =require('../config/db')
class Transaction{





    static async gettransactions(){
        return new Promise(resolve=>{
            db.query("select * from transaction",[],(error,result)=>{
                if(!error)
                resolve(result)
            })
        })

    }
    static async addtransaction(id_sender,id_receiver,datetransaction) {
        try {
            return new Promise((resolve) => {
                db.query(
                    "INSERT INTO transaction (id_sender,id_receiver,datetransaction) VALUES (?, ?, ?)",
                    [id_sender,id_receiver,datetransaction],
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
    static async deletetransaction(id) {
        try {
            // Check if the record with the specified id exists
            const checkResult = await db.query("SELECT id FROM transaction WHERE id = ?", [id]);
            
            // If the record doesn't exist, return false
            if (checkResult.length === 0) {
                console.log(`Record with id ${id} does not exist.`);
                return false;
            }
    
            // Now, delete the record in produit table
            await db.query("DELETE FROM transaction WHERE id = ?", [id]);
    
            return true;
        } catch (error) {
            console.error("Error in deletetransaction:", error);
            return false;
        }
    }
    static async edit(id,id_sender,id_receiver)
    {
        return new Promise(resolve=>{
            db.query("update transaction  set id_sender=? ,id_receiver=?   where id=?",[id_sender,id_receiver,id],(erreur,result)=>{
                if(!erreur)
                resolve(result)
        })
        })

}}
module.exports=Transaction