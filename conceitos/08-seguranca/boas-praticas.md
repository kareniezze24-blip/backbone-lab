## Plano de gerência
SSH, SNMPv3, NTP, ACLs de gerência, gerência fora de banda, logs centralizados, usuários nominais e privilégios mínimos.

## Camada 2
| Recurso | Protege contra |
|---|---|
| **Port security / limite de MACs** | Inundação da tabela MAC |
| **DHCP snooping** | Servidor DHCP falso |
| **Dynamic ARP Inspection** | ARP spoofing |
| **IP source guard** | Falsificação de IP |
| **Storm control** | Tempestades de broadcast/multicast |
| **BPDU guard / root guard** | Manipulação do STP |
| Desligar portas não usadas | Acessos indevidos |

## Camada 3
| Recurso | Protege contra |
|---|---|
| **uRPF / BCP 38** | IPs de origem falsificados |
| Filtros BGP e **max-prefix** | Vazamento e anúncios indevidos |
| ACL de infraestrutura | Acesso à Loopback e à gerência dos equipamentos |
| Autenticação de protocolos | Vizinhos falsos (OSPF, IS-IS, BGP, LDP) |
| Proteção do plano de controle | Sobrecarga da CPU por tráfego malicioso |

## Serviços
Desligue o que não usa (HTTP, FTP, Telnet) e atualize firmware com janela e plano de retorno.

## Processo
- **Gestão de mudanças**: janela, plano de rollback, revisão por pares.
- **Backup** da configuração antes de qualquer alteração.
- **Registro** de quem fez o quê (accounting).
- **Segregação**: redes de gerência, de clientes e de infraestrutura separadas.

## Segurança em operadora
O tráfego de clientes não deve alcançar os equipamentos da infraestrutura. Anúncios de BGP sem filtro e clientes com IP falsificado são os incidentes mais caros.

## O que costuma cair na prova

- DHCP snooping, DAI e IP source guard
- uRPF e filtros BGP
- Plano de gerência seguro
- Gestão de mudanças e backup
