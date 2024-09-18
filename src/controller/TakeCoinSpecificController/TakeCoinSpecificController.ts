import { Request, Response } from "express";
import { TakeCoinSpecificServices } from "../../services/TakeCoinSpecificServices/TakeCoinSpecificServices";

export class TakeCoinSpecificController {
  async handle(req: Request, res: Response) {
    const { id: idString } = req.params;

    const id = Number(idString);

    try {
      const service = new TakeCoinSpecificServices();
      const coin = await service.execute(id);
      return res.json(coin);
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  }
}
