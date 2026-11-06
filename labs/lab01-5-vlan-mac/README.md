# Lab 1.5: VLAN, trunk, access e tabela MAC

**Status:** a fazer

## Objetivo

Entender como um switch separa redes (VLAN), como carrega várias VLANs em um link (trunk) e como aprende endereços MAC.

## Por que isso importa

VLAN é a base de qualquer rede de acesso de provedor: cada serviço (gerência, internet, voz, TV) costuma viajar em uma VLAN. Leitura de tabela MAC e de trunk é pergunta certa em prova e dia a dia de suporte.

## Pré-requisitos

- Lab 1 concluído
- Um equipamento de teste em cada ponta (PC virtual ou roteador simples), para simular clientes
- Leitura de `docs/09-vlan-trunk-access-vlanif.md`

## Passos e o porquê de cada um

| # | O que fazer | Por que fazer |
|---|---|---|
| 1 | Planejar as VLANs por serviço (por exemplo: 100 gerência, 200 internet, 300 voz) | Separar serviços em VLANs isola domínios de broadcast e permite tratar cada serviço com política própria. |
| 2 | Criar as VLANs e dar descrição a cada uma | Em produção, VLAN sem descrição é dívida técnica: ninguém sabe para que serve em seis meses. |
| 3 | Liberar as VLANs necessárias no trunk | O trunk só carrega o que for liberado. VLAN não liberada é o erro número um de "não passa". |
| 4 | Ligar o equipamento de teste em uma porta access | Equipamento final não entende tag 802.1Q; a porta access coloca e tira a tag por ele. |
| 5 | Gerar tráfego entre dois equipamentos da mesma VLAN e observar a tabela MAC | É assim que o switch aprende: MAC de origem e porta de entrada. Ver isso acontecer fixa o conceito. |
| 6 | Testar comunicação entre VLANs diferentes | Deve falhar: prova o isolamento. Sem roteador no meio, VLANs diferentes não se falam. |
| 7 | Criar Vlanif para as VLANs e testar de novo | Um equipamento L3 com Vlanif roteia entre VLANs. Mostra o papel do gateway. |
| 8 | Alterar a VLAN nativa de um lado do trunk | Tráfego sem tag cai em VLANs diferentes nas duas pontas. É um erro sutil e comum. |

## O que observar

- MAC do equipamento de teste aparecendo na porta e VLAN corretas
- Mesma VLAN: comunicação OK. VLANs diferentes: sem comunicação até existir roteamento
- Após o ajuste de VLAN nativa, o tráfego sem tag vai parar na VLAN errada

## Teste de falha

- Remover uma VLAN do trunk e ver o serviço cair
- Desligar a porta access e ver a entrada MAC expirar depois do tempo de envelhecimento

## Parte de troubleshooting: erros para provocar

Provoque um erro por vez, observe o sintoma e raciocine antes de corrigir.

| Erro | Sintoma esperado | Como raciocinar |
|---|---|---|
| Access de um lado e trunk do outro | Quadros com e sem tag não se entendem | Comparar o tipo de porta e as VLANs de cada lado |
| VLAN nativa diferente | Tráfego cai na VLAN errada, sem erro visível | Verificar o PVID/VLAN nativa nos dois lados |
| VLAN criada mas não liberada no trunk | Porta ativa, serviço sem passar | Conferir a lista de VLANs permitidas no trunk |
| Equipamento de teste na VLAN errada | Sem comunicação com o vizinho esperado | Verificar a VLAN padrão (PVID) da porta access |

## Perguntas de reflexão

1. Por que um switch não precisa de IP para encaminhar quadros?
2. O que acontece com um quadro cujo MAC destino não está na tabela?
3. Qual a diferença entre VLAN nativa e VLAN permitida no trunk?

## O que costuma cair na prova

- 802.1Q: tag de 4 bytes e faixa de VLAN (1 a 4094)
- Access x trunk, VLAN nativa, QinQ
- Aprendizado de MAC, envelhecimento e flooding de unicast desconhecido
- Roteamento entre VLANs

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
