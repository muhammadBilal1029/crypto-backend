"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _prisma = require('../../utils/prisma');





 class TakeFavoriteServices {
  async execute({ user_id }) {
    const result = await _prisma.prisma.user.findFirst({
      where: {
        id: user_id,
      },
      include: {
        Favorite: {
          include: {
            coins: {
              include: {
                history: {
                  orderBy: {
                    date: "desc",
                  },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });

    if (!result) {
      throw new Error("Error interno, servidor not find user");
    }

    return result;
  }
} exports.TakeFavoriteServices = TakeFavoriteServices;
