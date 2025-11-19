export interface Continent {
    id?: number;
    name: string;
    description: string; 
    count_paises?: number;
};

export const continents: Continent[] = [
  {
    id: 1,
    name: "África",
    description: "Segundo maior continente, com rica diversidade cultural e climática."
  },
  {
    id: 2,
    name: "América do Norte",
    description: "Região composta por países como EUA, Canadá e México."
  },
  {
    id: 3,
    name: "América do Sul",
    description: "Continente conhecido pela Amazônia e pela diversidade natural."
  },
  {
    id: 4,
    name: "Ásia",
    description: "Maior continente do mundo, lar de grande parte da população global."
  },
  {
    id: 5,
    name: "Europa",
    description: "Região rica em história, cultura e desenvolvimento socioeconômico."
  },
  {
    id: 6,
    name: "Oceania",
    description: "Formada por Austrália, Nova Zelândia e múltiplas ilhas do Pacífico."
  },
  {
    id: 7,
    name: "Antártida",
    description: "Continente gelado, desabitado e essencial para o equilíbrio climático."
  },
  {
    id: 8,
    name: "Atlantis",
    description: "Continente mítico usado apenas para testes."
  },
  {
    id: 9,
    name: "Pangeia",
    description: "Supercontinente ancestral, ótimo para preencher listas grandes."
  },
  {
    id: 10,
    name: "Lemúria",
    description: "Outro continente hipotético usado em testes e demonstrações."
  },
  {
    id: 11,
    name: "Gondwana",
    description: "Um dos supercontinentes da história geológica da Terra."
  },
  {
    id: 12,
    name: "Laurásia",
    description: "Outra divisão histórica de antigas massas continentais."
  }
];