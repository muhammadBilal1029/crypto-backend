"use strict";Object.defineProperty(exports, "__esModule", {value: true});
var _AuthenticatedUserServices = require('../../services/AuthenticatedUserServices/AuthenticatedUserServices');

 class AuthenticatedUserController {
  async handle(request, response) {
    const { username, password } = request.body;

    try {
      const services = new (0, _AuthenticatedUserServices.AuthenticatedUserServices)();
      const result = await services.execute({ username, password });

      return response.json(result);
    } catch (e) {
      return response.status(401).json({ error: e.message });
    }
  }
} exports.AuthenticatedUserController = AuthenticatedUserController;
