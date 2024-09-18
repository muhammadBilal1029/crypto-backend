"use strict";Object.defineProperty(exports, "__esModule", {value: true});
var _RemoveFavoriteServices = require('../../services/RemoveFavoriteServices/RemoveFavoriteServices');

 class RemoveFavoriteController {
  async handle(req, res) {
    const { user_id } = req;
    const { id_coin } = req.body;

    try {
      const services = new (0, _RemoveFavoriteServices.RemoveFavoriteServices)();
      const result = await services.execute({ user_id, id_coin });

      res.status(200).json(result);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }
} exports.RemoveFavoriteController = RemoveFavoriteController;
