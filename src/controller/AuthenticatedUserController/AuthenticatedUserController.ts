import { Request, Response } from "express";
import { AuthenticatedUserServices } from "../../services/AuthenticatedUserServices/AuthenticatedUserServices";

export class AuthenticatedUserController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body;

    try {
      const services = new AuthenticatedUserServices();
      const result = await services.execute({ username, password });

      return response.json(result);
    } catch (e) {
      return response.status(401).json({ error: e.message });
    }
  }
}
