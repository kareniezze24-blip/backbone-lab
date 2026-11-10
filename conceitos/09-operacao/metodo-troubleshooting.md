## O processo
1. **Definir o problema**: o que falha, para quem, desde quando, o que mudou?
2. **Coletar informações**: estado das interfaces, logs, alarmes, testes simples.
3. **Formular hipóteses** (da mais provável e barata de testar para a menos).
4. **Testar** uma hipótese por vez.
5. **Corrigir** com uma mudança de cada vez e **validar**.
6. **Documentar**: causa, correção e como prevenir.

## Estratégias
| Estratégia | Quando usar |
|---|---|
| **De baixo para cima** (física, enlace, rede...) | Problema novo, sem pistas |
| De cima para baixo | Só uma aplicação falha |
| **Dividir para conquistar** | Testar no meio do caminho e descartar metade |
| **Comparar** com um equipamento que funciona | Configuração suspeita |
| Seguir o pacote salto a salto | Ping vai e não volta |

## Perguntas que resolvem muito
- **O que mudou?** (a maioria dos problemas nasce de uma mudança recente)
- **Funcionava antes?**
- **Afeta todos ou só alguns?** Todos aponta para o núcleo; alguns, para o acesso ou o cliente.
- **É constante ou intermitente?**

## Do sintoma à hipótese

| Sintoma | Hipóteses prováveis |
|---|---|
| Link down | Cabo, transceiver, porta desligada, potência óptica |
| Link up, sem ping local | VLAN, trunk, STP, agregação, IP e máscara |
| Ping vai, não volta | Rota de retorno, ACL, NAT |
| Ping pequeno funciona, grande não | MTU |
| Vizinho de protocolo não sobe | Parâmetros divergentes, ACL, MTU, autenticação |
| Instabilidade geral | Loop de L2, falha física intermitente, CPU alta |
| Lentidão em um único serviço | QoS, fila saturada, MTU/MSS |
| Só alguns clientes sem serviço | VLAN, ONU, perfil, autenticação |

## Comandos por camada
- **Física**: estado e contadores da interface, potência óptica.
- **L2**: tabela MAC, VLANs, agregação, STP.
- **L3**: tabela de roteamento, vizinhos, ARP, ping e traceroute.
- **Serviço**: sessões LDP, túneis, VSI/pseudowire, BGP.

## Boas práticas
Anote o que testou e descartou; **não mude várias coisas ao mesmo tempo**; tenha acesso de console antes de mexer na gerência; **escale** quando travar, com o que já foi testado.

## Relatório final
Sintoma, causa, correção, evidência e prevenção.

## O que costuma cair na prova

- Ordem do processo de troubleshooting
- Estratégias: de baixo para cima, dividir para conquistar
- Do sintoma à hipótese
- Por que mudar uma coisa de cada vez
