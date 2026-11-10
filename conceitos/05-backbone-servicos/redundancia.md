| Camada | Falha que protege | Recurso | Recuperação |
|---|---|---|---|
| Física | Um cabo ou porta | Eth-Trunk (LACP) | Instantânea |
| L2 | Um caminho entre switches | STP/RSTP, ERPS | De 1 a alguns segundos |
| L3 | Um link ou roteador | OSPF/IS-IS com 2 caminhos | Segundos (ms com BFD) |
| L3 | Sem esperar a convergência | FRR / LFA | Dezenas de ms |
| MPLS | Falha no caminho de um túnel | TE hot-standby + auto-FRR | Dezenas de ms |
| Gateway | Queda do roteador do cliente | VRRP | Segundos |

## Loop de L2 e STP

Um loop de L2 aparece quando os cabos formam um **círculo**. O quadro de
broadcast não tem prazo de validade e fica girando (broadcast storm). O STP
**bloqueia uma porta de propósito** para quebrar o círculo; se o caminho ativo
cai, ele libera a porta bloqueada. A redundância continua, mas como reserva
ociosa.

Eth-Trunk evita isso: os dois cabos viram **uma interface lógica**, sem círculo,
e somam a banda.

## Regras de projeto

- Redundância em L3 é mais saudável que em L2 (usa os dois caminhos, sem loop).
- Detectar a falha rápido importa tanto quanto ter o caminho reserva (BFD).

## O que costuma cair na prova

- Redundância por camada e tempos de recuperação
- Loop de L2 e STP
- Eth-Trunk evita loop
