## O que o roteador faz
Recebe um pacote, consulta a **tabela de roteamento** e o envia ao **próximo salto** correto.

## De onde vêm as rotas
| Origem | Exemplo |
|---|---|
| Diretamente conectada | Redes das interfaces |
| **Estática** | Configurada à mão |
| **Dinâmica** | Aprendida por OSPF, IS-IS, BGP |

## Como o roteador escolhe
1. **Prefixo mais longo** (longest prefix match): entre `10.0.0.0/16` e `10.0.1.0/24`, vence a /24 para o destino `10.0.1.5`.
2. Se houver o mesmo prefixo de protocolos diferentes, vence a menor **preferência** (distância administrativa).
3. Entre rotas do mesmo protocolo, vence a menor **métrica**.

## Preferência por protocolo
Os valores variam por fabricante (veja a tabela em [Portas e protocolos](#/conceitos/10-referencias/portas-e-protocolos)). No padrão da Huawei: direta 0, OSPF 10, IS-IS 15, estática 60, RIP 100. Na Cisco: estática 1, OSPF 110.

## Rotas estáticas
```
ip route-static 10.2.0.0 255.255.255.0 10.200.0.6
```
- O **próximo salto** precisa ser alcançável em uma rede diretamente conectada.
- **Rota padrão** (`0.0.0.0/0`): "para qualquer destino desconhecido, vá por aqui".
- **Rota flutuante**: estática com preferência pior, usada só quando a principal cai.

## Famílias de protocolos
| Tipo | Funcionamento | Exemplos |
|---|---|---|
| Vetor de distância | Troca tabelas com vizinhos | RIP |
| **Estado de enlace** | Cada roteador conhece a topologia e calcula o caminho | OSPF, IS-IS |
| **Vetor de caminho** | Anuncia caminhos entre sistemas autônomos | BGP |

**IGP** (dentro do sistema autônomo): OSPF, IS-IS. **EGP** (entre sistemas autônomos): BGP.

## Balanceamento (ECMP)
Caminhos de **mesmo custo** podem ser usados em conjunto.

## Convergência
É o tempo para a rede voltar ao normal após uma mudança: **detectar**, **propagar**, **recalcular**, **instalar**.

## Erros comuns
Próximo salto errado, **falta a rota de volta** (ping vai e não volta), máscara errada na rota, dois protocolos disputando a mesma rede sem planejamento.

## O que costuma cair na prova

- Longest prefix match
- Preferência entre protocolos e métrica
- Rota estática, padrão e flutuante
- IGP x EGP; vetor de distância x estado de enlace
