"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _prisma = require('../../utils/prisma');

 class TakeCoinsServices {
  async execute(start) {
    const numberStart = start * 25 * 10;
    const numberTake = 250;
    const result1 = await _prisma.prisma.coins.findMany({
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
    const result = [...result1];

    return result;
  }
} exports.TakeCoinsServices = TakeCoinsServices;
