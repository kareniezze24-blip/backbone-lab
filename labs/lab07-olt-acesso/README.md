# Lab 7: OLT e rede de acesso

**Status:** a fazer

## Objetivo

Entender como a OLT entrega serviços de cliente (gerência, internet, voz, TR-069) em VLANs por um uplink agregado até o PE.

## Por que isso importa

É o seu ambiente de trabalho. Compreender o caminho da ONU ao PE e o papel de cada VLAN resolve a maior parte dos chamados de acesso.

## Pré-requisitos

- Labs 1 e 1.5 concluídos, e noções de PON (abaixo)
- CE12800 no papel de OLT, com um equipamento de teste simulando a ONU

## Passos e o porquê de cada um

| # | O que fazer | Por que fazer |
|---|---|---|
| 1 | Rever os conceitos de PON | A OLT fica no provedor, a fibra passa por divisores ópticos passivos e termina nas ONUs, na casa do cliente. A OLT é um equipamento de L2 para o tráfego do cliente. |
| 2 | Definir as VLANs de serviço: gerência, internet (PPPoE ou DHCP), voz, TR-069 | Cada serviço em uma VLAN permite tratamento e transporte independentes. |
| 3 | Montar o uplink da OLT como Eth-Trunk com trunk de VLANs | Mesmo padrão da rede real: LACP e trunk com a lista exata de VLANs. |
| 4 | Deixar o IP de gerência da OLT em uma VLAN dedicada | A OLT só tem IP para ser administrada; o tráfego do cliente passa por ela sem ser roteado. |
| 5 | Simular o cliente em uma porta de acesso | Representa a ONU; testa o caminho do serviço até o PE. |
| 6 | Aplicar QinQ em um caso de transporte | A segunda tag (da operadora) permite transportar várias VLANs de cliente sem conflito de numeração. |
| 7 | Levar a VLAN do serviço pelo backbone via L2VPN até um concentrador | Fecha o caminho real: cliente, OLT, PE, backbone, concentrador. |
| 8 | Entender onde cada serviço termina (BNG, servidor DHCP, servidor TR-069) | Saber onde o serviço termina é metade do diagnóstico. |

## O que observar

- Gerência da OLT acessível pelo IP da VLAN dedicada
- VLAN de serviço chegando ao outro lado do backbone
- Cliente simulado recebendo o serviço esperado

## Teste de falha

- Remover uma VLAN do trunk e ver qual serviço cai
- Desligar um cabo do uplink agregado e ver que nada cai

## Parte de troubleshooting: erros para provocar

Provoque um erro por vez, observe o sintoma e raciocine antes de corrigir.

| Erro | Sintoma esperado | Como raciocinar |
|---|---|---|
| VLAN de serviço não liberada no uplink | Cliente sem serviço, gerência normal | Comparar as VLANs permitidas em cada ponta |
| Gerência isolada por VLAN errada | OLT inacessível | Verificar a VLAN da gerência e o IP |
| MAC não aprendido | Sem tráfego de ida ou volta | Verificar a tabela MAC da VLAN do serviço |
| MTU baixa em PPPoE | Sites travam, ping pequeno funciona | Lembrar do overhead do PPPoE |

## Perguntas de reflexão

1. O que a OLT faz com o tráfego do cliente: roteia ou comuta?
2. Por que separar gerência, internet e TR-069 em VLANs?

## O que costuma cair na prova

- Arquitetura PON: OLT, ODN (divisores), ONU/ONT
- GPON: 2,5 G descida e 1,25 G subida; comprimentos de onda 1490 nm (descida) e 1310 nm (subida)
- PPPoE x IPoE e papel do BNG
- TR-069 (CWMP) para gerência remota de ONU

## Checklist

- [ ] Passo 1
- [ ] Passo 2
- [ ] Passo 3
- [ ] Passo 4
- [ ] Passo 5
- [ ] Passo 6
- [ ] Passo 7
- [ ] Passo 8
- [ ] Teste de falha feito
- [ ] Erros provocados e diagnosticados
- [ ] Perguntas respondidas por escrito
