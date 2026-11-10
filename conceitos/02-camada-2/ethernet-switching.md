## O quadro Ethernet

| Campo | Função |
|---|---|
| MAC de destino (6 bytes) | Quem deve receber |
| MAC de origem (6 bytes) | Quem enviou |
| EtherType (2 bytes) | O que vem dentro (0x0800 IPv4, 0x86DD IPv6, 0x8100 tag VLAN) |
| Dados (46 a 1500 bytes) | O pacote da camada 3 |
| FCS (4 bytes) | Verificação de erro |

O endereço **MAC** tem 48 bits; os 24 primeiros identificam o fabricante (OUI). Existem MACs de **unicast**, **multicast** e **broadcast** (`ff:ff:ff:ff:ff:ff`).

## Como o switch decide
O switch trabalha com **quatro ações** sobre cada quadro:

1. **Aprende**: grava o MAC de origem e a porta de entrada na tabela MAC.
2. **Encaminha**: se o MAC de destino está na tabela, envia só pela porta correta.
3. **Inunda (flooding)**: se o destino é desconhecido, broadcast ou multicast sem controle, envia por todas as portas da VLAN, menos a de entrada.
4. **Filtra**: se o destino está na mesma porta de origem, descarta.

As entradas **envelhecem** (tempo típico de 300 segundos) e saem da tabela.

## Domínios
| Domínio | Quem separa |
|---|---|
| Colisão | Cada porta de switch (em full duplex nem existe colisão) |
| Broadcast | VLAN ou roteador |

## Camada física
- **Full duplex** e negociação automática de velocidade; velocidade ou duplex divergentes causam erros e lentidão.
- Contadores úteis: **CRC/FCS errors**, runts, giants, drops. CRC alto costuma indicar fibra suja, cabo ruim ou transceiver defeituoso.
- **Jumbo frames** aumentam a MTU (por exemplo 9000 ou 12288) e são comuns em backbone MPLS.

## Erros comuns
Duplex divergente, tabela MAC instável (indica loop ou MAC duplicado), CRC subindo, flooding excessivo.

## O que costuma cair na prova

- Campos do quadro Ethernet e EtherTypes comuns
- As ações do switch: aprender, encaminhar, inundar, filtrar
- Tempo de envelhecimento da tabela MAC
- Domínio de colisão x domínio de broadcast
