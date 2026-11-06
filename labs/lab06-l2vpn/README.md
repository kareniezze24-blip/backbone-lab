# Lab 6: L2VPN (pseudowire e VPLS)

**Status:** a fazer

## Objetivo

Transportar uma VLAN do cliente de um PE a outro pelo backbone MPLS, como pseudowire ponto a ponto e como VPLS multiponto.

## Por que isso importa

É o serviço que a rede real mais usa para levar tráfego das OLTs até os concentradores. Quem entende VSI, vsi-id e peers entende metade da operação.

## Pré-requisitos

- Labs 5, 5.1 e 5.2 concluídos
- Um equipamento de cliente em cada PE, na mesma rede IP
- Leitura de `docs/13-vsi-vpls-pseudowire.md` e `docs/05-l2vpn-vs-l3vpn.md`

## Passos e o porquê de cada um

| # | O que fazer | Por que fazer |
|---|---|---|
| 1 | Ligar o suporte a L2VPN nos PEs | Sem ele, os comandos de pseudowire e VSI não funcionam. |
| 2 | Criar um pseudowire entre R1 e R3 para uma VLAN | Leva o quadro Ethernet do cliente de uma ponta a outra, como se fosse um cabo. O identificador do circuito precisa ser igual nas duas pontas. |
| 3 | Testar comunicação entre os dois equipamentos de cliente | Eles devem se falar como se estivessem na mesma LAN, na mesma sub-rede. |
| 4 | Trocar o pseudowire por uma instância VPLS | Em vez de um cabo virtual entre dois pontos, vira um switch virtual para vários. |
| 5 | Definir o vsi-id e os peers | O vsi-id identifica o serviço e deve ser igual nos PEs; cada peer é um PE participante. |
| 6 | Ligar a VLAN do cliente à VSI | É o que associa a porta do cliente ao serviço. |
| 7 | Adicionar um terceiro ponto e ver o aprendizado de MAC por VSI | Mostra que o PE aprende MACs dos clientes, ao contrário do pseudowire. |
| 8 | Usar a política de túnel para o serviço seguir o túnel TE | Une o Lab 5.1 ao serviço: o cliente passa a trafegar pelo caminho protegido. |
| 9 | Ajustar MTU de serviço e de backbone | Pseudowire soma cabeçalho; sem MTU adequada, quadros grandes somem. |

## O que observar

- Pseudowire ou VSI ativos
- Equipamentos de cliente se enxergando como na mesma rede
- MACs aprendidos dentro da VSI

## Teste de falha

- Derrubar o caminho principal do túnel e ver o serviço continuar pelo backup

## Parte de troubleshooting: erros para provocar

Provoque um erro por vez, observe o sintoma e raciocine antes de corrigir.

| Erro | Sintoma esperado | Como raciocinar |
|---|---|---|
| vsi-id ou id do circuito diferente nas pontas | Pseudowire não sobe | Comparar o identificador nos dois PEs |
| VLAN não liberada na porta do cliente | Serviço fora do ar | Verificar a VLAN no trunk de acesso |
| Sem LDP remoto | Sessão do serviço não forma | Conferir a sessão remota entre os PEs |
| MTU baixa | Ping pequeno passa e grande não | Testar com pacotes grandes |
| VSI sem vsi-id nem peers | Instância órfã que não faz nada | Procurar instâncias sem parâmetros essenciais |

## Perguntas de reflexão

1. Qual a diferença entre pseudowire e VPLS?
2. O que o PE aprende em L2VPN e em L3VPN?

## O que costuma cair na prova

- VPWS x VPLS
- Pseudowire: encapsulamento e sinalização por LDP
- Split horizon em VPLS
- MAC learning em VSI

## Checklist

- [ ] Passo 1
- [ ] Passo 2
- [ ] Passo 3
- [ ] Passo 4
- [ ] Passo 5
- [ ] Passo 6
- [ ] Passo 7
- [ ] Passo 8
- [ ] Passo 9
- [ ] Teste de falha feito
- [ ] Erros provocados e diagnosticados
- [ ] Perguntas respondidas por escrito
