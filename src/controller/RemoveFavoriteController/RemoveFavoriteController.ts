import { Request, Response } from "express";
import { RemoveFavoriteServices } from "../../services/RemoveFavoriteServices/RemoveFavoriteServices";

export class RemoveFavoriteController {
  async handle(req: Request, res: Response) {
    const { user_id } = req;
    const { id_coin } = req.body;

    try {
      const services = new RemoveFavoriteServices();
      const result = await services.execute({ user_id, id_coin });

      res.status(200).json(result);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }
}
