# VLAN, access, trunk e Vlanif

## VLAN
Separa uma rede L2 em redes lógicas. Uma VLAN pode passar por quantos switches
e portas você liberar. Loop só existe quando os cabos formam um círculo.

## Tipos de porta
| Tipo | Quadros | Uso |
|---|---|---|
| access | Sem tag, uma VLAN | Equipamento final ou link simples |
| trunk | Com tag 802.1Q, várias VLANs | Link entre equipamentos |
| dot1q-tunnel | QinQ: tag de operadora sobre a do cliente | Transporte de clientes |

```
vlan batch 100 200
vlan 100
 description GERENCIA_OLT

interface Eth-Trunk 1
 port link-type trunk
 undo port trunk allow-pass vlan 1
 port trunk allow-pass vlan 100 200
```
Libere só as VLANs necessárias e tire a VLAN 1 do trunk.

## Vlanif (SVI)
Interface virtual que dá um **IP a uma VLAN** em um equipamento de camada 2/3.
```
interface Vlanif 100
 ip address 10.200.0.1 255.255.255.252
```
Fica `up` enquanto houver pelo menos uma porta ativa na VLAN.

## Switch x roteador
| | Switch | Roteador |
|---|---|---|
| Modelo mental | VLANs | Interfaces |
| IP da VLAN | Vlanif | Vlanif (com `portswitch`) ou subinterface dot1q |

No NE40E, `portswitch` permite usar Vlanif como em um switch.

## Tabela MAC
O switch aprende o MAC de origem de cada quadro e a porta de entrada.
```
display mac-address
display vlan
```

## QinQ
```
interface XGigabitEthernet0/0/6
 port link-type dot1q-tunnel
 port default vlan 600
```
Todo o tráfego do cliente (com qualquer tag) entra na VLAN 600 da operadora.
