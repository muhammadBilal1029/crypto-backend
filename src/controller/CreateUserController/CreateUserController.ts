import { Request, Response } from "express";
import UserServices from "../../services/CreateUserServices/CreateUserServices";

export class CreateUserController {
  async handle(req: Request, res: Response) {
    const { username, password, email, name } = req.body;
console.log( req);

    try {
      const service = new UserServices();
      const result = await service.execute({ username, password, email, name });

      res.status(201).json(result);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }
}
