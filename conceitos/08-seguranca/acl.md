## O que é
Uma ACL é uma lista ordenada de **regras permit/deny** que casam com pacotes, usada para filtrar tráfego, limitar acessos e selecionar tráfego para outros recursos (QoS, NAT, políticas).

## Tipos (numeração Huawei)
| Tipo | Faixa | Casa com |
|---|---|---|
| **Básica** | 2000 a 2999 | Apenas a **origem** |
| **Avançada** | 3000 a 3999 | Origem, destino, protocolo, portas |
| De camada 2 | 4000 a 4999 | MACs, VLAN |

## Como são avaliadas
- Em **ordem**, pela numeração das regras (`rule 10`, `rule 20`...). A **primeira regra que casa decide**.
- Deixe **intervalos** entre os números das regras para poder inserir novas depois.
- O comportamento quando **nada casa** depende de onde a ACL foi aplicada. Por isso é boa prática terminar com uma **regra explícita**, como `deny` para o que não deve passar.

## Máscara curinga (wildcard)
É o inverso da máscara: `/24` vira `0.0.0.255`, `/30` vira `0.0.0.3`, e `0` significa host exato.

## Exemplo
```
acl number 3000
 rule 10 permit tcp source 10.10.10.0 0.0.0.255 destination-port eq 22
 rule 20 permit udp source 10.10.20.5 0 destination-port eq snmp
 rule 998 deny tcp destination-port eq telnet
 rule 999 deny tcp destination-port eq 22
```

## Onde aplicar
| Onde | Uso |
|---|---|
| Interface (`traffic-filter`) | Filtrar tráfego que passa |
| Linhas **VTY** | Controlar quem acessa a gerência |
| **SNMP** | Restringir quem consulta |
| Política de rotas | Filtrar prefixos |

## Boas práticas
- Regras mais **específicas primeiro**.
- Documentar cada regra (`description`).
- **Testar com acesso de console** disponível: uma ACL errada pode isolar a gerência.
- Contar acertos (`statistic`) e revisar periodicamente.

## Erros comuns
Regra genérica antes da específica, ACL aplicada na direção ou interface erradas, wildcard digitado como máscara, bloquear a própria gerência.

## O que costuma cair na prova

- Básica x avançada e as faixas de numeração
- A primeira regra que casa decide
- Wildcard mask
- Onde aplicar (interface, VTY, SNMP)
