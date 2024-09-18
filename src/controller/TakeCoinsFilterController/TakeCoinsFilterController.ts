import { Request, Response } from "express";
import TakeCoinsFilterServices from "../../services/TakeCoinsFilterServices/TakeCoinsFilterServices";

export class TakeCoinsFilterController {
  async handle(req: Request, res: Response) {
    const { start } = req.query;

    try {
      const service = new TakeCoinsFilterServices();
      const result = await service.execute(Number(start));
      res.json(result);
    } catch (e) {
      return res.status(400).json({ error: true });
    }
  }
}
