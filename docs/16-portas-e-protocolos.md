# Portas e protocolos para decorar

| Protocolo | Transporte e porta |
|---|---|
| SSH | TCP 22 |
| Telnet | TCP 23 |
| DNS | UDP e TCP 53 |
| DHCP | UDP 67 (servidor) e 68 (cliente) |
| TFTP | UDP 69 |
| HTTP e HTTPS | TCP 80 e 443 |
| NTP | UDP 123 |
| SNMP | UDP 161 (consulta) e 162 (trap) |
| Syslog | UDP 514 |
| BGP | TCP 179 |
| LDP | UDP 646 (descoberta) e TCP 646 (sessão) |
| RIP | UDP 520 |
| BFD | UDP 3784 (salto único) |
| RADIUS | UDP 1812 e 1813 |
| TACACS+ | TCP 49 |
| OSPF | Protocolo IP 89 (sem porta) |
| RSVP | Protocolo IP 46 (sem porta) |
| GRE | Protocolo IP 47 |
| IS-IS | Direto sobre a camada 2 (sem IP) |

## Números que caem em prova
| Item | Valor |
|---|---|
| OSPF hello e dead (broadcast e ponto a ponto) | 10 s e 40 s |
| OSPF hello e dead (NBMA) | 30 s e 120 s |
| Cabeçalho MPLS | 32 bits (label 20, TC 3, S 1, TTL 8) |
| Tag 802.1Q | 4 bytes |
| VLANs utilizáveis | 1 a 4094 |
| PPPoE: overhead e MTU resultante | 8 bytes e 1492 |
| GPON | 2,488 G descida e 1,244 G subida |
| GPON: comprimentos de onda | 1490 nm descida e 1310 nm subida |
| XGS-PON | 10 G simétrico |

## Preferência de rotas (varia por fabricante)
| Origem | Huawei VRP | Cisco |
|---|---|---|
| Direta | 0 | 0 |
| Estática | 60 | 1 |
| OSPF interna | 10 | 110 |
| IS-IS | 15 | 115 |
| RIP | 100 | 120 |
| OSPF externa | 150 | 110 |
| eBGP | 255 | 20 |
| iBGP | 255 | 200 |

Menor valor vence. Confirme no equipamento da prova, porque o padrão pode ser
alterado por configuração (a rede real usada como referência muda a preferência
do OSPF para 110).
