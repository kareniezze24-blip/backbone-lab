## O objetivo
Recuperar o tráfego em **dezenas de milissegundos** após uma falha, sem esperar a rede inteira reconvergir.

## Duas ideias
| Ideia | Funcionamento |
|---|---|
| **Proteção local** | O roteador ao lado da falha já tem o desvio pronto e troca na hora |
| **Proteção de ponta a ponta** | Um segundo caminho completo já está montado (hot-standby) |

## IP FRR (LFA)
O IGP pré-calcula, para cada destino, um **caminho alternativo sem loop** (*Loop-Free Alternate*). Ao detectar a falha, o roteador usa o alternativo imediatamente.
- Nem toda topologia tem um LFA para todo destino. O **remote LFA** e o **TI-LFA** (com Segment Routing) ampliam a cobertura.

## MPLS TE FRR
Protege túneis TE contra falha de **link** ou de **nó**.

| Termo | Significado |
|---|---|
| **PLR** | Ponto de reparo local: o roteador antes da falha |
| **MP** | Ponto de junção: onde o desvio volta ao caminho original |
| **Túnel de bypass** | Caminho pré-estabelecido que contorna o trecho protegido |
| Proteção de **link** | Contorna a falha de um enlace |
| Proteção de **nó** | Contorna a queda de um roteador inteiro |

## Por que o desvio rápido é só provisório
A proteção local mantém o tráfego vivo; depois o túnel é **reotimizado** para um novo caminho principal (make-before-break: monta o novo antes de derrubar o antigo).

## Comparação com o backup do túnel
| | FRR local | Backup hot-standby (ponta a ponta) |
|---|---|---|
| Quem troca | O roteador adjacente à falha | A origem do túnel |
| Velocidade | Mais rápida | Rápida, depende da detecção |
| Configuração | Auto-FRR no roteador | Backup no túnel |

A rede real combina os dois: `te auto-frr` globalmente e `backup hot-standby` nos túneis.

## Pré-requisito comum
Detecção rápida de falha: **BFD** ou mensagens hello do RSVP.

## O que costuma cair na prova

- PLR e MP, bypass, proteção de link e de nó
- FRR local x backup ponta a ponta
- LFA e suas limitações
- Make-before-break
