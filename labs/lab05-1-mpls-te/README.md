# Lab 5.1: MPLS-TE, túneis e proteção

**Status:** a fazer

## Objetivo

Criar túneis com caminho escolhido (principal e backup) e ver o failover automático quando o caminho principal cai.

## Por que isso importa

É o que a rede real faz para proteger o transporte de serviços críticos. O padrão "principal, secundário, hot-standby e WTR" aparece em backbones de operadora.

## Pré-requisitos

- Labs 3 e 5 concluídos, com R4 ligado
- Leitura de `docs/12-mpls-te-tunnel.md`

## Passos e o porquê de cada um

| # | O que fazer | Por que fazer |
|---|---|---|
| 1 | Ligar TE, RSVP-TE e CSPF globalmente e nas interfaces | O túnel é sinalizado salto a salto pelo RSVP-TE e calculado pelo CSPF. Se faltar em um salto, o túnel não sobe. |
| 2 | Habilitar a distribuição de informação de TE no IGP | O CSPF só calcula se souber a topologia e a banda disponível, que vêm do IGP. |
| 3 | Definir o caminho principal explícito, via R2 | O explicit-path obriga o túnel a passar pelos saltos listados, em vez de seguir o menor custo. |
| 4 | Definir o caminho secundário explícito, via R4 | É a rota de reserva planejada, que existe separada do principal. |
| 5 | Criar o túnel com destino na Loopback do PE remoto | O destino do túnel é sempre a Loopback do outro PE, não o IP de um link. |
| 6 | Configurar o backup hot-standby com retorno após espera (WTR) | O hot-standby já está montado e assume na hora. O WTR evita voltar ao principal logo que ele reaparece, o que causaria vai e vem. |
| 7 | Configurar o backup comum (best-effort) | Rede de segurança extra: caminho calculado depois da falha, mais lento. |
| 8 | Confirmar o caminho real que o túnel percorre | O registro de rota mostra se o túnel está de fato pelo caminho desejado. |
| 9 | Derrubar o R2 e acompanhar o túnel migrar para o R4 | É o teste que justifica todo o trabalho. |
| 10 | Restaurar o R2 e observar o tempo de espera antes da volta | Mostra o WTR em ação. |
| 11 | Amarrar um serviço ao túnel por política | É assim que um pseudowire passa a usar um caminho específico em vez do LSP padrão. |

## O que observar

- Túnel ativo com o caminho esperado
- Failover para o secundário ao derrubar o R2
- Volta ao principal apenas depois do WTR

## Teste de falha

- Derrubar o R2, o link R1-R2 e depois o R4, comparando o comportamento
- Medir a perda de pacotes durante a troca

## Parte de troubleshooting: erros para provocar

Provoque um erro por vez, observe o sintoma e raciocine antes de corrigir.

| Erro | Sintoma esperado | Como raciocinar |
|---|---|---|
| Esquecer de aplicar a configuração do túnel | Túnel fica inativo | Verificar se a configuração foi confirmada |
| Salto errado no explicit-path | Túnel não sobe | Conferir cada salto da lista contra a topologia |
| Banda reservada maior que a disponível | Túnel rejeitado pelo CSPF | Comparar banda pedida e disponível |
| IGP sem informação de TE | CSPF não calcula | Verificar a distribuição de TE na área |

## Perguntas de reflexão

1. Qual a diferença entre hot-standby e backup comum?
2. Por que o WTR existe?
3. Por que o destino do túnel é a Loopback?

## O que costuma cair na prova

- MPLS-TE, RSVP-TE e CSPF
- FRR: proteção de link e de nó
- Explicit-path, caminho principal e secundário
- Diferença entre LDP e RSVP-TE

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
