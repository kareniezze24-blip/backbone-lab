## Ninguém opera o que não enxerga
Monitoramento mostra **o estado**, os logs mostram **o que aconteceu** e o horário correto permite **ligar os fatos**.

## SNMP
| Termo | Significado |
|---|---|
| **Manager** | Sistema de monitoramento |
| **Agente** | Software no equipamento |
| **MIB / OID** | Árvore de objetos que podem ser lidos |
| Operações | Get, GetNext, GetBulk, Set |
| **Trap / Inform** | O equipamento avisa o manager de um evento |

Portas: **UDP 161** (consulta) e **UDP 162** (traps).

| Versão | Segurança |
|---|---|
| v1 / v2c | **Comunidade** em texto claro (equivale a uma senha) |
| **v3** | Autenticação e criptografia por usuário |

*Polling* (o manager pergunta) mostra tendências; *trap* (o equipamento avisa) mostra eventos imediatos. Usam-se os dois.

## Syslog (UDP 514)
Registros enviados a um servidor central, com **severidade** de 0 a 7:

| 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|---|---|---|---|---|---|---|---|
| Emergency | Alert | Critical | Error | Warning | Notice | Informational | Debug |

Logs guardados só no equipamento somem com um reinício ou com a própria falha.

## NTP (UDP 123)
Sincroniza o relógio. **Stratum** indica a distância até a fonte de tempo de referência. Sem horário correto, os logs de equipamentos diferentes não se correlacionam. Configure também o **fuso**.

## Fluxos e telemetria
**NetFlow**, **IPFIX** e **sFlow** exportam informações sobre os fluxos (quem falou com quem, quanto), usadas em capacidade e segurança. A **telemetria por streaming** (gRPC/gNMI) envia dados continuamente em vez de depender de consultas.

## O que monitorar
| Item | Por quê |
|---|---|
| Utilização das interfaces | Prever saturação |
| Erros e descartes (CRC, drops) | Problemas físicos |
| CPU, memória, temperatura | Saúde do equipamento |
| Potência óptica | Degradação de fibras |
| Vizinhos OSPF/BGP/LDP | Estabilidade do roteamento |
| Latência e perda | Qualidade percebida |

## Boas práticas
Use a **Loopback** como origem dos serviços de gerência, restrinja por ACL e prefira SNMPv3.

## Erros comuns
ACL bloqueando o servidor, comunidade padrão, NTP sem sincronizar, alarmes sem tratamento de ruído.

## O que costuma cair na prova

- Portas: SNMP 161/162, syslog 514, NTP 123
- SNMPv2c x v3
- Severidades do syslog
- Polling x trap
