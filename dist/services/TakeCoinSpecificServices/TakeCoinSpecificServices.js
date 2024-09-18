"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _prisma = require('../../utils/prisma');

 class TakeCoinSpecificServices {
  async execute(id) {
    const coin = await _prisma.prisma.coins.findFirst({
      where: {
        id_coin: id,
      },
      include: {
        history: {
          orderBy: {
            date: "desc",
          },
        },
      },
    });

    if (coin) {
      return coin;
    } else {
      throw new Error("Coin not exist");
    }
  }
} exports.TakeCoinSpecificServices = TakeCoinSpecificServices;
