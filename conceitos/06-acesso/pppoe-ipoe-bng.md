## O problema
O cliente precisa **autenticar-se**, **receber um IP** e ter a **banda limitada** pelo plano. Quem faz isso é o **BNG** (ou BRAS), o concentrador de assinantes.

## PPPoE
Encapsula o PPP dentro do Ethernet.

**Fase de descoberta:** PADI (cliente procura), PADO (concentrador oferece), PADR (cliente pede), PADS (sessão confirmada).
**Fase de sessão:** LCP negocia o enlace, **PAP ou CHAP** autentica, **IPCP** entrega o IP.

- Overhead de **8 bytes**: a **MTU** cai para **1492** (e o MSS é ajustado).
- Cada cliente tem uma **sessão** que pode ser contabilizada e derrubada individualmente.

## IPoE
O cliente usa **DHCP** diretamente, sem PPP. A identificação vem do **MAC** e/ou da **option 82** (porta da OLT). É mais leve e escala melhor, mas a autenticação é por dispositivo e porta.

| | PPPoE | IPoE |
|---|---|---|
| Autenticação | Usuário e senha (CHAP) | MAC / option 82 |
| Overhead | 8 bytes | Nenhum |
| Controle por sessão | Muito bom | Depende do BNG |
| Escala | Boa | Melhor |

## Funções do BNG
| Função | Descrição |
|---|---|
| Terminação de sessão | Recebe PPPoE ou DHCP |
| **AAA** via RADIUS | Autentica, autoriza (plano, banda) e registra (accounting) |
| Entrega de IP | Pool ou IP fixo |
| QoS por assinante | Limite de banda e filas |
| NAT / CGNAT | Frequentemente logo após o BNG |

## No backbone
O tráfego PPPoE das OLTs viaja em **VLANs por VPLS ou pseudowire** até o BNG, em um dos PEs.

## Erros comuns
Autenticação rejeitada pelo RADIUS, MTU/MSS errados (sites travam), sessão presa, VLAN do PPPoE fora do caminho, esgotamento do pool.

## O que costuma cair na prova

- Fases do PPPoE e MTU 1492
- PPPoE x IPoE
- Funções do BNG e papel do RADIUS
- PAP x CHAP
