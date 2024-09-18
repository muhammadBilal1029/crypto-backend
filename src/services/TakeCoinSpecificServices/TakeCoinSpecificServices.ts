import { prisma } from "../../utils/prisma";

export class TakeCoinSpecificServices {
  async execute(id: number) {
    const coin = await prisma.coins.findFirst({
      where: {
        id_coin: id,
      },
      include: {
        history: {
          orderBy: {
            date: "desc",
          },
        },
      },
    });

    if (coin) {
      return coin;
    } else {
      throw new Error("Coin not exist");
    }
  }
}
