## Por que multicast
Um canal de TV enviado em **unicast** exigiria uma cópia por espectador. Em **multicast** a rede envia **uma cópia** por ramo da árvore, e só quem pediu recebe.

| Modo | Destino | Cópias |
|---|---|---|
| Unicast | Um host | Uma por destino |
| Broadcast | Todos da rede | Uma para todos |
| **Multicast** | Um grupo | Uma por ramo |

## Endereços
- IPv4: faixa **classe D**, `224.0.0.0/4`.
- Reservados úteis: `224.0.0.1` (todos os hosts), `224.0.0.2` (todos os roteadores), `224.0.0.5` e `224.0.0.6` (OSPF), `224.0.0.18` (VRRP).
- `239.0.0.0/8`: uso administrativo local (comum em IPTV).
- O MAC de multicast é `01:00:5e` mais os 23 bits finais do IP.

## IGMP: o host entra no grupo
| Versão | Observação |
|---|---|
| IGMPv2 | Join e Leave por grupo |
| IGMPv3 | Permite escolher a **origem** (SSM) |

O host envia um **Report** para entrar no grupo; o roteador consulta periodicamente com **Query**.

## IGMP snooping
Sem ele, o switch trata multicast como broadcast e inunda a VLAN. Com **IGMP snooping**, o switch aprende quais portas têm interessados e só envia a elas.

## PIM: o roteamento multicast
| Modo | Funcionamento |
|---|---|
| **PIM-SM** (Sparse) | Usa um **RP** (ponto de encontro) e só constrói a árvore onde há receptores |
| PIM-SSM | Árvore direta da origem, sem RP |

## IPTV em redes PON
- A OLT atua como **IGMP proxy/snooping**, replicando o fluxo só para as ONUs que pediram.
- Os canais usam uma **VLAN multicast** separada da VLAN de dados.
- A prioridade é feita por **QoS**.

## Erros comuns
IGMP snooping desligado (multicast inunda a VLAN), VLAN multicast fora do caminho, RP inalcançável, TTL de multicast insuficiente.

## O que costuma cair na prova

- Faixa 224.0.0.0/4 e endereços reservados
- IGMP x PIM
- Função do IGMP snooping
- Multicast em PON/IPTV
