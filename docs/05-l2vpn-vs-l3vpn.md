# L2VPN e L3VPN

| | L2VPN | L3VPN |
|---|---|---|
| A operadora entrega | Um "cabo" Ethernet virtual | Uma rede IP privada |
| O PE enxerga | Quadros Ethernet (MACs no VPLS) | Rotas IP do cliente |
| Sinalização | LDP (`pwsignal ldp`) | MP-BGP (VPNv4) |
| Separação entre clientes | VLAN, VSI, vsi-id | VRF, RD, RT |
| Roteamento do cliente | Do cliente | Da operadora |

## L2VPN

- **Pseudowire (VPWS)**: ponto a ponto. `mpls l2vc <IP do PE remoto> <id>` na Vlanif.
- **VPLS**: multiponto, switch virtual. `vsi` + `pwsignal ldp` + `vsi-id` + `peer`, e `l2 binding vsi` na Vlanif. O `vsi-id` deve ser igual nas duas pontas.

## L3VPN

| Elemento | Função |
|---|---|
| VRF (`ip vpn-instance`) | Tabela de rotas privada do cliente |
| RD | Torna única a rota do cliente no BGP |
| RT | Define quem importa as rotas de quem |
| MP-BGP VPNv4 | Carrega as rotas entre PEs |

Caminho de um pacote: CE -> PE1 consulta a VRF -> põe 2 labels (transporte +
serviço) -> P troca a de cima -> PE2 lê a de serviço, consulta a VRF e entrega.

## Atenção

`ip binding vpn-instance` **apaga o IP** da interface: configure o IP depois.
