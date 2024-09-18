"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _prisma = require('../../utils/prisma');












 class RegisterCoinServices {
  async execute({ data }) {
    const response = await _prisma.prisma.coins.createMany({
      data: data.map((element) => {
        return {
          name: element.name,
          id_coin: element.id,
          symbol: element.symbol,
          rank: element.rank,
        };
      }),
    });

    if (response) {
      console.log("cadastrou");
    }
    return { success: true };
  }
} exports.RegisterCoinServices = RegisterCoinServices;
