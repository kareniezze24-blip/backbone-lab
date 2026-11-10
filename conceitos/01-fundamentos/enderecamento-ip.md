## Por que estudar
Cálculo de sub-rede é pergunta certa em qualquer prova de rede e tarefa diária em projeto. Precisa sair de cabeça, rápido.

## IPv4 em resumo
Endereço de **32 bits**, escrito em 4 octetos (`10.200.0.5`). A **máscara** (ou prefixo) separa a parte da **rede** da parte do **host**.

## Regra de decisão da máscara
1. É **Loopback**? Use **/32**.
2. Liga **dois equipamentos** (ponto a ponto)? Use **/30** (ou /31).
3. Liga a uma **rede com vários equipamentos**? Conte os hosts e escolha a máscara que caiba, com folga.

## Tabela de máscaras

| Prefixo | Máscara | Endereços | Usáveis |
|---|---|---|---|
| /32 | 255.255.255.255 | 1 | 1 (Loopback) |
| /31 | 255.255.255.254 | 2 | 2 (ponto a ponto, RFC 3021) |
| /30 | 255.255.255.252 | 4 | 2 |
| /29 | 255.255.255.248 | 8 | 6 |
| /28 | 255.255.255.240 | 16 | 14 |
| /27 | 255.255.255.224 | 32 | 30 |
| /26 | 255.255.255.192 | 64 | 62 |
| /25 | 255.255.255.128 | 128 | 126 |
| /24 | 255.255.255.0 | 256 | 254 |

Usáveis = endereços menos 2 (endereço de rede e broadcast).

## Como calcular rápido
1. Tamanho do bloco = 256 menos o valor do octeto da máscara (para /26: 256 − 192 = 64).
2. Os blocos começam em múltiplos desse tamanho (0, 64, 128, 192).
3. Descubra em qual bloco o IP cai: o início é a **rede** e o último endereço é o **broadcast**.

**Exemplo:** `192.168.10.77/26` cai no bloco 64 a 127. Rede `.64`, broadcast `.127`, hosts `.65` a `.126`.

## Anatomia de um /30

```
10.200.0.4/30
  .4  -> rede (não usar)
  .5  -> equipamento A
  .6  -> equipamento B
  .7  -> broadcast (não usar)
```
Os blocos de /30 começam em múltiplos de 4: .0, .4, .8, .12, .16, .20.

## Faixas privadas (RFC 1918)

| Faixa | Prefixo |
|---|---|
| 10.0.0.0 a 10.255.255.255 | 10.0.0.0/8 |
| 172.16.0.0 a 172.31.255.255 | 172.16.0.0/12 |
| 192.168.0.0 a 192.168.255.255 | 192.168.0.0/16 |

Outras faixas especiais: `127.0.0.0/8` (loopback), `169.254.0.0/16` (link-local), `100.64.0.0/10` (CGNAT).

## Sumarização
Blocos contíguos e alinhados viram uma só rota: `10.0.0.0/24` a `10.0.3.0/24` (4 blocos) se resumem em `10.0.0.0/22`.

## Os três tipos de IP de um equipamento

| Tipo | Onde | Máscara |
|---|---|---|
| Link | Cada interface ligada a outro equipamento | /30 |
| Loopback | LoopBack0 | /32 |
| Gerência fora de banda | Porta MEth | /24 (rede própria) |

## Erros comuns
- /32 em um link: os vizinhos não se enxergam como diretos.
- Máscaras diferentes nas duas pontas.
- Usar o endereço de rede ou de broadcast em uma interface.
- Dois links no mesmo /30.

> Treine na aba **Exercícios**, em *Treino de sub-redes*, que gera questões novas a cada vez.

## O que costuma cair na prova

- Hosts usáveis por prefixo e tamanho de bloco
- Rede, broadcast e faixa de um IP/máscara
- Menor máscara para N hosts
- Sumarização de blocos contíguos
- Faixas privadas e especiais (RFC 1918, CGNAT, link-local)
