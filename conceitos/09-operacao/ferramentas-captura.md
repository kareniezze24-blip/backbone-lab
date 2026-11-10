## Ferramentas do dia a dia
| Ferramenta | Para que serve |
|---|---|
| `ping` | Alcançabilidade, perda e latência |
| `traceroute` / `mtr` | Caminho e onde se perde |
| `nslookup` / `dig` | Consultas DNS |
| `iperf` | Medir a vazão entre dois pontos |
| `tcpdump` / **Wireshark** | Ver os pacotes de verdade |
| Cliente SSH, console | Acesso aos equipamentos |

## Quando capturar
Quando os dados de estado não explicam: handshake que falha, retransmissões, DHCP que não responde, PPPoE que não negocia, MTU, protocolos que "não fecham".

## Como capturar em um equipamento
- **Espelhamento de porta (SPAN)**: copia o tráfego de uma porta para uma porta observadora onde está o analisador.
- Capture o mais próximo possível do problema e dos dois lados, quando possível.

## Filtros de captura (tcpdump / BPF)
```
host 10.200.0.1
port 53
vlan 100
tcp port 179
```

## Filtros de exibição (Wireshark)
```
ip.addr == 10.200.0.1
tcp.port == 22
dhcp
dns
tcp.analysis.retransmission
```

## O que procurar
| Observação | Significado |
|---|---|
| SYN sem SYN+ACK | Destino não responde ou o caminho está bloqueado |
| RST | Conexão recusada ou abortada |
| Retransmissões frequentes | Perda no caminho |
| Muitos ARP sem resposta | Problema de camada 2 ou IP duplicado |
| DHCP Discover sem Offer | Relay ou servidor com problema |
| ICMP "fragmentation needed" | Problema de MTU |

## Cuidados
Captura pode expor dados sensíveis: **use só com autorização**, guarde com segurança e apague quando não precisar mais.

## O que costuma cair na prova

- Filtro de captura x filtro de exibição
- SPAN/espelhamento de porta
- Interpretar SYN sem resposta, RST e retransmissões
