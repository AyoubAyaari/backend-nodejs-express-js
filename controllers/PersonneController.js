const personneModel=require("../models/Personne")
const {validationResult}=require("express-validator")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class PersonneController{

    static async getallpersonnes(req,res)
    {
      
      const {email} = req.body;
      var result = await personneModel.getpersonnes();

      if(result)
      res.send(result)
    
    }
    static async addnewpersonne(req, res) {
      try {
          const { nom, prenom, email, cin } = req.body;
  
          const success = await personneModel.addpersonne(nom, prenom, email, cin);
  
          if (success) {
              res.send("add successfully");
          } else {
              res.send("add failed");
          }
      } catch (error) {
          console.error("Error in addnewpersonne route:", error);
          res.status(500).send("Internal Server Error");
      }
  }
  static async deletepersonne (req,res){
const id=req.body.id;
const errors=validationResult(req);
if(!errors.isEmpty())
{
  res.json(errors.array())
}else {
  if (id){
    var result=await personneModel.deletepersonne(id);
    if(result)
    res.send("delete done");
    else 
    res.send("failed to delete");
}
}

  }
  static async updatepersonne(req,res){
    const id=req.body.id;
    const nvnom=req.body.nom;
    const nvprenom=req.body.prenom;
    const nvemail=req.body.email;
    const nvcin=req.body.cin;
    const nvmontant=req.body.montant;
    const nvscore=req.body.score;
var x = await personneModel.edit(id,nvnom,nvprenom,nvemail,nvcin,nvmontant,nvscore)
if(x)
res.send("data updated successfully")
else
 send ("erreur")
  }

  static async signInAndGenerateToken(req, res) {
    try {
        const { email } = req.body;

        // Validate the request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Retrieve the user from the database based on the provided email
        const user = await personneModel.getPersonByEmail(email);

        // Check if the user exists
        if (user.length === 0) {
            return res.status(401).json({ message: 'Invalid email .' });
        }

        // Generate a token with a 24-hour expiration
        const token = jwt.sign({ email }, 'your_secret_key', { expiresIn: '24h' });

        res.json({ success: true, token });
    } catch (error) {
        console.error("Error in signInAndGenerateToken route:", error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}
  




}module.exports=PersonneController