## A ideia
No **Segment Routing (SR)** o caminho é descrito na **origem** como uma lista de **segmentos** (instruções). Os roteadores do meio apenas seguem, sem guardar estado por túnel.

## Tipos de segmento
| Segmento | Escopo | Significado |
|---|---|---|
| **Prefix SID** | Global | "Vá até este roteador pelo menor caminho" |
| **Adjacency SID** | Local | "Saia por este link específico" |

No **SR-MPLS**, os segmentos são labels MPLS. Os SIDs são anunciados pelo próprio **IGP** (OSPF ou IS-IS), então **não precisa de LDP nem de RSVP-TE**.

## Comparação
| | LDP + RSVP-TE | Segment Routing |
|---|---|---|
| Distribuição de labels | LDP / RSVP | IGP |
| Estado nos roteadores do meio | Por túnel (RSVP) | Nenhum |
| Engenharia de tráfego | Túneis TE | **SR-TE** (lista de segmentos) |
| Proteção | TE FRR | **TI-LFA** |

## SRv6
Variante que usa **IPv6** em vez de labels MPLS, com os segmentos no cabeçalho IPv6.

## Por que importa
É a direção de evolução dos backbones: menos protocolos, menos estado. Você precisa **reconhecer** o conceito, mesmo que a rede atual use LDP e RSVP-TE.

## O que costuma cair na prova

- Prefix SID x Adjacency SID
- SR dispensa LDP e RSVP-TE
- TI-LFA e SR-TE
- Diferença entre SR-MPLS e SRv6
