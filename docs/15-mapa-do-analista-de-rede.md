# Mapa de conhecimento do analista de rede

Use como checklist de estudo para a prova. A coluna "Coberto" diz onde o projeto
já trata o assunto. Os itens marcados como **lacuna** ainda não têm lab nem guia.

## Fundamentos
| Tema | Coberto | Status |
|---|---|---|
| Modelo OSI e TCP/IP | exercícios 01 | [ ] |
| Endereçamento IPv4, sub-redes e sumarização | docs/14, exercícios 01 | [ ] |
| ARP, ICMP, TTL | exercícios 01 | [ ] |
| TCP x UDP e portas | docs/16 | [ ] |
| DHCP (DORA) e relay | exercícios 01, Lab 7 | [ ] |
| DNS | **lacuna** | [ ] |
| NAT e CGNAT | **lacuna** | [ ] |
| IPv6 (endereçamento, vizinhança, OSPFv3) | **lacuna** | [ ] |

## Camada 2
| Tema | Coberto | Status |
|---|---|---|
| VLAN, access, trunk, nativa | Lab 1.5, docs/09 | [ ] |
| Tabela MAC e flooding | Lab 1.5 | [ ] |
| STP/RSTP/MSTP | Lab 1.6 | [ ] |
| LACP e Eth-Trunk | Lab 1, docs/08 | [ ] |
| QinQ | Lab 7, docs/09 | [ ] |
| VRRP (redundância de gateway) | **lacuna** | [ ] |
| M-LAG / empilhamento | **lacuna** | [ ] |
| Multicast e IGMP (IPTV) | **lacuna** | [ ] |

## Roteamento
| Tema | Coberto | Status |
|---|---|---|
| Rotas estáticas e preferência | Lab 2 | [ ] |
| OSPF (áreas, LSAs, custo) | Lab 3, docs/10 | [ ] |
| IS-IS | Lab 4 | [ ] |
| BGP (eBGP, iBGP, atributos, route reflector) | Lab 6.1 (parcial) | [ ] |
| Políticas de rota (prefix-list, route-policy) | **lacuna** | [ ] |
| BFD, FRR | Lab 5.2 | [ ] |

## MPLS e serviços
| Tema | Coberto | Status |
|---|---|---|
| MPLS, LDP, labels | Lab 5, docs/11 | [ ] |
| MPLS-TE, RSVP-TE, FRR | Lab 5.1, docs/12 | [ ] |
| Pseudowire e VPLS | Lab 6, docs/13 | [ ] |
| L3VPN (VRF, RD, RT) | Lab 6.1 | [ ] |
| Segment Routing | **lacuna** | [ ] |

## Acesso e provedor
| Tema | Coberto | Status |
|---|---|---|
| Arquitetura PON (GPON, EPON, XGS-PON) | Lab 7, exercícios 06 | [ ] |
| Serviços por VLAN na OLT | Lab 7 | [ ] |
| PPPoE, IPoE e BNG | Lab 7 (conceitual) | [ ] |
| TR-069 | Lab 7 (conceitual) | [ ] |
| Medição óptica (potência, atenuação) | **lacuna** | [ ] |

## Operação e segurança
| Tema | Coberto | Status |
|---|---|---|
| SSH, AAA, RADIUS, TACACS+ | Lab 8 | [ ] |
| ACL | Lab 8 | [ ] |
| SNMP, syslog, NTP | Lab 9 | [ ] |
| Backup de configuração | Lab 9 | [ ] |
| QoS (classificação, filas, marcação) | **lacuna** | [ ] |
| Método de troubleshooting | Lab 10, exercícios 08 | [ ] |

## Plano de estudo sugerido
1. Fechar os Labs 1 a 3 e os exercícios 01 a 03.
2. Labs 5 a 6.1 e exercícios 04 e 05.
3. Lab 7 e exercícios 06.
4. Labs 8 e 9 e exercícios 07.
5. Cobrir as lacunas que a prova exigir.
6. Lab 10 e exercícios 08 repetidos até acertar sem consulta.
