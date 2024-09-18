import { prisma } from "../../utils/prisma";

interface TakeFavoriteServicesProps {
  user_id: string;
}

export class TakeFavoriteServices {
  async execute({ user_id }: TakeFavoriteServicesProps) {
    const result = await prisma.user.findFirst({
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
}
