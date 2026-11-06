# Troubleshooting: erros propositais

Fluxo: 1) cenário quebrado, 2) observar o sintoma, 3) diagnosticar com `display`,
4) corrigir e validar. Tente achar a causa antes de olhar a dica.

## Lab 1
| # | Erro injetado | Sintoma esperado | Onde olhar |
|---|---|---|---|
| 1.1 | Máscara /29 de um lado e /30 do outro | Ping falha ou instável | `display ip interface brief` nos dois lados |
| 1.2 | `mode manual` de um lado e `lacp-static` do outro | Portas Unselected | `display eth-trunk 1` |
| 1.3 | Uma porta membro em `shutdown` | Eth-Trunk sobe só com 1 porta | `display interface brief` |
| 1.4 | VLAN 100 não liberada no trunk de um lado | Vlanif up, mas sem ping | `display this` na Eth-Trunk |
| 1.5 | Tag/VLAN diferente nas duas pontas | Sem comunicação | `display vlan` |

## Lab 1.5 e 1.6
| # | Erro | Sintoma |
|---|---|---|
| 1.5.1 | Access de um lado e trunk do outro | Quadros com e sem tag não se entendem |
| 1.5.2 | Native VLAN diferente | Tráfego cai na VLAN errada |
| 1.5.3 | Dois cabos sem Eth-Trunk e sem STP | Loop e broadcast storm |

## Labs futuros
Os cenários de OSPF, MPLS, TE e serviços entram junto de cada lab.
