# MPLS-TE: túneis, backup e tunnel-policy

## Ideia
O LDP segue o caminho do OSPF. O TE permite **escolher o caminho** e protegê-lo.

## Explicit-path
```
explicit-path VIA-R2
 next hop 10.200.0.6
 next hop 10.200.255.3

explicit-path VIA-R4
 next hop 10.200.0.14
 next hop 10.200.0.18
 next hop 10.200.255.3
```
Lista de saltos por onde o túnel deve passar.

## Túnel
```
interface Tunnel1
 description PARA-R3
 ip address unnumbered interface LoopBack0
 tunnel-protocol mpls te
 destination 10.200.255.3
 mpls te tunnel-id 1
 mpls te record-route
 mpls te path explicit-path VIA-R2
 mpls te path explicit-path VIA-R4 secondary
 mpls te backup hot-standby mode revertive wtr 90
 mpls te backup ordinary best-effort
 mpls te reserved-for-binding
 mpls te commit
```

| Comando | Função |
|---|---|
| `ip address unnumbered ... LoopBack0` | O túnel usa o IP da Loopback |
| `tunnel-protocol mpls te` | Túnel de engenharia de tráfego |
| `destination` | Loopback do PE remoto |
| `mpls te tunnel-id` | Identificador único |
| `record-route` | Registra o caminho real (debug) |
| `path explicit-path` | Caminho principal e `secondary` |
| `backup hot-standby ... wtr 90` | Backup já montado; volta ao principal após 90 s |
| `backup ordinary best-effort` | Backup calculado só após a falha |
| `reserved-for-binding` | Reserva o túnel para uso por serviços (tunnel-policy) |
| `mpls te commit` | **Aplica** a configuração do túnel |

## Tunnel-policy (amarrar um serviço a um túnel)
```
tunnel-policy PARA-R3
 tunnel binding destination 10.200.255.3 te Tunnel1
```
Depois, na VSI ou no pseudowire, referencie a policy (`tnl-policy PARA-R3`).
Sem policy, o serviço usa o LSP comum do LDP.

## Pré-requisitos
OSPF com `mpls-te enable` na área, `mpls te`, `mpls rsvp-te` e `mpls te cspf`
globais, e `mpls te` e `mpls rsvp-te` nas interfaces.

## Verificação
```
display mpls te tunnel
display mpls te tunnel-interface Tunnel1
display tunnel-info all
```
Procure o estado `Up` e o caminho percorrido. Derrube o R2 e veja o túnel migrar
pelo R4.

## Erros comuns
Banda insuficiente, hop errado no explicit-path, esquecer `mpls te commit`,
área OSPF sem `mpls-te enable`.
