# Pseudowire e VPLS (VSI)

## Pseudowire (ponto a ponto)
Leva uma VLAN de um PE ao outro, como um cabo virtual.
```
interface Vlanif 733
 mtu 9000
 mpls l2vc 10.200.255.3 733
```
`mpls l2vc <Loopback do PE remoto> <vc-id>`. O vc-id deve ser **igual nas duas pontas**.

## VPLS (multiponto)
Vários PEs formam um switch virtual.
```
mpls l2vpn
vsi PPPOE-CLIENTES static
 pwsignal ldp
  vsi-id 3051
  peer 10.200.255.3 tnl-policy PARA-R3
  peer 10.200.255.4
 mtu 9000

interface Vlanif 3051
 mtu 9216
 l2 binding vsi PPPOE-CLIENTES
```

| Comando | Função |
|---|---|
| `vsi NOME static` | Cria a instância de VPLS |
| `pwsignal ldp` | Sinaliza os pseudowires por LDP |
| `vsi-id` | Identificador do serviço, **igual nas duas pontas** |
| `peer <IP>` | PE remoto que participa da VSI |
| `tnl-policy` | Usa um túnel TE específico para esse peer |
| `l2 binding vsi` | Liga a Vlanif (a VLAN) à VSI |

## Requisitos
- LDP remoto entre os PEs (`mpls ldp remote-peer`).
- `mpls l2vpn` global.
- MTU maior no backbone e nas interfaces de serviço.

## Verificação
```
display vsi
display vsi name PPPOE-CLIENTES verbose
display mpls l2vc
display mac-address vsi PPPOE-CLIENTES
```
O pseudowire deve estar `up`.

## Erros comuns
`vsi-id` diferente nas pontas, VLAN não liberada no trunk, falta de LDP remoto,
MTU baixa, VSI criada sem `vsi-id` nem peers (config órfã).
