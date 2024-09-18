import { prisma } from "../../utils/prisma";

export class TakeCoinsServices {
  async execute(start: number) {
    const numberStart = start * 25 * 10;
    const numberTake = 250;
    const result1 = await prisma.coins.findMany({
      skip: numberStart,
      take: numberTake,
      include: {
        history: {
          orderBy: {
            date: "desc",
          },
          take: 1,
        },
      },
    });
    const result = [...result1];

    return result;
  }
}
