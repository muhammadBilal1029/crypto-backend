import { prisma } from "../../utils/prisma";

interface UserProps {
  username: string;
  password: string;
  email: string | undefined;
  name: string;
}

export default class UserServices {
  async execute({ username, password, email, name }: UserProps) {
    const create = await prisma.user.create({
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
}
