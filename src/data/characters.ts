import type { Character } from "../types";
import { characterAssets } from "./characterAssets";

export const characters: Character[] = [
  {
    id: "steve-rogers",
    name: "Steve Rogers",
    firstAppearance: 1,
    appearances: [1, 6, 8, 11, 13, 18, 20],
    images: [
      { revealedAt: 1, src: characterAssets.steveRogers[1], alt: "Steve Rogers como Capitão América", source: "local: src/assets/characters/steve-rogers/1.webp" },
      { revealedAt: 20, src: characterAssets.steveRogers[20], alt: "Steve Rogers idoso em Ultimato", source: "local: src/assets/characters/steve-rogers/20.webp" },
    ],
    updates: [
      { revealedAt: 1, text: "Capitão América. Desperta no mundo moderno após décadas no gelo." },
      { revealedAt: 6, text: "Membro fundador dos Vingadores." },
      { revealedAt: 13, text: "Rompe com Tony e deixa a equipe dividida." },
      { revealedAt: 20, text: "Devolve as pedras e passa o escudo para Sam Wilson." },
    ],
  },
  {
    id: "bucky-barnes",
    name: "Bucky Barnes",
    firstAppearance: 1,
    appearances: [1, 8, 13, 14, 18, 20, 23, 35],
    images: [
      { revealedAt: 1, src: characterAssets.buckyBarnes[1], alt: "Bucky Barnes", source: "local: src/assets/characters/bucky-barnes/1.webp" },
      { revealedAt: 8, src: characterAssets.buckyBarnes[8], alt: "Bucky Barnes como Soldado Invernal", source: "local: src/assets/characters/bucky-barnes/8.webp" },
    ],
    updates: [
      { revealedAt: 1, text: "Melhor amigo de Steve; dado como morto durante a guerra." },
      { revealedAt: 8, text: "Está vivo e foi transformado no Soldado Invernal pela HYDRA." },
      { revealedAt: 13, text: "Foge ao lado de Steve após o conflito dos Acordos." },
    ],
  },
  {
    id: "tony-stark",
    name: "Tony Stark",
    firstAppearance: 3,
    appearances: [3, 4, 6, 7, 11, 13, 15, 18, 20],
    images: [
      { revealedAt: 3, src: characterAssets.tonyStark[3], alt: "Tony Stark como Homem de Ferro", source: "local: src/assets/characters/tony-stark/3.webp" },
    ],
    updates: [
      { revealedAt: 3, text: "Homem de Ferro; revela publicamente sua identidade." },
      { revealedAt: 6, text: "Membro fundador dos Vingadores." },
      { revealedAt: 13, text: "Lidera o lado favorável aos Acordos de Sokovia." },
      { revealedAt: 20, text: "Sacrifica a própria vida para derrotar Thanos." },
    ],
  },
  {
    id: "thor",
    name: "Thor",
    firstAppearance: 5,
    appearances: [5, 6, 11, 16, 17, 18, 20],
    images: [
      { revealedAt: 5, src: characterAssets.thor[5], alt: "Thor", source: "local: src/assets/characters/thor/5.webp" },
    ],
    updates: [
      { revealedAt: 5, text: "Príncipe de Asgard, novamente digno de Mjölnir." },
      { revealedAt: 17, text: "Asgard é destruída; lidera os sobreviventes." },
      { revealedAt: 20, text: "Participa da batalha final contra Thanos." },
    ],
  },
  {
    id: "loki",
    name: "Loki",
    firstAppearance: 5,
    appearances: [5, 6, 17, 18, 21, 29],
    images: [
      { revealedAt: 5, src: characterAssets.loki[5], alt: "Loki", source: "local: src/assets/characters/loki/5.webp" },
    ],
    updates: [
      { revealedAt: 5, text: "Irmão adotivo de Thor; tentou tomar o trono de Asgard." },
      { revealedAt: 6, text: "Liderou a invasão de Nova York e foi levado de volta a Asgard." },
      { revealedAt: 18, text: "É morto por Thanos." },
      { revealedAt: 21, text: "Uma variante capturada pela TVA conhece Sylvie e Aquele Que Permanece." },
      { revealedAt: 29, text: "Passa a sustentar as linhas temporais." },
    ],
  },
  {
    id: "natasha-romanoff",
    name: "Natasha Romanoff",
    firstAppearance: 4,
    appearances: [4, 6, 8, 11, 13, 18, 20],
    images: [
      { revealedAt: 4, src: characterAssets.natashaRomanoff[4], alt: "Natasha Romanoff como Viúva Negra", source: "local: src/assets/characters/natasha-romanoff/4.webp" },
    ],
    updates: [
      { revealedAt: 4, text: "Agente da S.H.I.E.L.D. conhecida como Viúva Negra." },
      { revealedAt: 6, text: "Membro fundadora dos Vingadores." },
      { revealedAt: 20, text: "Sacrifica-se em Vormir para obter uma pedra." },
    ],
  },
  {
    id: "bruce-banner",
    name: "Bruce Banner",
    firstAppearance: 6,
    appearances: [6, 7, 11, 17, 18, 20, 24],
    images: [
      { revealedAt: 6, src: characterAssets.bruceBanner[6], alt: "Bruce Banner como Hulk", source: "local: src/assets/characters/bruce-banner/6.webp" },
    ],
    updates: [
      { revealedAt: 6, text: "Hulk e membro fundador dos Vingadores." },
      { revealedAt: 11, text: "Ajuda Tony a criar Ultron." },
      { revealedAt: 20, text: "Usa as pedras para trazer de volta os desaparecidos." },
    ],
  },
  {
    id: "wanda-maximoff",
    name: "Wanda Maximoff",
    firstAppearance: 11,
    appearances: [11, 13, 18, 20, 22, 27],
    images: [
      { revealedAt: 11, src: characterAssets.wandaMaximoff[11], alt: "Wanda Maximoff", source: "local: src/assets/characters/wanda-maximoff/11.webp" },
    ],
    updates: [
      { revealedAt: 11, text: "Entra nos Vingadores após enfrentar Ultron." },
      { revealedAt: 22, text: "Cria Westview, torna-se a Feiticeira Escarlate e parte com o Darkhold." },
      { revealedAt: 27, text: "Persegue America Chavez entre universos e destrói o Darkhold." },
    ],
  },
  {
    id: "peter-parker",
    name: "Peter Parker",
    firstAppearance: 13,
    appearances: [13, 15, 18, 20, 25, 26],
    images: [
      { revealedAt: 13, src: characterAssets.peterParker[13], alt: "Peter Parker como Homem-Aranha", source: "local: src/assets/characters/peter-parker/13.webp" },
      { revealedAt: 26, src: characterAssets.peterParker[26], alt: "Peter Parker após Sem Volta Para Casa", source: "local: src/assets/characters/peter-parker/26.webp" },
    ],
    updates: [
      { revealedAt: 13, text: "Homem-Aranha recrutado por Tony Stark." },
      { revealedAt: 15, text: "Recusa uma vaga formal nos Vingadores naquele momento." },
      { revealedAt: 25, text: "Sua identidade é revelada ao mundo." },
      { revealedAt: 26, text: "O mundo inteiro esquece que Peter Parker existe." },
    ],
  },
  {
    id: "stephen-strange",
    name: "Stephen Strange",
    firstAppearance: 16,
    appearances: [16, 17, 18, 20, 26, 27],
    images: [
      { revealedAt: 16, src: characterAssets.stephenStrange[16], alt: "Stephen Strange como Doutor Estranho", source: "local: src/assets/characters/stephen-strange/16.webp" },
    ],
    updates: [
      { revealedAt: 16, text: "Mestre das artes místicas; protege a Terra de ameaças dimensionais." },
      { revealedAt: 26, text: "Tenta ajudar Peter e acaba abrindo brechas entre universos." },
      { revealedAt: 27, text: "Viaja entre universos protegendo America Chavez." },
    ],
  },
  {
    id: "sam-wilson",
    name: "Sam Wilson",
    firstAppearance: 8,
    appearances: [8, 12, 13, 18, 20, 23, 34],
    images: [
      { revealedAt: 8, src: characterAssets.samWilson[8], alt: "Sam Wilson como Falcão", source: "local: src/assets/characters/sam-wilson/8.webp" },
    ],
    updates: [
      { revealedAt: 8, text: "Aliado de Steve conhecido como Falcão." },
      { revealedAt: 20, text: "Recebe o escudo de Steve Rogers." },
      { revealedAt: 23, text: "Assume publicamente o manto de Capitão América." },
      { revealedAt: 34, text: "Atua como Capitão América em uma crise internacional." },
    ],
  },
  {
    id: "scott-lang",
    name: "Scott Lang",
    firstAppearance: 12,
    appearances: [12, 13, 19, 20, 31],
    images: [
      { revealedAt: 12, src: characterAssets.scottLang[12], alt: "Scott Lang como Homem-Formiga", source: "local: src/assets/characters/scott-lang/12.webp" },
    ],
    updates: [
      { revealedAt: 12, text: "Assume o traje do Homem-Formiga e retorna do Reino Quântico." },
      { revealedAt: 19, text: "Fica preso no Reino Quântico após o estalo." },
      { revealedAt: 20, text: "Ajuda a viabilizar a viagem no tempo dos Vingadores." },
      { revealedAt: 31, text: "Enfrenta Kang no Reino Quântico." },
    ],
  },
  {
    id: "carol-danvers",
    name: "Carol Danvers",
    firstAppearance: 2,
    appearances: [2, 20, 24, 28],
    images: [
      { revealedAt: 2, src: characterAssets.carolDanvers[2], alt: "Carol Danvers como Capitã Marvel", source: "local: src/assets/characters/carol-danvers/2.webp" },
    ],
    updates: [
      { revealedAt: 2, text: "Descobre sua origem humana e deixa a Terra para ajudar os Skrulls." },
      { revealedAt: 20, text: "Participa da batalha final contra Thanos." },
      { revealedAt: 28, text: "Tem seus poderes entrelaçados com Monica e Kamala." },
    ],
  },
  {
    id: "wilson-fisk",
    name: "Wilson Fisk",
    firstAppearance: 33,
    appearances: [33, 37],
    images: [
      { revealedAt: 27, src: characterAssets.wilsonFisk[27], alt: "Wilson Fisk", source: "local: src/assets/characters/wilson-fisk/27.webp" },
    ],
    updates: [
      { revealedAt: 27, text: "Reaparece como figura central do submundo de Nova York." },
      { revealedAt: 33, text: "Demonstra interesse em uma carreira política." },
      { revealedAt: 33, text: "Torna-se prefeito de Nova York." },
    ],
  },
];

