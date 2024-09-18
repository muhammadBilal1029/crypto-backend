"use strict";Object.defineProperty(exports, "__esModule", {value: true});
var _TakeCoinsServices = require('../../services/TakeCoinsServices/TakeCoinsServices');





 class TageCoinsController {
  async handle(req, res) {
    const { start } = req.query;
    try {
      const services = new (0, _TakeCoinsServices.TakeCoinsServices)();
      const result = await services.execute(start);

      res.json(result);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
    res.send();
  }
} exports.TageCoinsController = TageCoinsController;
