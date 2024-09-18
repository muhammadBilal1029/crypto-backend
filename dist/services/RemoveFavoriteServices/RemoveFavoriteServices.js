"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _prisma = require('../../utils/prisma');






 class RemoveFavoriteServices {
  async execute({ user_id, id_coin }) {
    try {
      //  // adicionando o favorito
      // const result = await prisma.favorite.update({
      //   where: {
      //     userId: user_id,
      //   },
      //   data: {
      //     coins: {
      //       upsert:{

      //       }
      //     },
      //   },
      // });

      const coin = await _prisma.prisma.coins.update({
        where: {
          id: id_coin,
        },
        data: {
          favoriteId: null,
        },
      });

      return coin;
    } catch (e) {
      throw new Error("Opps something is wrong");
    }
  }
} exports.RemoveFavoriteServices = RemoveFavoriteServices;
