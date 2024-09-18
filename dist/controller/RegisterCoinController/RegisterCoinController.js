"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _axios = require('axios'); var _axios2 = _interopRequireDefault(_axios);

var _RegisterCoinServices = require('../../services/RegisterCoinServices/RegisterCoinServices');

 class RegisterCoinController {
  async handle(req, res) {
    // Recebendo o array com todas as coins
    const { data: coins } = await _axios2.default.get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/map",
      {
        headers: {
          "X-CMC_PRO_API_KEY": process.env.CRIPTO_KEY,
        },
      }
    );

    try {
      const services = new (0, _RegisterCoinServices.RegisterCoinServices)();
      await services.execute({ data: coins.data });

      return res.json({ create: true });
    } catch (e) {
      return res.json({ error: "Não cadastrado" });
    }
  }
} exports.RegisterCoinController = RegisterCoinController;
