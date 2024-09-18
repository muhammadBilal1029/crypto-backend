"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _prisma = require('../../utils/prisma');








 class UserServices {
  async execute({ username, password, email, name }) {
    const create = await _prisma.prisma.user.create({
      data: {
        username,
        password,
        name,
        email: email,
        Favorite: {
          create: {
            coins: {
              connect: {
                id: "61e9977a526da74e89d17df9",
              },
            },
          },
        },
      },
    });

    return create;
  }
} exports.default = UserServices;
