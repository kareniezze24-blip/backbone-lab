# Lab 6.1: L3VPN (VRF, RD/RT e MP-BGP)

**Status:** a fazer

## Objetivo

Entregar uma rede IP privada entre dois sites de um cliente em redes diferentes, com os PEs roteando o tráfego do cliente.

## Por que isso importa

L3VPN é um dos temas mais cobrados em provas de operadora, mesmo que a rede real use mais L2VPN.

## Pré-requisitos

- Labs 3 e 5 concluídos
- Sites do cliente em redes diferentes (CE12800 em um lado, R5 do outro)
- Leitura de `docs/05-l2vpn-vs-l3vpn.md`

## Passos e o porquê de cada um

| # | O que fazer | Por que fazer |
|---|---|---|
| 1 | Criar a VRF do cliente nos dois PEs | A VRF é a tabela de rotas privada. Isola o cliente do restante. |
| 2 | Definir RD e RT | O RD torna o prefixo do cliente único no BGP. O RT decide quem importa as rotas de quem. |
| 3 | Ligar a interface do cliente à VRF e só depois dar o IP | Associar uma interface à VRF apaga o IP dela. Erro clássico: fazer na ordem inversa. |
| 4 | Ensinar ao PE a rede do cliente, com rota estática dentro da VRF | Mostra a forma mais simples de PE-CE. |
| 5 | Criar a sessão MP-BGP entre as Loopbacks dos PEs | Sessão pela Loopback sobrevive à queda de um link. |
| 6 | Ativar a família de endereços de VPN na sessão | É o que faz o BGP carregar rotas de VPN com RD, RT e label. |
| 7 | Redistribuir as rotas da VRF no BGP | Sem isso, o outro PE nunca ouve falar da rede do cliente. |
| 8 | Testar ping entre as LANs dos dois sites | Prova de ponta a ponta. |
| 9 | Acompanhar as duas labels do pacote (transporte e serviço) | O P troca só a de cima; o PE de saída usa a de baixo para achar a VRF. |

## O que observar

- Sessão MP-BGP estabelecida
- Rota da LAN do outro site aparecendo na VRF local
- Ping entre as LANs funcionando
- VRF isolada da tabela global

## Teste de falha

- Derrubar o caminho principal e ver o tráfego do cliente migrar sem mudança na VRF

## Parte de troubleshooting: erros para provocar

Provoque um erro por vez, observe o sintoma e raciocine antes de corrigir.

| Erro | Sintoma esperado | Como raciocinar |
|---|---|---|
| IP apagado ao ligar a interface à VRF | Interface sem IP | Reaplicar o IP depois da associação |
| RT de exportação e importação trocados | Rotas não chegam | Comparar os RTs nos dois PEs |
| RD repetido entre clientes diferentes | Rotas se misturam | Verificar unicidade do RD |
| Sessão BGP sem a Loopback como origem | Sessão não sobe | Verificar a interface de origem |
| Família VPN não ativada | Sessão sobe, mas sem rotas de VPN | Conferir a família de endereços |

## Perguntas de reflexão

1. Por que dois clientes podem usar o mesmo endereçamento privado?
2. Qual a diferença entre RD e RT?

## O que costuma cair na prova

- VRF, RD, RT e MP-BGP
- Pilha de labels em L3VPN
- Protocolos PE-CE
- L2VPN x L3VPN

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
