"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _prisma = require('../../utils/prisma');






 class AddToFavoriteServices {
  async execute({ user_id, id_coin }) {
    try {
      // adicionando o favorito
      const result = await _prisma.prisma.coins.update({
        where: {
          id: id_coin,
        },
        data: {
          Favorite: {
            connect: {
              userId: user_id,
            },
          },
        },
      });

      return result;
    } catch (e) {
      throw new Error("Opps something is wrong");
    }
  }
} exports.AddToFavoriteServices = AddToFavoriteServices;
