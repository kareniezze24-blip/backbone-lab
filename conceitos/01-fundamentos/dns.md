## O que é
Sistema hierárquico que traduz **nomes em endereços IP** (e o inverso). Usa **UDP e TCP porta 53**.

## Hierarquia
Raiz (`.`) → TLD (`.com`, `.br`) → domínio → hosts. Cada nível é gerenciado por servidores **autoritativos**.

## Quem faz o quê
| Papel | Função |
|---|---|
| Resolvedor recursivo | Recebe a pergunta do cliente e busca a resposta (e a guarda em cache) |
| Servidor autoritativo | Tem a resposta oficial da zona |
| Servidor raiz e TLD | Indicam para quem perguntar a seguir |

## Resolução em ordem
1. O cliente pergunta ao resolvedor (o do provedor, por exemplo).
2. Se não está em cache, o resolvedor consulta a raiz, depois o TLD, depois o autoritativo.
3. O resolvedor devolve a resposta e a guarda pelo **TTL** do registro.

## Registros principais
| Tipo | Função |
|---|---|
| A | Nome para IPv4 |
| AAAA | Nome para IPv6 |
| CNAME | Apelido para outro nome |
| MX | Servidor de e-mail do domínio |
| NS | Servidores autoritativos da zona |
| PTR | IP para nome (resolução reversa) |
| TXT | Texto livre (SPF, verificações) |
| SOA | Dados administrativos da zona |

## Na prática de provedor
- O DNS recursivo é crítico: se cai, o cliente "fica sem internet" mesmo com o link bom.
- É comum anunciar o IP do DNS por **BGP de vários pontos (anycast)**: o cliente é atendido pelo servidor mais próximo e há redundância automática.
- DNS usa **UDP**; respostas grandes e transferência de zona usam **TCP**.

## Ferramentas
`nslookup` e `dig` para consultar; observe o servidor consultado, o TTL e o código de resposta (NOERROR, NXDOMAIN, SERVFAIL).

## Erros comuns
Resolvedor inacessível, TTL alto atrasando uma mudança, registro PTR ausente, firewall bloqueando UDP ou TCP 53.

## O que costuma cair na prova

- Registros A, AAAA, CNAME, MX, NS, PTR
- Diferença entre recursivo e autoritativo
- Porta 53 em UDP e TCP
- Papel do TTL e do cache
