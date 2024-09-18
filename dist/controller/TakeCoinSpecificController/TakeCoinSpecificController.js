"use strict";Object.defineProperty(exports, "__esModule", {value: true});
var _TakeCoinSpecificServices = require('../../services/TakeCoinSpecificServices/TakeCoinSpecificServices');

 class TakeCoinSpecificController {
  async handle(req, res) {
    const { id: idString } = req.params;

    const id = Number(idString);

    try {
      const service = new (0, _TakeCoinSpecificServices.TakeCoinSpecificServices)();
      const coin = await service.execute(id);
      return res.json(coin);
    } catch (e) {
      return res.status(400).json({ error: e.message });
    }
  }
} exports.TakeCoinSpecificController = TakeCoinSpecificController;
