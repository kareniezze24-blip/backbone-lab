## O que muda
Endereço de **128 bits** (8 grupos de 4 dígitos hexadecimais), sem broadcast e sem a necessidade de NAT.

## Escrita abreviada
- Zeros à esquerda de cada grupo podem ser omitidos.
- Uma sequência de grupos zero pode virar `::` (**uma vez só** por endereço).

`2001:0db8:0000:0000:0000:0000:0000:0001` vira `2001:db8::1`.

## Tipos de endereço
| Tipo | Prefixo | Uso |
|---|---|---|
| Global unicast | `2000::/3` | Roteável na internet |
| Link-local | `fe80::/10` | Só no enlace; todo equipamento tem um |
| Unique local (ULA) | `fc00::/7` (usa-se `fd00::/8`) | Interno, como o IPv4 privado |
| Multicast | `ff00::/8` | Substitui o broadcast |
| Loopback | `::1` | Local |

## Tamanho dos prefixos
- **/64** é o padrão de uma rede local (exigência da autoconfiguração).
- Sites costumam receber **/48** ou **/56**; clientes residenciais, **/56** ou **/60** (varia por provedor).
- Links ponto a ponto usam **/126 ou /127**.

## Neighbor Discovery (NDP)
Substitui o ARP, usando **ICMPv6**: Router Solicitation/Advertisement (RS/RA), Neighbor Solicitation/Advertisement (NS/NA).

## Como o host recebe endereço
| Método | Funcionamento |
|---|---|
| **SLAAC** | O host monta o endereço a partir do prefixo anunciado no RA |
| **DHCPv6** | Servidor entrega endereço e/ou opções (DNS) |

## Convivência com IPv4
- **Dual stack**: IPv4 e IPv6 ao mesmo tempo.
- **Túneis** e **NAT64** para transição.
- Os protocolos de roteamento têm versões IPv6: **OSPFv3**, IS-IS (mesma instância) e BGP com a família IPv6.

## Erros comuns
Bloquear ICMPv6 em ACL (quebra o NDP), esquecer o IPv6 no roteamento, usar /64 em links ponto a ponto sem necessidade.

## O que costuma cair na prova

- Escrita abreviada de endereços e a regra do ::
- Tipos: global, link-local, ULA, multicast
- NDP e ICMPv6 no lugar do ARP
- SLAAC x DHCPv6 e prefixos usuais
