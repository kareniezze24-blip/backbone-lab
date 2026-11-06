# Lab 5.2: LDP remoto, BFD e FRR

**Status:** a fazer

## Objetivo

Entender como PEs distantes conversam por LDP, como detectar falhas rápido (BFD) e como pré-calcular caminhos alternativos (FRR).

## Por que isso importa

Serviços como pseudowire e VPLS dependem de LDP remoto. Convergência rápida depende de BFD e FRR. São temas de projeto de backbone.

## Pré-requisitos

- Labs 3 e 5 concluídos
- Leitura de `docs/10-ospf.md` e `docs/11-mpls-ldp.md`

## Passos e o porquê de cada um

| # | O que fazer | Por que fazer |
|---|---|---|
| 1 | Abrir uma sessão LDP remota entre R1 e R3 | R1 e R3 não são vizinhos diretos. A sessão remota troca informação de serviço por cima do roteamento. |
| 2 | Conferir que a sessão forma apenas porque as Loopbacks se alcançam | Reforça a dependência do IGP. |
| 3 | Ligar o BFD nas interfaces do IGP | O BFD detecta a falha em centenas de milissegundos, muito antes dos temporizadores do OSPF. |
| 4 | Comparar o tempo de detecção com e sem BFD | Os números concretos tornam o conceito memorável. |
| 5 | Ligar o caminho alternativo pré-calculado (LFA/FRR) no IGP | O roteador já tem a saída reserva calculada e troca imediatamente, sem esperar a rede reconvergir. |
| 6 | Provocar a falha e medir a perda de pacotes | Fecha o ciclo: detecção rápida mais desvio imediato. |

## O que observar

- Sessão LDP remota operacional
- BFD estabelecido nas interfaces
- Menor perda de pacotes na falha, com BFD e FRR

## Teste de falha

- Derrubar o link principal com e sem BFD e comparar

## Parte de troubleshooting: erros para provocar

Provoque um erro por vez, observe o sintoma e raciocine antes de corrigir.

| Erro | Sintoma esperado | Como raciocinar |
|---|---|---|
| BFD com temporizadores diferentes nas pontas | Sessão BFD instável | Comparar intervalos e multiplicador |
| LDP remoto sem rota para o peer | Sessão não sobe | Verificar se a Loopback remota é alcançável |

## Perguntas de reflexão

1. Por que um serviço precisa de LDP remoto?
2. O que o BFD detecta que o OSPF demora a notar?

## O que costuma cair na prova

- BFD: função e temporização
- FRR e LFA
- LDP remoto x LDP direto

## Checklist

- [ ] Passo 1
- [ ] Passo 2
- [ ] Passo 3
- [ ] Passo 4
- [ ] Passo 5
- [ ] Passo 6
- [ ] Teste de falha feito
- [ ] Erros provocados e diagnosticados
- [ ] Perguntas respondidas por escrito
