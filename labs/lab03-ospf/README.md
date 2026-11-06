# Lab 3: OSPF no backbone

**Status:** a fazer

## Objetivo

Substituir as rotas estáticas por OSPF e entender como os roteadores descobrem vizinhos, trocam topologia e calculam caminhos sozinhos.

## Por que isso importa

O OSPF é o IGP mais cobrado em provas e o mais usado em backbones médios. Ele anuncia as Loopbacks de que o MPLS e o BGP dependem.

## Pré-requisitos

- Lab 2 concluído
- R4 ligado entre R1 e R3, formando o caminho alternativo (`docs/07`)
- Leitura de `docs/10-ospf.md`

## Passos e o porquê de cada um

| # | O que fazer | Por que fazer |
|---|---|---|
| 1 | Retirar as rotas estáticas do lab | Evita que a rota manual esconda um problema do protocolo, já que ela tem preferência diferente. |
| 2 | Definir o router-id de cada roteador igual à Loopback | O router-id precisa ser único e estável; a Loopback não cai com um cabo. |
| 3 | Ativar o OSPF na área 0 nas interfaces de backbone | A área 0 é o backbone do OSPF; todas as outras se ligam a ela. |
| 4 | Anunciar também a Loopback de cada roteador | Os outros roteadores só alcançam a Loopback se ela for anunciada. Sem isso, MPLS e BGP não fecham. |
| 5 | Marcar os links como ponto a ponto | Evita eleição de DR/BDR, que só faz sentido em redes com vários roteadores no mesmo segmento. Adjacência mais rápida. |
| 6 | Verificar que cada vizinho chegou ao estado Full | Full significa que as bases de topologia estão sincronizadas. Estados presos indicam problema de parâmetros. |
| 7 | Olhar a base de topologia e a tabela de rotas OSPF | Entender de onde vem cada rota e com que custo. |
| 8 | Ajustar a banda de referência | Com a referência padrão, 1G e 100G têm o mesmo custo. Em backbone de alta velocidade, o OSPF escolheria caminhos ruins. |
| 9 | Comparar o caminho principal (via R2) com o alternativo (via R4) e ajustar o custo | O OSPF escolhe o menor custo. Controlar o custo é como o engenheiro direciona o tráfego. |
| 10 | Ligar o BFD | Detecta falha de link em milissegundos. Sem ele, o OSPF espera os timers (segundos). |
| 11 | Opcional: colocar o R5 em uma área 1, com o R3 como ABR | Introduz multi-área, LSA tipo 3 e resumo de rotas. |

## O que observar

- Todos os vizinhos em Full
- Loopbacks de todos os roteadores aparecendo na tabela de roteamento
- Ping entre Loopbacks funcionando
- Mudança de custo alterando o caminho escolhido

## Teste de falha

- Derrubar o R2 e ver o tráfego migrar para o R4
- Medir o tempo de convergência sem BFD e com BFD
- Religar o R2 e observar a volta ao caminho de menor custo

## Parte de troubleshooting: erros para provocar

Provoque um erro por vez, observe o sintoma e raciocine antes de corrigir.

| Erro | Sintoma esperado | Como raciocinar |
|---|---|---|
| Área diferente nas duas pontas | Vizinhança não forma | Comparar a área configurada em cada lado |
| Hello e dead diferentes | Vizinhança cai e sobe | Comparar os temporizadores |
| Tipo de rede incompatível | Vizinhança em estado intermediário | Verificar o tipo de rede nas duas pontas |
| Router-id duplicado | Rotas somem ou oscilam | Procurar IDs repetidos na rede |
| Loopback não anunciada | Vizinhos Full, mas sem rota para a Loopback | Verificar se a Loopback foi incluída no processo |

## Perguntas de reflexão

1. Por que o custo padrão não diferencia links de 1G e 100G?
2. Qual a utilidade da área 0?
3. Por que links ponto a ponto dispensam DR/BDR?

## O que costuma cair na prova

- Estados de vizinhança OSPF e o que cada um indica
- Tipos de LSA, áreas e ABR/ASBR
- Cálculo de custo e banda de referência
- Parâmetros que precisam bater para formar vizinhança

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
- [ ] Passo 10
- [ ] Passo 11
- [ ] Teste de falha feito
- [ ] Erros provocados e diagnosticados
- [ ] Perguntas respondidas por escrito
