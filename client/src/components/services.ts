import axios from "axios";
import { param } from "framer-motion/client";

export const URL = "http://127.0.0.1:8000";
// export const URL = "https://b280-91-246-41-75.ngrok-free.app";

export function getFake_prizes(category: number) {
  if (category === 25) {
    return [
      {
        name: "Goblet",
        chance_percent: 0.807,
        price: 100,
      },
      {
        name: "Rose",
        chance_percent: 25,
        price: 25,
      },
      {
        name: "Cake",
        chance_percent: 1.21,
        price: 50,
      },
      {
        name: "Teddy_Bear",
        chance_percent: 21.37,
        price: 15,
      },
      {
        name: "Heart",
        chance_percent: 21.37,
        price: 15,
      },
      {
        name: "LollyPop",
        chance_percent: 25,
        price: 25,
      },
      {
        name: "Bouquet",
        chance_percent: 1.21,
        price: 50,
      },
      {
        name: "Ring",
        chance_percent: 0.807,
        price: 100,
      },
      {
        name: "Rocket",
        chance_percent: 1.21,
        price: 50,
      },
      {
        name: "Diamond",
        chance_percent: 0.806,
        price: 100,
      },
      {
        name: "Champagne",
        chance_percent: 1.21,
        price: 50,
      },
    ];
  } else {
    return [
      {
        name: "Goblet",
        chance_percent: 1.48,
        price: 100,
      },
      {
        name: "Rose",
        chance_percent: 13.47,
        price: 25,
      },
      {
        name: "Cake",
        chance_percent: 12.5,
        price: 50,
      },
      {
        name: "Teddy_Bear",
        chance_percent: 8.08,
        price: 15,
      },
      {
        name: "Heart",
        chance_percent: 8.08,
        price: 15,
      },
      {
        name: "LollyPop",
        chance_percent: 13.47,
        price: 25,
      },
      {
        name: "Bouquet",
        chance_percent: 12.5,
        price: 50,
      },
      {
        name: "Ring",
        chance_percent: 1.48,
        price: 100,
      },
      {
        name: "Rocket",
        chance_percent: 12.5,
        price: 50,
      },
      {
        name: "Diamond",
        chance_percent: 1.48,
        price: 100,
      },
      {
        name: "Champagne",
        chance_percent: 12.5,
        price: 50,
      },
      {
        name: "Happy B-Day",
        chance_percent: 1.19,
        price: 350,
      },
      {
        name: "Dark Happy B-Day",
        chance_percent: 1.27,
        price: 375,
      },
    ];
  }
}

export type Prize = {
  name: string;
  chance_percent: number;
  img: string;
  price: number;
};

export type PrizeSpin = {
  name: string;
  is_jackpot: boolean;
  img: string;
  price: number;
};

export type User = {
  telegram_name: string;
  spins: number;
  jackpots: number;
  spent_units: number;
};

export async function getPrizes(
  category: number
): Promise<{ name: string; chance_percent: number }[]> {
  try {
    const response = await axios.get(`${URL}/prizes/${category}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching prizes:", error);
    return [];
  }
}

export async function getUsers(
  category: number
): Promise<
  {
    telegram_name: string;
    spins: number;
    jackpots: number;
    spent_units: number;
  }[]
> {
  try {
    const response = await axios.get(`${URL}/leaderboard/${category}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching prizes:", error);
    return [];
  }
}

export async function Spin(
  category: number
): Promise<{ name: string; chance_percent: number }[]> {
  try {
    const response = await axios.post(`${URL}/spin`, {
      telegram_name: "User",
      category: category,
    });
    console.log("Spin response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error spinning:", error);
    return [];
  }
}
