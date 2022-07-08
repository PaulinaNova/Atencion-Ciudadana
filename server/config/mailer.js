import nodemailer from "nodemailer";

const getEmailData = (to) => {
  const data = {
    from: '"Atención Ciudadana" <atencion.ciudadana.nay@gmail.com>', // sender address
    to,
    subject: "Gestión asignada", // Subject line
    text:
      "Se le ha asignado una nueva gestión de la Dirección de Atención Ciudadana del Estado de Nayarit", // plain text body
    html: "", // html body
  };
  return data;
};

const sendEmail = (to) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "atencion.ciudadana.nay@gmail.com", // generated ethereal user
      pass: "iycflkyrnugubkuf", // generated ethereal password
    },
  });

  const mail = getEmailData(to)

  transporter.sendMail(mail,function(error,response){
    if(error)
        console.log(error)
  })
};

export default sendEmail;
