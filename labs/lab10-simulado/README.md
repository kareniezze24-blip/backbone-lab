# Lab 10: Simulado de troubleshooting

**Status:** a fazer

## Objetivo

Receber um cenário com vários problemas ao mesmo tempo, como um chamado real, e achar todas as causas sem ajuda.

## Por que isso importa

A prova de analista cobra raciocínio, e não apenas decoreba. Este lab treina a investigação em camadas: física, enlace, rede, MPLS e serviço.

## Pré-requisitos

- Todos os labs anteriores

## Passos e o porquê de cada um

| # | O que fazer | Por que fazer |
|---|---|---|
| 1 | Receber o cenário e ler só o sintoma | No trabalho real o chamado dá o sintoma, nunca a causa. |
| 2 | Formular hipóteses por camada, de baixo para cima | Começar pela física evita perder tempo no protocolo quando o cabo está solto. |
| 3 | Testar cada hipótese com o menor esforço | Um ping e uma consulta de estado resolvem muita coisa. |
| 4 | Anotar o que foi descartado | Evita repetir testes e documenta o diagnóstico. |
| 5 | Corrigir uma coisa por vez e validar | Mudar várias coisas juntas impede saber o que resolveu. |
| 6 | Escrever o relatório: sintoma, causa, correção e prevenção | Fecha o chamado e transforma a experiência em conhecimento. |

## O que observar

- Todos os serviços restabelecidos
- Lista de causas identificadas, com evidência de cada uma

## Teste de falha

- Repetir o cenário trocando a ordem dos erros

## Parte de troubleshooting: erros para provocar

Provoque um erro por vez, observe o sintoma e raciocine antes de corrigir.

| Erro | Sintoma esperado | Como raciocinar |
|---|---|---|
| Combinação de erros em camadas diferentes | Sintoma único para causas distintas | Resolver de baixo para cima e revalidar a cada passo |

## Perguntas de reflexão

1. Em que ordem você investiga: sintoma, camada ou equipamento?
2. O que muda quando existem dois erros ao mesmo tempo?

## O que costuma cair na prova

- Método de troubleshooting por camadas OSI
- Interpretação de saídas de estado
- Comunicação do diagnóstico

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
