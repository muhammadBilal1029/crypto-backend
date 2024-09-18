import { Request, Response } from "express";
import { TakeCoinsServices } from "../../services/TakeCoinsServices/TakeCoinsServices";

interface QueryProps {
  start: number;
}

export class TageCoinsController {
  async handle(req: Request<{}, {}, {}, QueryProps>, res: Response) {
    const { start } = req.query;
    try {
      const services = new TakeCoinsServices();
      const result = await services.execute(start);

      res.json(result);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
    res.send();
  }
}
