import { productions } from "./movies";
import type { Achievement } from "../types";

export const achievements: Achievement[] = [
  {icon:"🛡️",name:"Eu poderia fazer isso o dia todo",desc:"Assistir ao primeiro filme.",test:knowledge=>knowledge.hasWatched(1)},
  {icon:"⚙️",name:"Iniciativa Vingadores",desc:"Concluir até Os Vingadores.",test:knowledge=>knowledge.hasWatchedEvery([1,2,3,4,5,6])},
  {icon:"💥",name:"Guerra Civil",desc:"Chegar ao fim do #13.",test:knowledge=>knowledge.hasWatched(13)},
  {icon:"🫰",name:"Nós estamos no fim do jogo",desc:"Assistir Guerra Infinita.",test:knowledge=>knowledge.hasWatched(18)},
  {icon:"❤️",name:"3000",desc:"Concluir Vingadores: Ultimato.",test:knowledge=>knowledge.hasWatched(20)},
  {icon:"⏳",name:"Variável temporal",desc:"Concluir Loki T1 e T2.",test:knowledge=>knowledge.hasWatchedEvery([21,29])},
  {icon:"🌌",name:"Multiversal",desc:"Assistir Sem Volta Para Casa, Multiverso da Loucura e Deadpool & Wolverine.",test:knowledge=>knowledge.hasWatchedEvery([26,27,32])},
  {icon:"🔴",name:"Só o essencial",desc:"Assistir todos os títulos essenciais já lançados.",test:knowledge=>productions.filter(x=>x.p==="essential").every(x=>knowledge.hasWatched(x.n))},
  {icon:"🏆",name:"Arquivo completo",desc:"Assistir todos os títulos lançados da lista.",test:knowledge=>productions.filter(x=>x.p!=="future").every(x=>knowledge.hasWatched(x.n))}
];
