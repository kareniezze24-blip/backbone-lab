## O problema
Redundância em L2 forma **círculos**. O quadro Ethernet não tem TTL, e um broadcast fica girando e se multiplicando (**tempestade de broadcast**), travando a rede.

## A solução
O STP (802.1D) **bloqueia portas de propósito** para quebrar os círculos, deixando uma árvore sem loops. Se o caminho ativo cai, a porta bloqueada é liberada.

## Como funciona
1. Os switches trocam **BPDUs** (mensagens de controle).
2. Elegem uma **root bridge**: a de menor **Bridge ID** (prioridade e, em empate, o menor MAC).
3. Cada switch escolhe sua melhor rota até a root (menor **custo**).
4. As portas recebem **papéis**:

| Papel | Significado |
|---|---|
| Root | Melhor caminho até a root (um por switch) |
| Designated | Encaminha o tráfego de um segmento |
| Alternate / Backup | Reserva, bloqueada |

## Estados
| STP clássico | RSTP |
|---|---|
| Blocking, Listening, Learning, Forwarding | **Discarding**, Learning, Forwarding |

O STP clássico leva cerca de **30 a 50 segundos** para convergir; o **RSTP (802.1w)** converge em poucos segundos. O **MSTP (802.1s)** agrupa VLANs em **instâncias**, permitindo caminhos ativos diferentes por grupo e usando melhor os cabos.

## Proteções
| Recurso | Função |
|---|---|
| Porta de borda (edge) | Porta de usuário vai direto a encaminhamento |
| **BPDU guard** | Desliga a porta de borda que receber BPDU |
| **Root guard** | Impede que uma porta aceite uma root melhor |
| **Loop guard** | Evita que uma porta bloqueada vire designada por perda de BPDU |

## Quando o STP fica desligado
No backbone da operadora o **STP costuma ser desligado**: os links são L3 roteados e as agregações são Eth-Trunk, então não há círculo de L2.

## Erros comuns
Root escolhida por acaso (MAC mais baixo), switch de acesso virando root, porta de usuário sem proteção de borda, STP desligado com círculo físico.

## O que costuma cair na prova

- Eleição da root bridge e papéis de porta
- Estados do STP e do RSTP
- Diferença entre STP, RSTP e MSTP
- Para que servem BPDU guard e root guard
