## O que é
Protocolo de roteamento **link-state**: cada roteador conhece a topologia e
calcula o menor caminho. No backbone ele anuncia os links e as **Loopbacks**,
base do MPLS e do BGP.

## Conceitos
| Termo | Significado |
|---|---|
| Router-ID | Identificador do roteador (usar a Loopback) |
| Área 0 | Backbone; todas as áreas se ligam a ela |
| Custo | Métrica; depende da banda (`bandwidth-reference`) |
| network-type p2p | Link ponto a ponto, sem eleição de DR/BDR |
| Vizinho | Roteador com adjacência formada (estado Full) |

## Configuração base do lab (R1)
```
ospf 1 router-id 10.200.255.1
 area 0.0.0.0
  network 10.200.255.1 0.0.0.0
  network 10.200.0.4 0.0.0.3
quit
interface Ethernet1/0/2
 ospf network-type p2p
```
Também existe o estilo por interface, usado no PE real: `ospf enable 1 area 0.0.0.0`
dentro da interface. Confirme qual o seu equipamento aceita com `ospf ?`.

## Recursos que a rede real usa
| Comando | Função |
|---|---|
| `bfd all-interfaces enable` | Liga o BFD nas interfaces OSPF |
| `bfd all-interfaces min-tx-interval 100 min-rx-interval 100 detect-multiplier 4` | Detecta falha em cerca de 400 ms |
| `ospf ldp-sync` (na interface) | Só usa o link após o LDP estar pronto, evita buraco negro |
| `silent-interface LoopBack0` | Anuncia a Loopback sem enviar hello nela |
| `bandwidth-reference 100000` | Referência de 100G para o cálculo do custo |
| `opaque-capability enable` e `mpls-te enable` na área | Carrega dados de TE para o CSPF |
| `frr` com `loop-free-alternate` | Caminho alternativo pré-calculado |
| `graceful-restart` | O processo reinicia sem derrubar o encaminhamento |
| `import-route direct/static` | Redistribui rotas diretas e estáticas |

## Verificação
```
display ospf peer brief
display ospf routing
display ip routing-table
```
O vizinho deve estar em `Full`. As Loopbacks dos outros roteadores devem aparecer.

## Erros comuns
Área diferente, hello/dead diferentes, `network-type` incompatível, router-id
duplicado, máscara errada no `network`.

## O que costuma cair na prova

- Estados de vizinhança e parâmetros que precisam bater
- Tipos de LSA, áreas, ABR e ASBR
- Custo e banda de referência
- Rede ponto a ponto sem DR/BDR
