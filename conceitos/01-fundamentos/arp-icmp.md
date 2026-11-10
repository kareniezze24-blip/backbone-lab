## ARP: de IP para MAC
Para enviar um quadro na **mesma rede**, o equipamento precisa do MAC do destino. O ARP descobre isso.

1. O host envia um **ARP Request** em *broadcast*: "quem tem o IP X?".
2. O dono do IP responde com um **ARP Reply** em *unicast*, informando o seu MAC.
3. O resultado fica na **tabela ARP** (cache) por um tempo.

Pontos importantes:
- O ARP só funciona **dentro da mesma rede (VLAN)**. Para outra rede, o host faz ARP do **gateway**.
- **ARP gratuito**: o equipamento anuncia o próprio IP/MAC (usado em failover, como no VRRP).
- Ataques como o *ARP spoofing* são mitigados com Dynamic ARP Inspection.

## ICMP: o protocolo de diagnóstico
O ICMP viaja dentro do IP e leva mensagens de controle e erro.

| Mensagem | Uso |
|---|---|
| Echo Request / Echo Reply | O `ping` |
| Destination Unreachable | Sem rota, porta fechada, fragmentação necessária |
| Time Exceeded | O TTL chegou a zero (base do traceroute) |
| Fragmentation Needed | Descoberta de MTU do caminho (PMTUD) |

## TTL e traceroute
O **TTL** diminui 1 a cada roteador; em zero o pacote é descartado e o roteador responde com *Time Exceeded*.

O **traceroute** explora isso: envia pacotes com TTL 1, 2, 3... e cada roteador do caminho se revela ao responder. Em redes MPLS com `undo ttl propagate`, os saltos internos do backbone **não aparecem**.

## Ping útil na prática
- Ping com **origem** específica (para testar o retorno por uma interface).
- Ping com **tamanho** grande e sem fragmentação (para achar problema de MTU).
- Ping para o gateway, depois para fora: separa problema local de problema remoto.

## Erros comuns
Ping que vai e não volta (falta rota de retorno), ICMP bloqueado por ACL (ping falha mas o serviço funciona), MTU baixa (ping pequeno passa e grande não).

## O que costuma cair na prova

- Fluxo do ARP: request em broadcast e reply em unicast
- Função do TTL e como o traceroute o usa
- Mensagens ICMP principais
- O ARP só resolve endereços da mesma rede
