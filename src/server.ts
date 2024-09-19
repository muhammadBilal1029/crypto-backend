import express from "express";
import cors from "cors";
import { router } from "./router";
import axios from "axios";

const app = express();

app.use(cors());
app.use(express.urlencoded({ limit: "460mb", extended: true }));
app.use(express.json({ limit: "460mb" }));

app.use(router);

const port = process.env.PORT || 3000;
app.get('/', (req, res) => {
  res.send('Welcome To CryptoLab!');
});
app.listen(process.env.PORT || 3000, () =>
  console.log(`Server is running on port ${port}`),
    
);
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

// addNewHistory();

setInterval(() => {
  addNewHistory();
  console.log("chamou");
}, 60000);
