import { productions } from "./movies";
import type { Achievement } from "../types";

export const achievements: Achievement[] = [
  {icon:"🛡️",name:"Eu poderia fazer isso o dia todo",desc:"Assistir ao primeiro filme.",test:s=>s.has(1)},
  {icon:"⚙️",name:"Iniciativa Vingadores",desc:"Concluir até Os Vingadores.",test:s=>[1,2,3,4,5,6].every(n=>s.has(n))},
  {icon:"💥",name:"Guerra Civil",desc:"Chegar ao fim do #13.",test:s=>s.has(13)},
  {icon:"🫰",name:"Nós estamos no fim do jogo",desc:"Assistir Guerra Infinita.",test:s=>s.has(18)},
  {icon:"❤️",name:"3000",desc:"Concluir Vingadores: Ultimato.",test:s=>s.has(20)},
  {icon:"⏳",name:"Variável temporal",desc:"Concluir Loki T1 e T2.",test:s=>s.has(21)&&s.has(29)},
  {icon:"🌌",name:"Multiversal",desc:"Assistir Sem Volta Para Casa, Multiverso da Loucura e Deadpool & Wolverine.",test:s=>[26,27,32].every(n=>s.has(n))},
  {icon:"🔴",name:"Só o essencial",desc:"Assistir todos os títulos essenciais já lançados.",test:s=>productions.filter(x=>x.p==="essential").every(x=>s.has(x.n))},
  {icon:"🏆",name:"Arquivo completo",desc:"Assistir todos os títulos lançados da lista.",test:s=>productions.filter(x=>x.p!=="future").every(x=>s.has(x.n))}
];
