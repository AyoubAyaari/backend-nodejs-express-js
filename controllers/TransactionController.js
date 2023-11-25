const transactionModel=require("../models/Transaction")
class TransactionController{

    static async getalltransactions(req,res)
    {
      var result = await transactionModel.gettransactions();

      if(result)
      res.send(result)
    
    }
    static async addnewtransaction(req, res) {
      try {
          const { id_sender,id_receiver,datetransaction } = req.body;
  
          const success = await transactionModel.addtransaction( id_sender,id_receiver,datetransaction);
  
          if (success) {
              res.send("add successfully");
          } else {
              res.send("add failed");
          }
      } catch (error) {
          console.error("Error in addnewproduit route:", error);
          res.status(500).send("Internal Server Error");
      }
      
  }
  static async deletetransaction (req,res){
    const id=req.body.id;
    if (id){
        var result=await transactionModel.deletetransaction(id);
        if(result)
        res.send("delete done");
        else 
        res.send("failed to delete");
    }
      }
      static async updatetransaction(req,res){
        const id=req.body.id;
        const nvid_cender=req.body.id_sender;
        const nvid_reciever=req.body.id_receiver;
      
    var x = await transactionModel.edit(id,nvid_cender,nvid_reciever)
    if(x)
    res.send("data updated successfully")
    else
     send ("erreur")
      }
}
module.exports=TransactionController