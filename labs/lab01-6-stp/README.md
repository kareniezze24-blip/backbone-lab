# Lab 1.6: STP/RSTP e loops de camada 2

**Status:** a fazer

## Objetivo

Ver na prática um loop de L2, a tempestade de broadcast que ele provoca e como o STP/RSTP bloqueia portas para evitar isso.

## Por que isso importa

Entender por que o backbone da rede real tem STP desligado (porque é L3 e usa Eth-Trunk) só faz sentido depois de ver o problema que o STP resolve. É assunto garantido em prova.

## Pré-requisitos

- Labs 1 e 1.5 concluídos
- Dois equipamentos L2 ligados por dois cabos, sem agregação
- Leitura de `docs/03-redundancia.md`

## Passos e o porquê de cada um

| # | O que fazer | Por que fazer |
|---|---|---|
| 1 | Ligar dois cabos entre os mesmos switches, sem Eth-Trunk e com STP desligado | Forma um círculo de L2. É a receita do loop. Faça em lab, nunca em produção. |
| 2 | Gerar um broadcast e observar o efeito | O quadro não tem prazo de validade e fica circulando: uso de CPU sobe e a tabela MAC fica instável. Isso é a tempestade de broadcast. |
| 3 | Ligar o RSTP | O protocolo passa a detectar o círculo e bloquear uma porta de propósito. |
| 4 | Identificar quem é a root bridge e por quê | A root é o switch de menor Bridge ID (prioridade, depois MAC). Todos calculam o caminho em direção a ela. |
| 5 | Identificar os papéis das portas (raiz, designada, alternativa) e quem está bloqueada | Mostra que a redundância continua existindo, mas como reserva ociosa. |
| 6 | Alterar a prioridade para escolher a root de propósito | Em projeto real, a root não pode ser decidida pelo MAC mais baixo por acaso; ela é planejada. |
| 7 | Derrubar o caminho ativo e medir quanto tempo o tráfego leva para voltar | RSTP converge em poucos segundos; STP clássico leva dezenas. É o custo da redundância em L2. |
| 8 | Conhecer as proteções (porta de borda, BPDU guard, root guard) | Evitam que um equipamento ligado por engano mude a topologia ou vire root. |

## O que observar

- Antes do STP: tráfego em loop e tabela MAC oscilando
- Depois do STP: uma porta bloqueada e o tráfego normal
- Ao derrubar o caminho ativo, a porta bloqueada assume

## Teste de falha

- Derrubar o cabo ativo e cronometrar a recuperação
- Comparar com o agregado do Lab 1, que se recupera sem esperar nenhum protocolo

## Parte de troubleshooting: erros para provocar

Provoque um erro por vez, observe o sintoma e raciocine antes de corrigir.

| Erro | Sintoma esperado | Como raciocinar |
|---|---|---|
| STP desligado com círculo físico | Rede lenta ou travada, CPU alta | Procurar círculo físico e portas que nunca deveriam ter cabo |
| Root bridge em um switch de acesso | Tráfego dá voltas ineficientes | Verificar quem é a root e se foi planejada |
| Equipamento novo ligado por engano e que vira root | Topologia muda de repente | Revisar proteções de borda e prioridade |

## Perguntas de reflexão

1. Por que o backbone da rede real tem STP desligado?
2. Por que uma porta bloqueada pelo STP não é um defeito?
3. Por que o Eth-Trunk não precisa de STP entre os dois cabos?

## O que costuma cair na prova

- Eleição da root bridge e papéis de porta
- Estados do RSTP (descarte, aprendizado, encaminhamento)
- Diferença entre STP, RSTP e MSTP
- Loop de L2 e tempestade de broadcast

## Checklist

- [ ] Passo 1
- [ ] Passo 2
- [ ] Passo 3
- [ ] Passo 4
- [ ] Passo 5
- [ ] Passo 6
- [ ] Passo 7
- [ ] Passo 8
- [ ] Teste de falha feito
- [ ] Erros provocados e diagnosticados
- [ ] Perguntas respondidas por escrito
