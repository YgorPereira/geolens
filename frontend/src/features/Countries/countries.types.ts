export interface Country {
    id?: number,
    name: string,
    population: number,
    language: string,
    coin: string,
    continent_id?: number,
    continent_name: string,
    city_quantity: number
}

export const countries: Country[] = [
  {
    id: 1,
    name: "Brasil",
    population: 214000000,
    language: "Português",
    coin: "Real (BRL)",
    continent_id: 1,
    continent_name: "América do Sul",
    city_quantity: 5570
  },
  {
    id: 2,
    name: "Argentina",
    population: 46000000,
    language: "Espanhol",
    coin: "Peso Argentino (ARS)",
    continent_id: 1,
    continent_name: "América do Sul",
    city_quantity: 2300
  },
  {
    id: 3,
    name: "Chile",
    population: 19500000,
    language: "Espanhol",
    coin: "Peso Chileno (CLP)",
    continent_id: 1,
    continent_name: "América do Sul",
    city_quantity: 350
  },
  {
    id: 4,
    name: "Estados Unidos",
    population: 331000000,
    language: "Inglês",
    coin: "Dólar (USD)",
    continent_id: 2,
    continent_name: "América do Norte",
    city_quantity: 19500
  },
  {
    id: 5,
    name: "Canadá",
    population: 38000000,
    language: "Inglês / Francês",
    coin: "Dólar Canadense (CAD)",
    continent_id: 2,
    continent_name: "América do Norte",
    city_quantity: 5100
  },
  {
    id: 6,
    name: "México",
    population: 128000000,
    language: "Espanhol",
    coin: "Peso Mexicano (MXN)",
    continent_id: 2,
    continent_name: "América do Norte",
    city_quantity: 2450
  },
  {
    id: 7,
    name: "França",
    population: 67000000,
    language: "Francês",
    coin: "Euro (EUR)",
    continent_id: 3,
    continent_name: "Europa",
    city_quantity: 35000
  },
  {
    id: 8,
    name: "Alemanha",
    population: 83000000,
    language: "Alemão",
    coin: "Euro (EUR)",
    continent_id: 3,
    continent_name: "Europa",
    city_quantity: 2050
  },
  {
    id: 9,
    name: "Espanha",
    population: 47000000,
    language: "Espanhol",
    coin: "Euro (EUR)",
    continent_id: 3,
    continent_name: "Europa",
    city_quantity: 8200
  },
  {
    id: 10,
    name: "Itália",
    population: 59000000,
    language: "Italiano",
    coin: "Euro (EUR)",
    continent_id: 3,
    continent_name: "Europa",
    city_quantity: 7900
  },
  {
    id: 11,
    name: "Portugal",
    population: 10300000,
    language: "Português",
    coin: "Euro (EUR)",
    continent_id: 3,
    continent_name: "Europa",
    city_quantity: 308
  },
  {
    id: 12,
    name: "Japão",
    population: 125000000,
    language: "Japonês",
    coin: "Iene (JPY)",
    continent_id: 4,
    continent_name: "Ásia",
    city_quantity: 1710
  },
  {
    id: 13,
    name: "China",
    population: 1400000000,
    language: "Mandarim",
    coin: "Yuan (CNY)",
    continent_id: 4,
    continent_name: "Ásia",
    city_quantity: 680
  },
  {
    id: 14,
    name: "Coreia do Sul",
    population: 52000000,
    language: "Coreano",
    coin: "Won (KRW)",
    continent_id: 4,
    continent_name: "Ásia",
    city_quantity: 250
  },
  {
    id: 15,
    name: "Índia",
    population: 1380000000,
    language: "Hindi / Inglês",
    coin: "Rupia Indiana (INR)",
    continent_id: 4,
    continent_name: "Ásia",
    city_quantity: 4000
  },
  {
    id: 16,
    name: "Egito",
    population: 110000000,
    language: "Árabe",
    coin: "Libra Egípcia (EGP)",
    continent_id: 5,
    continent_name: "África",
    city_quantity: 200
  },
  {
    id: 17,
    name: "África do Sul",
    population: 60000000,
    language: "Zulu / Africâner / Inglês",
    coin: "Rand (ZAR)",
    continent_id: 5,
    continent_name: "África",
    city_quantity: 2500
  },
  {
    id: 18,
    name: "Nigéria",
    population: 216000000,
    language: "Inglês",
    coin: "Naira (NGN)",
    continent_id: 5,
    continent_name: "África",
    city_quantity: 900
  },
  {
    id: 19,
    name: "Austrália",
    population: 26000000,
    language: "Inglês",
    coin: "Dólar Australiano (AUD)",
    continent_id: 6,
    continent_name: "Oceania",
    city_quantity: 300
  },
  {
    id: 20,
    name: "Nova Zelândia",
    population: 5000000,
    language: "Inglês / Maori",
    coin: "Dólar Neozelandês (NZD)",
    continent_id: 6,
    continent_name: "Oceania",
    city_quantity: 150
  }
];
