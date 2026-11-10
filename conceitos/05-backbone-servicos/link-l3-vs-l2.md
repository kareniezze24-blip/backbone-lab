## Forma A: L3 roteado (padrão)

```
PE1 ==[ rede /30 própria ]== P1
```

O IP fica direto na interface física ou na Eth-Trunk (com `undo portswitch`).

| Função | Recurso |
|---|---|
| Descobrir caminhos | OSPF ou IS-IS (`network-type p2p`) |
| Juntar cabos | LACP (Eth-Trunk) |
| Detectar falha | BFD |
| Transporte | `mpls`, `mpls ldp`, `mpls te`, `mpls rsvp-te` na interface |

## Forma B: L2, o link viaja como VLAN

```
PE1 --[VLAN X]-- (transporte L2 de terceiro) --[VLAN X]-- PE2
```

O IP fica na **Vlanif**. Usada quando o circuito passa por uma rede L2 que você
não controla.

## Quando usar cada uma

| Situação | Escolha |
|---|---|
| Fibra própria, ponto a ponto | L3 roteado |
| Circuito passa por rede L2 de terceiro | L2 com Vlanif |
| Quer o mais simples e estável | L3 roteado |

## Por que o L3 roteado é preferido

- **Isolamento de falhas**: broadcast e loop de L2 não atravessam um link roteado; o TTL descarta pacotes em loop.
- **Depende só do cabo**: a Vlanif depende de VLAN, de portas e do STP. Ela fica `up` enquanto houver qualquer porta ativa na VLAN, e o protocolo pode não perceber a queda de um link específico.
- **Convergência**: a interface cai junto com o cabo e o IGP reage na hora.
- **Operação**: um link, uma rede, dois IPs, menos lugares para errar.

## Máscaras

| Interface | Máscara |
|---|---|
| Link ponto a ponto | /30 (ou /31) |
| Loopback | /32 |
| LAN com vários hosts | conforme a quantidade de hosts |

Em um /30: primeiro endereço = rede, último = broadcast, sobram 2 para os equipamentos.

## O que costuma cair na prova

- Por que o L3 roteado é preferido no backbone
- Quando usar Vlanif
- Máscaras por tipo de interface
