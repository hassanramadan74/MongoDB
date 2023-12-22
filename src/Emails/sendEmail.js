
import nodemailer from 'nodemailer'




export const sendMail = async()=>{



const transporter = nodemailer.createTransport({
    service:"gmail",
  auth: {
    user: "routeegyptnodejs@gmail.com",
    pass: "mvhhmibbrqerztol",
  },
  
});



const info = await transporter.sendMail({
    from: '"Route nodeJs" <routeegyptnodejs@gmail.com>', // sender address
    to: "ahmedmutti@gmail.com", // list of receivers
    subject: "Hello from hassan ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>hassan here!!!!!?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);



}