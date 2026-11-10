## Faixas

| Uso | Faixa | Máscara |
|---|---|---|
| Links entre equipamentos | 10.200.0.0/24 (blocos de 4) | /30 |
| Loopbacks | 10.200.255.0/24 | /32 |
| Gerência fora de banda | 192.168.100.0/24 | /24 |
| Cliente (Lab 6) | 10.1.0.0/16 e 10.2.0.0/16 | conforme o lab |

## Links

| Link | Rede | Ponta A | Ponta B |
|---|---|---|---|
| CE12800 - R1 (Vlanif 100) | 10.200.0.0/30 | .1 CE12800 | .2 R1 |
| R1 - R2 | 10.200.0.4/30 | .5 R1 | .6 R2 |
| R2 - R3 | 10.200.0.8/30 | .9 R2 | .10 R3 |
| R1 - R4 (futuro) | 10.200.0.12/30 | .13 R1 | .14 R4 |
| R4 - R3 (futuro) | 10.200.0.16/30 | .17 R4 | .18 R3 |
| R3 - R5 (futuro) | 10.200.0.20/30 | .21 R3 | .22 R5 |

## Loopbacks e gerência

| Equipamento | Loopback0 | Gerência |
|---|---|---|
| R1 | 10.200.255.1/32 | 192.168.100.1/24 |
| R2 | 10.200.255.2/32 | 192.168.100.2/24 |
| R3 | 10.200.255.3/32 | 192.168.100.3/24 |
| R4 | 10.200.255.4/32 | 192.168.100.4/24 |
| R5 | 10.200.255.5/32 | 192.168.100.5/24 |
| CE12800 | (não precisa) | 192.168.100.10/24 (MEth0/0/0) |

## Regras

- Cada /30 usa o 1º e o 2º endereço do bloco; o 1º é a rede e o último é o broadcast.
- Cada Loopback é única e não pode sobrepor os links.
- Cada link fica em uma rede própria.
