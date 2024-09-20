import express from "express";
import cors from "cors";
import { router } from "./router";
import axios from "axios";

var nodemailer = require('nodemailer');
const app = express();
app.use(cors());
app.use(express.urlencoded({ limit: "460mb", extended: true }));
app.use(express.json({ limit: "460mb" }));

app.use(router);
var {prisma} = require('../src/utils/prisma');
const port = process.env.PORT || 3000;
app.get('/', (req, res) => {
  res.send('Welcome To CryptoLab!');
});
app.listen(port, async () => {
  
  console.log(`Server is running on port ${port}`);
});
async function addNewHistory() {
  const { status } = await axios.get(`${process.env.URL_BACKEND}/new/history`, {
    params: { key: process.env.KEY },
  });

  if (status == 200) {
    return;
  } else {
    console.log("Erro ao atualizar historico");
  }
}
async function getUserEmails() { 
  const users = await prisma.user.findMany({
    select: {
      email: true,
    },
  });

  return users.map((user) => user.email).filter((email) => email !== null) as string[]; 
}
async function sendEmailsToUsers(matchingCoins: any[]) {
  if(matchingCoins.length){
  const userEmails = await getUserEmails();
  console.log("Users Email", userEmails);
  let emailContent=''
 for (let index = 0; index < matchingCoins.length; index++) {
  const coin = matchingCoins[index];
  const recentHistory = coin.history[0];
    const updatedAlertData = await prisma.alertData.update({
      where: {
        id: coin.alert_data.id, // Use the ID of the specific AlertData you want to update
      },
      data: {
        date_sent: new Date().toISOString(), // Only updating the price field
      },
    });
    emailContent+=`
      Coin: ${coin.name}
      Symbol: ${coin.symbol}
      Recent Price: ${recentHistory.price}
      Recent Volume (24h): ${recentHistory.valume_24h}
      ------------------------
    `
 }
 

  
  console.log("Email Content", emailContent);

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  let mailOptions = {
    from: process.env.GMAIL_USER,
    to:userEmails.join(','),  
    subject: 'Matching Coins Alert',
    text: `Here are the coins matching your alert criteria:\n\n${emailContent}`,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
}

async function checkAndSendAlerts() {
  const coins = await prisma.coins.findMany({
   
    where: {
      alert_data: {
        isNot: null, 
      },
    },
    include: {
      alert_data:{

      },
      history: {
        orderBy: {
          date: "desc",
        },
        take: 1,
      },
    },
  });
  console.log("Coins", coins);

  try {
   

    const matchingCoins = coins.filter((coin) => {
      const recentHistory = coin.history[0];
      console.log("Recent History", recentHistory);

      const alertData =coin.alert_data;
      console.log("Alert Data", alertData);
      console.log("email sent",  new Date(alertData.date_sent).toDateString()!=new Date().toDateString() && (recentHistory.price >= parseFloat(alertData.price) ||
      recentHistory.valume_24h >= parseFloat(alertData.valume_24h)));
      return new Date(alertData.date_sent).toDateString()!=new Date().toDateString() && (recentHistory.price >= parseFloat(alertData.price) ||
      recentHistory.valume_24h >= parseFloat(alertData.valume_24h))
    });
    console.log(matchingCoins);
    
    await sendEmailsToUsers(matchingCoins);
  } catch (error) {
    console.error("Error checking and sending alerts:", error);
  }
}

// addNewHistory();

setInterval(() => {
  addNewHistory();
  checkAndSendAlerts();

  console.log("chamou");
}, 60000);
