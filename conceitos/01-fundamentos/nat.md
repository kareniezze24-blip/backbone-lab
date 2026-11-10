## O que é
O NAT **traduz endereços IP** ao passar por um equipamento, normalmente de endereços privados para públicos.

## Tipos
| Tipo | Funcionamento |
|---|---|
| **Estático** | Um IP privado para um IP público fixo (publicar um servidor) |
| **Dinâmico** | Um pool de IPs públicos atribuído sob demanda |
| **PAT / NAT overload** | Muitos IPs privados compartilham **um** IP público, diferenciados pela **porta** |

## PAT, passo a passo
1. O host `192.168.0.10:50000` acessa um site.
2. O NAT reescreve para `203.0.113.5:61001` e guarda a **tabela de tradução**.
3. A resposta chega em `203.0.113.5:61001` e é traduzida de volta.

## CGNAT
Quando faltam IPv4 públicos, o provedor usa **NAT em escala (Carrier-Grade NAT)**: vários clientes compartilham o mesmo IP público. O espaço `100.64.0.0/10` é reservado para a rede entre o cliente e o CGNAT.

Consequências:
- Dificulta **hospedar serviços** em casa e algumas aplicações ponto a ponto.
- O provedor precisa **registrar as traduções** (IP, porta, horário) para conseguir identificar quem usou determinado endereço.
- O **IPv6** elimina essa necessidade.

## Faixas privadas
`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`.

## Erros comuns
Falta de rota de retorno para o pool de NAT, sessões estouradas na tabela, ALG interferindo em protocolos, ausência de logs de tradução.

## O que costuma cair na prova

- PAT: muitos IPs, um IP público, diferenciados por porta
- Faixas privadas e a faixa 100.64.0.0/10
- Por que existe o CGNAT e quais os impactos
- Diferença entre NAT estático, dinâmico e PAT
