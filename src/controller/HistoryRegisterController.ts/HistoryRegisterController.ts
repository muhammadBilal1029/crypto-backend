import axios from "axios";
import { Request, Response } from "express";
import {
  ExecuteProps,
  HistoryRegisterServices,
} from "../../services/HistoryRegisterServices/HistoryRegisterServices";

export class HistoryRegisterController {
  async handle(req: Request, res: Response) {
    const { key } = req.query;

    if (key !== process.env.KEY) {
      return res.status(401).json({ error: "Not allowed" });
    }

    // Pegando a ultima atualização das coins
    const { data: history } = await axios.get<ExecuteProps>(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      {
        params: { start: "1", limit: "4998" },
        headers: {
          "X-CMC_PRO_API_KEY": process.env.CRIPTO_KEY,
        },
      }
    );
    const history1 = [...history.data];

    const { data: history2 } = await axios.get<ExecuteProps>(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      {
        params: { start: "4999", limit: "5000" },
        headers: {
          "X-CMC_PRO_API_KEY": process.env.CRIPTO_KEY,
        },
      }
    );
    const newHistory = [...history1, ...history2.data];

    try {
      const service = new HistoryRegisterServices();
      // Enviando o array para a função tratar
      await service.execute({ data: newHistory });

      res.json({ register: true });
    } catch (e) {
      res.json({ error: e.message });
    }
  }
}
