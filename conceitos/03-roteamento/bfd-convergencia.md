## O problema
Quando um link cai, o tráfego só se recupera depois de **detectar**, **propagar**, **recalcular** e **instalar** a nova rota. Os temporizadores padrão são lentos: o OSPF espera o **dead interval** (40 s).

## BFD (Bidirectional Forwarding Detection)
Protocolo leve de **detecção de falha** entre dois pontos, independente do protocolo de roteamento.

- Troca pacotes periódicos (UDP 3784 em salto único).
- **Tempo de detecção = multiplicador × intervalo negociado.**

Exemplo da rede real: intervalo de 100 ms e multiplicador 4 detectam a falha em **400 ms**.

O BFD avisa os "clientes": OSPF, IS-IS, BGP, rotas estáticas, VRRP, túneis TE.

## Outras peças da convergência rápida
| Recurso | Função |
|---|---|
| **LFA / FRR** | Caminho alternativo pré-calculado, troca imediata |
| **Graceful Restart** | Reinício do processo sem derrubar o encaminhamento |
| **ldp-sync** | Só usa o link depois que o LDP estiver pronto (evita buraco negro) |
| Throttle de SPF | Controla a frequência de recálculos |
| ECMP | Já existem vários caminhos ativos |

## Medindo
Deixe um ping contínuo e conte os pacotes perdidos durante a falha, com e sem BFD.

## Erros comuns
Temporizadores diferentes nas pontas, BFD muito agressivo causando oscilação, BFD sem o protocolo cliente configurado.

## O que costuma cair na prova

- Cálculo do tempo de detecção do BFD
- Etapas da convergência
- Papel do FRR/LFA e do graceful restart
