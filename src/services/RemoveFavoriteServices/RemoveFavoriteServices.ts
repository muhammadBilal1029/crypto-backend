import { prisma } from "../../utils/prisma";

interface RemoveFavoriteProps {
  id_coin: string;
  user_id: string;
}

export class RemoveFavoriteServices {
  async execute({ user_id, id_coin }: RemoveFavoriteProps) {
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

      const coin = await prisma.coins.update({
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
}
