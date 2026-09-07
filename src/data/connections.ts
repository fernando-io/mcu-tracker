import type { Connection, KnowledgeEntry, UniverseState } from "../types";

export const knowledge: KnowledgeEntry[] = [
  {name:"S.H.I.E.L.D.",kind:"organização",revealedAt:1},
  {name:"HYDRA",kind:"organização",revealedAt:1},
  {name:"Tesseract",kind:"artefato",revealedAt:1},
  {name:"Asgard",kind:"lugar",revealedAt:5},
  {name:"Bifrost",kind:"conceito",revealedAt:5},
  {name:"Vingadores",kind:"equipe",revealedAt:6},
  {name:"Sokovia",kind:"lugar",revealedAt:11},
  {name:"Reino Quântico",kind:"conceito",revealedAt:12},
  {name:"Wakanda",kind:"lugar",revealedAt:14},
  {name:"Kamar-Taj",kind:"lugar",revealedAt:16},
  {name:"Dimensão Negra",kind:"conceito",revealedAt:16},
  {name:"TVA",kind:"organização",revealedAt:21},
  {name:"Multiverso",kind:"conceito",revealedAt:21},
  {name:"Westview",kind:"lugar",revealedAt:22},
  {name:"Talokan",kind:"lugar",revealedAt:28},
  {name:"Linhas temporais",kind:"conceito",revealedAt:29}
];

export const connections: Connection[] = [
  ["Steve Rogers","Bucky Barnes",1,"amizade"],["Steve Rogers","S.H.I.E.L.D.",1,"aliança"],["HYDRA","Tesseract",1,"uso"],["Tony Stark","S.H.I.E.L.D.",4,"cooperação"],["Thor","Loki",5,"irmãos"],["Steve Rogers","Vingadores",6,"membro"],["Tony Stark","Vingadores",6,"membro"],["Thor","Vingadores",6,"membro"],["Natasha Romanoff","Vingadores",6,"membro"],["Bruce Banner","Vingadores",6,"membro"],["Steve Rogers","Sam Wilson",8,"aliança"],["Steve Rogers","Bucky Barnes",8,"conflito / vínculo"],["Tony Stark","Wanda Maximoff",11,"conflito"],["Scott Lang","Reino Quântico",12,"acesso"],["Tony Stark","Peter Parker",13,"mentor"],["Steve Rogers","Tony Stark",13,"ruptura"],["Stephen Strange","Kamar-Taj",16,"mestre"],["Loki","TVA",21,"custódia / aliança"],["Wanda Maximoff","Westview",22,"criação"],["Sam Wilson","Capitão América",23,"manto"],["Peter Parker","Stephen Strange",26,"feitiço"],["Wilson Fisk","Nova York",33,"prefeito"]
];

export const universeStates: UniverseState[] = [
  {revealedAt:1,title:"Steve Rogers",text:"Acordou no mundo moderno após quase 70 anos."},
  {revealedAt:6,title:"Vingadores",text:"A equipe foi formada e derrotou a invasão de Nova York."},
  {revealedAt:8,title:"S.H.I.E.L.D.",text:"A organização entrou em colapso após a infiltração da HYDRA ser exposta."},
  {revealedAt:13,title:"Vingadores",text:"A equipe terminou dividida após os Acordos de Sokovia e o conflito entre Steve e Tony."},
  {revealedAt:18,title:"Universo",text:"Metade dos seres vivos desapareceu após o estalo de Thanos."},
  {revealedAt:20,title:"Universo",text:"Os desaparecidos retornaram. Thanos foi derrotado. Tony morreu e Steve passou o escudo a Sam."},
  {revealedAt:21,title:"TVA / tempo",text:"A estrutura que controlava uma Linha do Tempo Sagrada foi abalada após a morte de Aquele Que Permanece."},
  {revealedAt:23,title:"Capitão América",text:"Sam Wilson assumiu publicamente o manto."},
  {revealedAt:26,title:"Peter Parker",text:"O mundo esqueceu completamente a existência de Peter Parker."},
  {revealedAt:29,title:"Multiverso",text:"Loki passou a sustentar inúmeras linhas temporais, enquanto a TVA mudou sua função."},
  {revealedAt:33,title:"Nova York",text:"Wilson Fisk tornou-se prefeito e a tensão com vigilantes aumentou."},
  {revealedAt:35,title:"Novos heróis",text:"Uma nova equipe formada por antigos agentes e anti-heróis passou a ocupar espaço público relevante."}
];
