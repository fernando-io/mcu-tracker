import type { Achievement } from "../types";

export const achievements: Achievement[] = [
  {icon:"🛡️",name:"Eu poderia fazer isso o dia todo",desc:"Assistir ao primeiro filme.",rule:{type:"productions",productionIds:[1]}},
  {icon:"⚙️",name:"Iniciativa Vingadores",desc:"Concluir até Os Vingadores.",rule:{type:"productions",productionIds:[1,2,3,4,5,6]}},
  {icon:"💥",name:"Guerra Civil",desc:"Chegar ao fim do #13.",rule:{type:"productions",productionIds:[13]}},
  {icon:"🫰",name:"Nós estamos no fim do jogo",desc:"Assistir Guerra Infinita.",rule:{type:"productions",productionIds:[18]}},
  {icon:"❤️",name:"3000",desc:"Concluir Vingadores: Ultimato.",rule:{type:"productions",productionIds:[20]}},
  {icon:"⏳",name:"Variável temporal",desc:"Concluir Loki T1 e T2.",rule:{type:"productions",productionIds:[21,29]}},
  {icon:"🌌",name:"Multiversal",desc:"Assistir Sem Volta Para Casa, Multiverso da Loucura e Deadpool & Wolverine.",rule:{type:"productions",productionIds:[26,27,32]}},
  {icon:"🔴",name:"Só o essencial",desc:"Assistir todos os títulos essenciais já lançados.",rule:{type:"catalog",priority:"essential"}},
  {icon:"🏆",name:"Arquivo completo",desc:"Assistir todos os títulos lançados da lista.",rule:{type:"catalog",releasedOnly:true}}
];