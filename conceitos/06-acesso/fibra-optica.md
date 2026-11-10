## Tipos de fibra
| | Monomodo (SMF) | Multimodo (MMF) |
|---|---|---|
| Núcleo | 9 µm | 50 ou 62,5 µm |
| Comprimentos de onda | 1310 e 1550 nm | 850 nm |
| Distância | Dezenas de km | Centenas de metros |
| Uso | Backbone, PON, longa distância | Datacenter, curta distância |

## Conectores e polimento
| Conector | Observação |
|---|---|
| **LC** | Pequeno, comum em transceivers |
| **SC** | Quadrado, comum em PON |
| **UPC** | Ponta polida reta (costuma ser azul) |
| **APC** | Ponta em ângulo de 8° (costuma ser verde); menor reflexão. **Não misture** APC com UPC |

## Transceivers
| Formato | Velocidade típica |
|---|---|
| SFP | 1 G |
| SFP+ | 10 G |
| SFP28 | 25 G |
| QSFP+ | 40 G |
| QSFP28 | 100 G |

O transceiver precisa ser do **tipo e alcance** certos para a fibra e o comprimento de onda.

## Potência e atenuação
A potência óptica é medida em **dBm**; a perda, em **dB**.

| Fonte de perda | Valor típico (consulte o fabricante) |
|---|---|
| Fibra monomodo em 1310 nm | cerca de 0,35 dB/km |
| Fibra monomodo em 1550 nm | cerca de 0,25 dB/km |
| Conector | 0,3 a 0,5 dB |
| Emenda por fusão | 0,05 a 0,1 dB |
| Splitter 1:2 / 1:4 / 1:8 / 1:16 / 1:32 / 1:64 | cerca de 3,5 / 7 / 10,5 / 13,5 / 17 / 21 dB |

**Orçamento de perda** = potência de transmissão − sensibilidade de recepção. A soma das perdas do enlace precisa caber nele, com margem.

Em GPON Classe B+, a ONU recebe tipicamente algo entre **−8 e −27 dBm**; abaixo da sensibilidade há erros e quedas, e acima do limite máximo há saturação. Confirme os valores no datasheet.

## Instrumentos
| Instrumento | Uso |
|---|---|
| **Power meter** | Mede a potência recebida |
| **OTDR** | Mapeia o enlace: distância e perda de emendas, conectores e rompimentos |
| **VFL** (caneta vermelha) | Localiza falhas visíveis e confere continuidade |
| Inspeção do conector | Verifica sujeira e dano |

## Limpeza
**Conector sujo é a causa número um** de problemas ópticos. Inspecione e limpe antes de acusar o equipamento, e nunca olhe para uma fibra ativa.

## Multiplexação
**CWDM** e **DWDM** transportam vários comprimentos de onda na mesma fibra, aumentando a capacidade do backbone (a rede real cita um caminho "via DWDM").

## Erros comuns
Conector sujo, curvatura excessiva, UPC com APC, transceiver errado, enlace sem orçamento de perda.

## O que costuma cair na prova

- Monomodo x multimodo e comprimentos de onda
- APC x UPC
- Cálculo simples de orçamento de perda
- Ferramentas: power meter, OTDR, VFL
