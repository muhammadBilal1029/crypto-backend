import axios from "axios";
import { Request, Response } from "express";
import { RegisterCoinServices } from "../../services/RegisterCoinServices/RegisterCoinServices";

export class RegisterCoinController {
  async handle(req: Request, res: Response) {
    // Recebendo o array com todas as coins
    const { data: coins } = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/map",
      {
        headers: {
          "X-CMC_PRO_API_KEY": process.env.CRIPTO_KEY,
        },
      }
    );

    try {
      const services = new RegisterCoinServices();
      await services.execute({ data: coins.data });

      return res.json({ create: true });
    } catch (e) {
      return res.json({ error: "Não cadastrado" });
    }
  }
}
