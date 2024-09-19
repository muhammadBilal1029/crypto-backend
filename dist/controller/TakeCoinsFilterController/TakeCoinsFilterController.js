"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _TakeCoinsFilterServices = require('../../services/TakeCoinsFilterServices/TakeCoinsFilterServices'); var _TakeCoinsFilterServices2 = _interopRequireDefault(_TakeCoinsFilterServices);

 class TakeCoinsFilterController {
  async handle(req, res) {
    const { start } = req.query;

    try {
      const service = new (0, _TakeCoinsFilterServices2.default)();
      const result = await service.execute(Number(start));
      res.json(result);
    } catch (e) {
      console.log(e);
      
      return res.status(400).json({ error: true });
    }
  }
} exports.TakeCoinsFilterController = TakeCoinsFilterController;
