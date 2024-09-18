"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _prisma = require('../../utils/prisma');
var _jsonwebtoken = require('jsonwebtoken');






 class AuthenticatedUserServices {
  async execute({ username, password }) {
    // find user
    const user = await _prisma.prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (!user) {
      throw new Error("Username or password incorrectly!");
    }

    if (user.password !== password) {
      console.log("password invalid");
      throw new Error("Username or password incorrectly!");
    }

    const token = _jsonwebtoken.sign.call(void 0, 
      {
        user: {
          name: user.name,
          email: user.email,
          id: user.id,
        },
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );

    return { token };
  }
} exports.AuthenticatedUserServices = AuthenticatedUserServices;
