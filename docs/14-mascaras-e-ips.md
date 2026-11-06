# Qual máscara e qual IP usar

## Regra de decisão
1. É **Loopback**? Use **/32**.
2. Liga **dois equipamentos** (ponto a ponto)? Use **/30** (ou /31).
3. Liga a uma **rede com vários equipamentos**? Conte os hosts.

## Tabela de máscaras
| Prefixo | Máscara | Endereços | Usáveis |
|---|---|---|---|
| /32 | 255.255.255.255 | 1 | 1 (Loopback) |
| /31 | 255.255.255.254 | 2 | 2 (ponto a ponto) |
| /30 | 255.255.255.252 | 4 | 2 |
| /29 | 255.255.255.248 | 8 | 6 |
| /28 | 255.255.255.240 | 16 | 14 |
| /27 | 255.255.255.224 | 32 | 30 |
| /24 | 255.255.255.0 | 256 | 254 |

## Anatomia de um /30
```
10.200.0.4/30
  .4  -> rede (não usar)
  .5  -> equipamento A
  .6  -> equipamento B
  .7  -> broadcast (não usar)
```
Os blocos começam em múltiplos de 4: .0, .4, .8, .12, .16, .20.

## Os três tipos de IP de um equipamento
| Tipo | Onde | Máscara |
|---|---|---|
| Link | Cada interface ligada a outro equipamento | /30 |
| Loopback | LoopBack0 | /32 |
| Gerência fora de banda | Porta MEth | /24 (rede própria) |

## Regras
- Cada link em uma rede própria; dois links não compartilham o mesmo /30.
- Os dois lados do link usam a **mesma máscara**.
- Loopbacks únicas e fora da faixa dos links.
- Gerência em faixa separada.

## Erros comuns
/32 em um link (vizinhos não se enxergam), máscaras diferentes nas pontas,
IP de rede ou de broadcast usado em uma interface, mesmo /30 em dois links.
