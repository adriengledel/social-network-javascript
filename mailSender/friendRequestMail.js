import nodemailer from 'nodemailer';



const sendEmail = (email) => {

  let messageRequestFriend = {
    from: 'adriengledel@gmail.com',
    to: email,
    subject: 'Vous avez reçu une invitation ami !',
    text: 'Plaintext version of the message',
    html: '<p>HTML version of the message</p>'
  };

  const transporter = nodemailer.createTransport({
    service: process.env.NODEMAILER_SERVICE,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS
    },
    tls:{
      rejectUnauthorized: false
    }
  });
  
  transporter.sendMail(messageRequestFriend , function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

}

export default sendEmail;