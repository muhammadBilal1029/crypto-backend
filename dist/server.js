"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _router = require('./router');
var _axios = require('axios'); var _axios2 = _interopRequireDefault(_axios);
var prisma=require('../dist/utils/prisma');
const app = _express2.default.call(void 0, );
var nodemailer = require('nodemailer');
app.use(_cors2.default.call(void 0, ));
app.use(_express2.default.urlencoded({ limit: "460mb", extended: true }));
app.use(_express2.default.json({ limit: "460mb" }));
app.use(_router.router);
const port = process.env.PORT || 3000;
app.get('/', (req, res) => {
  res.send('Welcome To CryptoLab!');
});
app.listen(process.env.PORT || 3000, () =>
  console.log(`Server is running on port ${port}`),
    
);

async function addNewHistory() {
  const { status } = await _axios2.default.get(`${process.env.URL_BACKEND}/new/history`, {
    params: { key: process.env.KEY },
  });

  if (status == 200) {
    return;
  } else {
    console.log("Erro ao atualizar historico");
  }
}
async function sendEmail(toEmail, name, message) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER, 
      pass: process.env.GMAIL_PASS 
    }
  });

  let mailOptions = {
    from: process.env.GMAIL_USER,
    to: toEmail,
    subject: `Alert Notification for ${name}`,
    text: message
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
async function getAlertDataAndSendEmail(){
  try {
    const alertData = await prisma.prisma.AlertData.findMany({
      where: {
       
      }
    });

    if (alertData.length > 0) {
      for (const data of alertData) {
        console.log(`Sending alert for ${data.name}`);
        await sendEmail(data.email, data.name, data.message);
      }
    } else {
      console.log("No alert data found.");
    }
  } catch (error) {
    console.error("Error fetching alert data:", error);
  }
}
// addNewHistory();

setInterval(() => {
  addNewHistory();
  getAlertDataAndSendEmail();
  console.log("chamou");
}, 60000);
