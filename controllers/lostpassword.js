import generator from'generate-password';
import passwordHash from 'password-hash';
import users from '../schema/schemaUser';
import sendEmail from "../mailSender/lostpasswordMail";

var password = generator.generate({
  length: 10,
  numbers: true
});

export function lostpassword (req, res) {
  users.findOne({email : req.body.email}, (err, result) => {
    if(!result){
      res.json({erreur : 'Email inconnu'});
      ('erreur', err);
    }
    else{
      users.updateOne({email : req.body.email},{
        password : passwordHash.generate(password)
      }, () => {
        let email = req.body.email;
        sendEmail({email, password});
      });
    }
  });
}