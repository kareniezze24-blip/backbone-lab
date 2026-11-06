# Lab 4: IS-IS no backbone

**Status:** a fazer

## Objetivo

Refazer o roteamento do backbone com IS-IS e comparar com o OSPF.

## Por que isso importa

Muitos backbones de operadora grandes usam IS-IS, e a comparação com o OSPF é pergunta clássica de prova.

## Pré-requisitos

- Lab 3 concluído
- Entendimento de OSPF para poder comparar

## Passos e o porquê de cada um

| # | O que fazer | Por que fazer |
|---|---|---|
| 1 | Desligar o OSPF (ou rodar um protocolo por vez) | Dois IGPs ao mesmo tempo competem por preferência e atrapalham a análise. |
| 2 | Definir o endereço NET de cada roteador (área mais system-id derivado da Loopback) | O IS-IS não usa IP para se identificar, e sim um endereço de camada 3 do modelo OSI. Entender o NET é entender o protocolo. |
| 3 | Escolher o nível: backbone em nível 2 | L1 é intra-área e L2 é entre áreas. No backbone, nível 2 simplifica. |
| 4 | Ativar o IS-IS nas interfaces e na Loopback | Como no OSPF, é preciso anunciar as Loopbacks. |
| 5 | Marcar os links como ponto a ponto | Elimina a eleição de DIS e acelera a adjacência. |
| 6 | Verificar as adjacências | Estado Up nos dois níveis esperados. |
| 7 | Usar métrica ampla (wide) | A métrica clássica é limitada a 63 por interface; a ampla permite redes grandes e é requisito de TE. |
| 8 | Opcional: R5 em nível 1 e R3 em nível 1-2 | Mostra a fronteira entre áreas no IS-IS: ela fica no link, e não no roteador como no OSPF. |

## O que observar

- Adjacências em Up e tabela com as Loopbacks de todos
- Mesmo comportamento de caminho principal e alternativo que no OSPF

## Teste de falha

- Derrubar o R2 e comparar a recuperação com o OSPF

## Parte de troubleshooting: erros para provocar

Provoque um erro por vez, observe o sintoma e raciocine antes de corrigir.

| Erro | Sintoma esperado | Como raciocinar |
|---|---|---|
| Nível incompatível entre vizinhos | Adjacência não forma | Comparar o nível das duas pontas |
| Área diferente no nível 1 | Sem adjacência L1 | Comparar o endereço NET |
| System-id duplicado | Instabilidade | Procurar identificadores repetidos |
| Métrica estreita com TE | Sem informação para o CSPF | Verificar o estilo de métrica |

## Perguntas de reflexão

1. Por que o IS-IS não depende de IP para formar vizinhança?
2. Onde fica a fronteira entre áreas: no roteador ou no link?

## O que costuma cair na prova

- IS-IS x OSPF: transporte, áreas, DIS x DR
- Níveis 1, 2 e 1-2
- NET, system-id e área
- Métricas estreita e ampla

## Checklist

- [ ] Passo 1
- [ ] Passo 2
- [ ] Passo 3
- [ ] Passo 4
- [ ] Passo 5
- [ ] Passo 6
- [ ] Passo 7
- [ ] Passo 8
- [ ] Teste de falha feito
- [ ] Erros provocados e diagnosticados
- [ ] Perguntas respondidas por escrito
