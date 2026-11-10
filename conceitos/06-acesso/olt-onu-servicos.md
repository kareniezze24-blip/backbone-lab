## A OLT na rede
A OLT é um equipamento **modular**: placas de controle, placas de serviço (GPON) e placas de **uplink**. Para o tráfego do cliente ela é um dispositivo de **camada 2**: ela **comuta** os quadros, não os roteia. O IP dela existe só para **gerência**.

## Caminho do serviço

```mermaid
flowchart LR
    C["Cliente"] --- ONU["ONU"]
    ONU -->|fibra PON| OLT["OLT"]
    OLT -->|"Eth-Trunk<br/>VLANs de serviço"| PE["PE (switch/roteador)"]
    PE -->|"VPLS / pseudowire<br/>pelo backbone"| BNG["BNG / concentrador"]
    BNG --> NET["Internet"]
```

## Modelo de VLANs
Cada serviço viaja em uma **VLAN própria**:

| Serviço | Exemplo |
|---|---|
| Gerência da OLT | VLAN de gerência em banda |
| Internet (PPPoE ou IPoE) | VLAN do concentrador |
| DHCP de equipamentos | VLAN própria |
| TR-069 | VLAN de gerência das ONUs |
| Voz e IPTV | VLANs com prioridade e multicast |

Estratégias de VLAN no acesso:
| Modelo | Funcionamento |
|---|---|
| **N:1** | Todos os clientes de um serviço usam a mesma VLAN |
| **1:1** | Cada cliente tem a sua VLAN |
| **QinQ** | VLAN de operadora (S-VLAN) sobre a do cliente (C-VLAN) |

## Perfis e mapeamento (Huawei)
Em OLTs Huawei, o provisionamento usa **perfis de linha e de serviço** da ONU e **service-ports**, que mapeiam a conexão GEM da ONU para uma VLAN no uplink.

## Uplink
- **Eth-Trunk** (LACP) com a lista exata de VLANs permitidas.
- Do PE para frente, as VLANs viajam por **L2VPN** (VPLS ou pseudowire) até o concentrador.

## ONU: ponte ou roteador
| Modo | Funcionamento |
|---|---|
| **Bridge** | A ONU apenas converte fibra em Ethernet; o roteador do cliente cuida do resto |
| **Router** | A ONU faz a conexão (PPPoE/DHCP), NAT e Wi-Fi |

## Gerência da ONU
Pelo **OMCI** (da OLT) e/ou por **TR-069** (de um servidor ACS).

## Diagnóstico por camadas
1. **ONU sincronizada?** (óptico)
2. **VLAN do serviço está no service-port e no uplink?**
3. **A VLAN chega ao PE e atravessa o backbone?**
4. **O concentrador autentica e entrega IP?**

## Erros comuns
VLAN de serviço não liberada no uplink, service-port com VLAN errada, gerência da OLT isolada, MTU baixa para PPPoE, ONU não autorizada.

## O que costuma cair na prova

- A OLT comuta em L2, não roteia
- Modelos de VLAN N:1, 1:1 e QinQ
- Caminho do serviço: ONU, OLT, PE, backbone, BNG
- Perfis e service-port
