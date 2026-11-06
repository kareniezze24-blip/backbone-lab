# MPLS e LDP

## Ordem
1. IGP funcionando (Loopbacks alcançáveis).
2. MPLS global e LDP.
3. MPLS e LDP em cada interface do backbone.

## Global
```
mpls lsr-id 10.200.255.1
mpls
 mpls te
 mpls rsvp-te
 mpls te cspf
mpls ldp
quit
mpls l2vpn
```
| Comando | Função |
|---|---|
| `mpls lsr-id` | Identificador do roteador (a Loopback) |
| `mpls` | Liga o MPLS |
| `mpls te`, `mpls rsvp-te`, `mpls te cspf` | Engenharia de tráfego |
| `mpls ldp` | Distribuição de labels |
| `mpls l2vpn` | Suporte a pseudowire e VPLS |
| `undo ttl propagate public` | Esconde os saltos do backbone do traceroute do cliente |

## Por interface (cada link de backbone)
```
interface Ethernet1/0/2
 mpls
 mpls ldp
 mpls te
 mpls rsvp-te
```
Sem isso, o link não carrega labels. Não ligue MPLS nas interfaces voltadas ao cliente.

## LDP remoto
Sessão com PE que **não é vizinho direto**, necessária para pseudowires.
```
mpls ldp remote-peer PE-R3
 remote-ip 10.200.255.3
```
O IP remoto precisa estar alcançável no IGP.

## Verificação
```
display mpls ldp session
display mpls ldp peer
display mpls lsp
display mpls interface
```
A sessão deve estar `Operational`. Deve existir LSP para a Loopback dos outros PEs.

## Erros comuns
LDP só de um lado, Loopback fora do IGP, MTU baixa, `lsr-id` diferente da Loopback
anunciada.
