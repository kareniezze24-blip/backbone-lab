# Lab 5: MPLS e LDP

**Status:** a fazer

## Objetivo

Fazer o backbone encaminhar por labels em vez de olhar o IP a cada salto, e entender o papel de PE e P.

## Por que isso importa

MPLS é o transporte de quase todo backbone de operador. É a base dos túneis, pseudowires, VPLS e L3VPN.

## Pré-requisitos

- Lab 3 ou 4 concluído (Loopbacks alcançáveis em todos)
- Leitura de `docs/11-mpls-ldp.md`

## Passos e o porquê de cada um

| # | O que fazer | Por que fazer |
|---|---|---|
| 1 | Garantir que todas as Loopbacks são alcançáveis pelo IGP | O LDP forma sessão pelo IP do LSR-ID. Sem alcançabilidade, a sessão não sobe. |
| 2 | Definir o LSR-ID igual à Loopback | Identifica o roteador no MPLS e segue o mesmo padrão do router-id. |
| 3 | Ligar o MPLS globalmente | Habilita a função no equipamento; ainda nenhum link usa. |
| 4 | Ligar MPLS e LDP nas interfaces do backbone, e não nas do cliente | O cliente envia pacotes IP puros. As labels existem só dentro da rede da operadora. |
| 5 | Verificar as sessões LDP e a tabela de labels | Cada roteador atribui labels aos prefixos e as anuncia ao vizinho. |
| 6 | Rastrear o caminho entre PEs e acompanhar a troca de labels | Mostra o PE colocando a label, o P trocando e o PE de saída retirando. |
| 7 | Entender a retirada da label no penúltimo salto | O penúltimo roteador já retira a label para poupar trabalho ao último. É conceito clássico de prova. |
| 8 | Ligar a sincronização entre IGP e LDP | Evita mandar tráfego por um link em que o IGP já subiu mas o LDP ainda não, o que causaria um buraco negro. |
| 9 | Observar o efeito da MTU | Cada label soma 4 bytes. Pacotes grandes podem ser descartados se a MTU do backbone for justa. |

## O que observar

- Sessões LDP operacionais entre todos os vizinhos
- LSP para a Loopback de cada PE
- Rastreio mostrando labels no caminho do backbone

## Teste de falha

- Derrubar um link e ver o LSP se refazer pelo outro caminho

## Parte de troubleshooting: erros para provocar

Provoque um erro por vez, observe o sintoma e raciocine antes de corrigir.

| Erro | Sintoma esperado | Como raciocinar |
|---|---|---|
| LDP só de um lado do link | Sessão não sobe | Verificar MPLS e LDP nas duas interfaces |
| Loopback fora do IGP | Sessão LDP remota não forma | Verificar a alcançabilidade do LSR-ID |
| MTU baixa | Ping pequeno passa e grande não | Testar tamanhos de pacote diferentes |
| LSR-ID diferente da Loopback anunciada | Sessão instável | Comparar o ID com o IP anunciado |

## Perguntas de reflexão

1. Por que o roteador P não precisa conhecer os clientes?
2. Qual problema a sincronização IGP-LDP resolve?

## O que costuma cair na prova

- Cabeçalho MPLS: 32 bits (label 20, TC 3, S 1, TTL 8)
- LDP: porta 646, UDP para descoberta e TCP para sessão
- Penúltimo salto e label implícita
- Papéis de LER e LSR (PE e P)

## Checklist

- [ ] Passo 1
- [ ] Passo 2
- [ ] Passo 3
- [ ] Passo 4
- [ ] Passo 5
- [ ] Passo 6
- [ ] Passo 7
- [ ] Passo 8
- [ ] Passo 9
- [ ] Teste de falha feito
- [ ] Erros provocados e diagnosticados
- [ ] Perguntas respondidas por escrito
