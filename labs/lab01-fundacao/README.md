# Lab 01: Fundação (Eth-Trunk, IPs de link, Loopback e gerência)

**Status:** a fazer

## Objetivo

Ligar os equipamentos, agregar links e configurar os três tipos de IP de um equipamento de rede (link, Loopback e gerência), validando a comunicação entre vizinhos diretos.

## Por que isso importa

Todo protocolo posterior (OSPF, MPLS, BGP) assume que os vizinhos já se falam. Um erro nesta base contamina tudo, e boa parte dos chamados de "link fora" se resolve aqui. As configs de referência estão em `configs/`, mas tente raciocinar antes de olhar.

## Pré-requisitos

- Equipamentos no PNETLab com os cabos ligados (2 cabos CE12800-R1, 1 cabo R1-R2, 1 cabo R2-R3)
- Plano de endereçamento em `docs/07-plano-de-enderecamento.md`
- Leitura de `docs/08-eth-trunk-lacp.md` e `docs/14-mascaras-e-ips.md`

## Passos e o porquê de cada um

| # | O que fazer | Por que fazer |
|---|---|---|
| 1 | Conferir os nomes reais das portas de cada equipamento | Os nomes variam por modelo e template. Configurar a porta errada é um erro comum e silencioso. |
| 2 | Tirar as portas do estado desligado | No CE12800 as portas nascem desligadas administrativamente. Sem isso nada sobe, mesmo com o cabo ligado. |
| 3 | Criar a Eth-Trunk com LACP nos dois lados e colocar as duas portas físicas nela | Dois cabos viram um link lógico: soma de banda e proteção contra a queda de um cabo, sem formar loop. |
| 4 | Fazer a Eth-Trunk carregar a VLAN de gerência como trunk | Simula o uplink de uma OLT real, que leva várias VLANs. Prepara o terreno para o Lab 7. |
| 5 | No R1, colocar a Eth-Trunk em modo de switch | Roteador nasce em L3 e não aceita comandos de porta de switch. O modo de switch deixa as duas pontas simétricas. |
| 6 | Criar a VLAN 100 e a interface virtual dela (Vlanif) com IP nos dois lados | O IP de uma VLAN mora na Vlanif. É o modelo de gerência em banda de uma OLT. |
| 7 | Configurar IPs ponto a ponto /30 nos links R1-R2 e R2-R3 | Um /30 comporta exatamente dois equipamentos; cada link é uma rede própria. |
| 8 | Criar a Loopback de cada roteador com máscara /32 | É o identificador estável que OSPF, MPLS e BGP vão usar. Não depende de nenhum cabo. |
| 9 | Configurar a gerência fora de banda em uma rede separada | Permite acessar o equipamento mesmo quando o backbone está com problema. |
| 10 | Confirmar as mudanças (commit no NE40E) | O NE40E só aplica depois de confirmar. Sem isso a configuração fica pendente e parece que "não funciona". |

## O que observar

- As duas portas da Eth-Trunk ativas (Selected) nos dois lados
- Vlanif 100 ativa nos dois equipamentos
- Ping entre cada par de vizinhos diretos respondendo
- Ping para a Loopback de um roteador distante **falhando**: ainda não há roteamento, e isso é o gancho para os Labs 2 e 3
- Ping entre os IPs de gerência funcionando, independente do restante

## Teste de falha

- Com ping contínuo rodando, desligar uma das duas portas do agregado: o ping não deve cair
- Desligar as duas: a Vlanif cai e o ping para
- Religar e ver o agregado se reconstruir

## Parte de troubleshooting: erros para provocar

Provoque um erro por vez, observe o sintoma e raciocine antes de corrigir.

| Erro | Sintoma esperado | Como raciocinar |
|---|---|---|
| Máscara diferente nas duas pontas | Ping falha ou fica instável | Comparar a rede calculada por cada lado: se não coincidem, os dois não se veem como vizinhos diretos |
| Modo LACP diferente nas pontas | Portas ficam sem entrar no agregado | Olhar o estado de cada porta membro e comparar o modo configurado nos dois lados |
| Uma porta membro desligada | Agregado sobe com uma porta só | Verificar o estado físico e administrativo de cada membro |
| VLAN 100 não liberada no trunk de um lado | Vlanif ativa, mas sem ping | Se a interface está ativa e o ping falha, suspeitar de tag/VLAN no caminho |
| IP colocado em porta membro em vez do agregado | Comando rejeitado ou sem efeito | Lembrar a regra: IP no agregado ou na Vlanif, nunca no membro |

## Perguntas de reflexão

1. Por que a Loopback não cai quando um cabo cai?
2. Por que o ping para a Loopback do R3 falha neste lab?
3. Por que o link do CE12800 usa Vlanif e o R1-R2 usa IP direto na porta?
4. O que acontece com a banda e com a redundância ao agregar dois cabos?

## O que costuma cair na prova

- Diferença entre porta L2 e L3 e quando usar cada uma
- Cálculo de /30 e escolha de máscara por tipo de interface
- LACP: requisitos e motivos de porta não entrar no agregado
- Tipos de IP de um equipamento de rede

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
- [ ] Teste de falha feito
- [ ] Erros provocados e diagnosticados
- [ ] Perguntas respondidas por escrito
