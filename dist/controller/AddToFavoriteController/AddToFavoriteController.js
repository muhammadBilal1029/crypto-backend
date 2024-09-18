"use strict";Object.defineProperty(exports, "__esModule", {value: true});
var _AddToFavoriteServices = require('../../services/AddToFavoriteServices/AddToFavoriteServices');

 class AddToFavoriteController {
  async handle(req, res) {
    const { user_id } = req;
    const { id_coin } = req.body;

    try {
      const services = new (0, _AddToFavoriteServices.AddToFavoriteServices)();
      const result = await services.execute({ user_id, id_coin });

      res.status(201).json(result);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  }
} exports.AddToFavoriteController = AddToFavoriteController;
