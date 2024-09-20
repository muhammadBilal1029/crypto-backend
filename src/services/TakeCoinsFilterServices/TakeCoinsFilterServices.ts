import { prisma } from "../../utils/prisma";

export default class TakeCoinsFilterServices {
  async execute(start: number) {
    const numberStart = start * 50 * 10;
    const numberTake = 500;

    const result = await prisma.coins.findMany({
      orderBy: {
        name: "asc",
      },
      skip: numberStart,
      take: numberTake,
      include: {
        history: {
          orderBy: {
            date: "desc",
          },
          take: 1,
        },
        alert_data:{},
      },
    });

    return { filter: result };
  }
}
