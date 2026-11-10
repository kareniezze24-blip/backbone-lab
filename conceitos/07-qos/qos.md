## Para que serve
Em congestionamento, nem todo tráfego vale o mesmo: **voz** não tolera atraso, um **download** tolera. O QoS **trata cada classe de forma diferente**.

## Métricas
| Métrica | Impacto |
|---|---|
| Largura de banda | Capacidade |
| **Atraso** (latência) | Voz e jogos |
| **Jitter** | Variação do atraso; prejudica voz e vídeo |
| **Perda** | Degrada todas as aplicações |

## As quatro etapas
1. **Classificação**: identificar o tráfego (por ACL, VLAN, porta, marcação).
2. **Marcação**: gravar a classe no pacote.
3. **Enfileiramento e escalonamento**: decidir a ordem de saída.
4. **Policiamento ou modelagem**: limitar a taxa.

## Marcações
| Camada | Campo | Tamanho |
|---|---|---|
| L2 (VLAN) | **802.1p / PCP** | 3 bits (8 classes) |
| L3 (IP) | **DSCP** | 6 bits |
| MPLS | **TC** (antigo EXP) | 3 bits |

Valores usuais de DSCP: **EF (46)** para voz, **AF** (classes com precedência de descarte) para dados prioritários, **CS** (compatível com IP precedence) e **BE (0)** para o melhor esforço.

## Escalonamento
| Mecanismo | Característica |
|---|---|
| FIFO | Sem diferenciação |
| **PQ** | Fila de prioridade estrita |
| **WFQ / CBWFQ** | Divide por peso |
| **LLQ** | Prioridade para voz mais pesos para as demais |

**WRED** evita o congestionamento, descartando pacotes de forma gradual e por classe antes que a fila encha.

## Policiamento x modelagem
| | Policiamento (policing) | Modelagem (shaping) |
|---|---|---|
| Excesso | **Descarta** ou remarca | **Guarda no buffer** e envia depois |
| Efeito | Rajadas cortadas, sem atraso extra | Tráfego suavizado, com atraso |
| Onde | Entrada | Saída |

Ambos usam o modelo do **token bucket**, com **CIR** (taxa contratada) e tamanhos de rajada.

## Fronteira de confiança
Marcações vindas de clientes **não devem ser aceitas cegamente**: na borda, reclassifica-se o tráfego.

## No backbone e na PON
- Em MPLS, o TC leva a classe entre PEs (modos *uniform*, *pipe* e *short pipe* controlam a cópia).
- Na PON, a banda de subida por classe é regulada pelos **T-CONTs**.

## Erros comuns
Marcação perdida em um salto, fila de prioridade sem limite (afoga o resto), policiamento agressivo, QoS configurado só em uma ponta.

## O que costuma cair na prova

- Policing x shaping
- DSCP EF 46 e os campos de marcação (802.1p, DSCP, TC)
- Classificação, marcação, fila e limitação
- Jitter e latência para voz
