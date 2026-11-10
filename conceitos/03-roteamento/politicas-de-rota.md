## Para que servem
Controlar **o que se anuncia, o que se aceita e como se prefere** cada rota: filtrar, alterar atributos e redistribuir com segurança.

## Ferramentas
| Ferramenta | Casa com |
|---|---|
| **ACL básica** | Origem do prefixo |
| **Prefix-list** (`ip ip-prefix`) | Prefixo e tamanho de máscara |
| **AS-path filter** | Caminho de ASs |
| **Community filter** | Marcações |
| **Route-policy** | Combina as anteriores e **altera atributos** |

## Prefix-list
```
ip ip-prefix DNS-ANUNCIOS index 10 permit 10.111.111.10 32
ip ip-prefix DEFAULT-ROUTE index 10 permit 0.0.0.0 0
ip ip-prefix MINHA-REDE index 10 permit 10.0.0.0 8 greater-equal 24 less-equal 32
```
`greater-equal` e `less-equal` definem a faixa de tamanhos de máscara aceitos.

## Route-policy
```
route-policy DNS-ANY_IN permit node 10
 if-match ip-prefix DNS-ANUNCIOS
 apply local-preference 200
```
- Os **nodes** são avaliados em ordem; cada um tem `if-match` (condição) e `apply` (ação).
- Rota que não casa com nenhum node é **rejeitada** (negação implícita no fim).

## Onde se aplica
Entrada e saída de sessões BGP, redistribuição entre protocolos (por exemplo BGP para OSPF, como no anúncio de DNS), filtro de rotas do cliente.

## Boas práticas
- **Sempre** filtrar o que se recebe de clientes e de outros ASs.
- Limitar o número de prefixos por peer (`max-prefix`).
- Nunca anunciar rotas aprendidas de um provedor para outro (evitar virar trânsito).

## Erros comuns
Negação implícita derrubando rotas legítimas, `ge/le` mal calculados, política aplicada na direção errada (import x export).

## O que costuma cair na prova

- Prefix-list com ge e le
- Estrutura de nodes da route-policy e negação implícita
- Direção import x export
- Boas práticas de filtro com clientes e provedores
