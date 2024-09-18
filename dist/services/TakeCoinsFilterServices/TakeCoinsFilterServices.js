"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _prisma = require('../../utils/prisma');

 class TakeCoinsFilterServices {
  async execute(start) {
    const numberStart = start * 50 * 10;
    const numberTake = 500;

    const result = await _prisma.prisma.coins.findMany({
      orderBy: {
        name: "asc",
      },
      skip: numberStart,
      take: numberTake,
      include: {
        history: {
          orderBy: {
            date: "desc",
          },
          take: 1,
        },
      },
    });

    return { filter: result };
  }
} exports.default = TakeCoinsFilterServices;
