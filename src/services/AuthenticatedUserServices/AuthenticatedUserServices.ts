import { prisma } from "../../utils/prisma";
import { sign } from "jsonwebtoken";

interface AuthenticatedProps {
  username: string;
  password: string;
}

export class AuthenticatedUserServices {
  async execute({ username, password }: AuthenticatedProps) {
    // find user
    const user = await prisma.user.findFirst({
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

    const token = sign(
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
}
