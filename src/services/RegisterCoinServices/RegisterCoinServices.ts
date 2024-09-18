import { prisma } from "../../utils/prisma";

interface CoinProps {
  name: string;
  symbol: string;
  id: number;
  rank: number;
}

interface ExecuteProps {
  data: CoinProps[];
}

export class RegisterCoinServices {
  async execute({ data }: ExecuteProps) {
    const response = await prisma.coins.createMany({
      data: data.map((element) => {
        return {
          name: element.name,
          id_coin: element.id,
          symbol: element.symbol,
          rank: element.rank,
        };
      }),
    });

    if (response) {
      console.log("cadastrou");
    }
    return { success: true };
  }
}
