import { Request, Response } from "express";
import { TakeFavoriteServices } from "../../services/TakeFavoriteServices/TakeFavoriteServices";

export class TakeFavoriteController {
  async handle(request: Request, response: Response) {
    const { user_id } = request;

    try {
      const service = new TakeFavoriteServices();
      const result = await service.execute({ user_id });

      return response.json(result);
    } catch (e) {
      response.status(500).json({ error: e.message });
    }
  }
}
