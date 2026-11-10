## O que é
Junta várias portas físicas em **uma interface lógica**. Ganha-se banda somada
e redundância de cabo, sem loop (para o switch é um caminho só).

## LACP
Protocolo que **negocia** entre as duas pontas quais portas entram no grupo.

| Modo | Comando | Observação |
|---|---|---|
| LACP estático | `mode lacp-static` (CloudEngine/NE) ou `mode lacp` (série S) | As pontas negociam. Recomendado |
| Manual | `mode manual load-balance` | Sem negociação. Mais simples e menos robusto |

O comando depende do modelo: confirme com `mode ?`.

## Regras
- As duas pontas devem usar o **mesmo modo**.
- As portas membro devem ter a **mesma velocidade e duplex**.
- O IP (ou o trunk de VLAN) vai na **Eth-Trunk**, nunca nas portas membro.
- As portas membro precisam de `undo shutdown`.

## Eth-Trunk como porta L2 (trunk de VLAN)
```
interface Eth-Trunk 1
 mode lacp-static
 port link-type trunk
 undo port trunk allow-pass vlan 1
 port trunk allow-pass vlan 100
interface GE1/0/0
 undo shutdown
 eth-trunk 1
```

## Eth-Trunk como porta L3 (link de backbone)
```
interface Eth-Trunk 117
 undo portswitch
 ip address 10.200.0.5 255.255.255.252
 mode lacp
 jumboframe enable 12288
interface 100GE0/0/2
 eth-trunk 117
```
`undo portswitch` transforma a Eth-Trunk em porta roteada (CloudEngine/série S).
No NE40E, a Eth-Trunk já nasce L3 e o `portswitch` a transforma em L2.

## Balanceamento
Os pacotes são distribuídos por **hash** (MACs, IPs, portas, labels). Um mesmo
fluxo sempre usa o mesmo cabo; vários fluxos se espalham. No backbone MPLS, o
hash inclui as labels (`load-balance enhanced profile`).

## Verificação
```
display eth-trunk 1
```
As portas devem estar `Selected`. `Unselected` indica modo diferente, velocidade
diferente, porta em `shutdown` ou outro lado não configurado.

## Erros comuns
Modo diferente nas pontas, IP colocado na porta membro, porta membro em `shutdown`.

## O que costuma cair na prova

- Requisitos do LACP: mesma velocidade, duplex e modo
- Um fluxo usa um único cabo (hash)
- IP no agregado, nunca nas portas membro
- Estados Selected e Unselected
