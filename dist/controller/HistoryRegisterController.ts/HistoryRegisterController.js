"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _axios = require('axios'); var _axios2 = _interopRequireDefault(_axios);




var _HistoryRegisterServices = require('../../services/HistoryRegisterServices/HistoryRegisterServices');

 class HistoryRegisterController {
  async handle(req, res) {
    const { key } = req.query;

    if (key !== process.env.KEY) {
      return res.status(401).json({ error: "Not allowed" });
    }

    // Pegando a ultima atualização das coins
    const { data: history } = await _axios2.default.get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      {
        params: { start: "1", limit: "999" },
        headers: {
          "X-CMC_PRO_API_KEY": process.env.CRIPTO_KEY,
        },
      }
    );
    const history1 = [...history.data];

    const { data: history2 } = await _axios2.default.get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      {
        params: { start: "999", limit: "2000" },
        headers: {
          "X-CMC_PRO_API_KEY": process.env.CRIPTO_KEY,
        },
      }
    );
    const newHistory = [...history1, ...history2.data];

    try {
      const service = new (0, _HistoryRegisterServices.HistoryRegisterServices)();
      // Enviando o array para a função tratar
      await service.execute({ data: newHistory });

      res.json({ register: true });
    } catch (e) {
      console.log(e);
      
      res.json({ error: e.message });
    }
  }
} exports.HistoryRegisterController = HistoryRegisterController;
