import { prisma } from "../../utils/prisma";

interface AddToFavoriteProps {
  id_coin: string;
  user_id: string;
}

export class AddToFavoriteServices {
  async execute({ user_id, id_coin }: AddToFavoriteProps) {
    try {
      // adicionando o favorito
      const result = await prisma.coins.update({
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
}
