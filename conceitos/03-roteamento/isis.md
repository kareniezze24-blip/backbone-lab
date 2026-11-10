## O que é
Protocolo de roteamento de **estado de enlace** (como o OSPF), muito usado em **backbones de operadora**. Roda **diretamente sobre a camada 2**, sem usar IP para formar vizinhança.

## Endereço NET
Cada roteador tem um **NET** (Network Entity Title), como `49.0001.0000.0000.0001.00`:

| Parte | Significado |
|---|---|
| `49` | Formato do endereço (uso privado) |
| `0001` | **Área** |
| `0000.0000.0001` | **System ID** (6 bytes, único; costuma derivar da Loopback) |
| `00` | Seletor (sempre 00 em um roteador) |

## Níveis
| Nível | Função |
|---|---|
| **Level 1** | Roteamento dentro da área |
| **Level 2** | Roteamento entre áreas (o backbone) |
| **Level 1-2** | Liga as duas coisas |

A **fronteira de área fica no link**, e não no roteador (no OSPF, o ABR é um roteador).

## Funcionamento
- **Hello** forma adjacência; **LSPs** carregam a topologia; **CSNP/PSNP** sincronizam as bases.
- Em redes de acesso múltiplo elege-se um **DIS** (sem backup; a eleição é imediata e preemptiva). Em **ponto a ponto** não há DIS.
- Métrica **estreita** (6 bits, até 63 por interface) ou **ampla/wide** (24 bits). A ampla é necessária para redes grandes e para TE.

## Por que operadoras gostam
Escala bem, é extensível por **TLVs** (suporta IPv6 e TE na mesma instância) e não depende de IP para a vizinhança.

## Comparação com o OSPF
| | OSPF | IS-IS |
|---|---|---|
| Transporte | IP (protocolo 89) | Direto na camada 2 |
| Identificação | Router-ID (IP) | System ID / NET |
| Áreas | Fronteira no roteador (ABR) | Fronteira no link |
| Eleição | DR e BDR | DIS (sem backup) |

## Configuração em linhas gerais
```
isis 1
 network-entity 49.0001.0000.0000.0001.00
 is-level level-2
 cost-style wide
interface Ethernet1/0/2
 isis enable 1
 isis circuit-type p2p
```

## Erros comuns
Nível ou área incompatíveis, system-id duplicado, estilo de métrica estreito com TE, Loopback sem o IS-IS ativo.

## O que costuma cair na prova

- NET e system ID
- Níveis 1, 2 e 1-2
- IS-IS x OSPF: transporte, áreas, DIS x DR
- Métricas estreita e ampla
