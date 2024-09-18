"use strict";Object.defineProperty(exports, "__esModule", {value: true});
var _TakeFavoriteServices = require('../../services/TakeFavoriteServices/TakeFavoriteServices');

 class TakeFavoriteController {
  async handle(request, response) {
    const { user_id } = request;

    try {
      const service = new (0, _TakeFavoriteServices.TakeFavoriteServices)();
      const result = await service.execute({ user_id });

      return response.json(result);
    } catch (e) {
      response.status(500).json({ error: e.message });
    }
  }
} exports.TakeFavoriteController = TakeFavoriteController;
