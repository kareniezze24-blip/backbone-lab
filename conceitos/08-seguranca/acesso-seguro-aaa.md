## Princípios
- **Menor privilégio**: cada pessoa só tem o acesso de que precisa.
- **Defesa em camadas**: autenticação, restrição por origem e registro.
- **Nada em texto claro**: SSH e HTTPS no lugar de Telnet e HTTP.

## AAA
| Letra | Função |
|---|---|
| **A**uthentication | Quem é você? |
| **A**uthorization | O que pode fazer? |
| **A**ccounting | O que fez? (registro) |

## RADIUS x TACACS+
| | RADIUS | TACACS+ |
|---|---|---|
| Transporte | UDP 1812 e 1813 | TCP 49 |
| Criptografia | Só a senha | O corpo inteiro |
| Autorização | Combinada com a autenticação | **Separada**, permite autorizar por comando |
| Uso típico | Acesso de usuários (PPPoE, Wi-Fi, 802.1X) | Administração de equipamentos |

Usa-se **autenticação centralizada** com **fallback local** (usuário no equipamento) para o caso de o servidor cair.

## Acesso remoto
- **SSH versão 2** com algoritmos fortes; Telnet desligado.
- **Níveis de privilégio** de 0 a 15 (o 15 tem acesso total).
- Restringir as **linhas VTY por ACL**, permitindo só os IPs da gerência.
- Console com senha; servidor web desligado quando não usado.

## Gerência fora de banda
Acesso pela porta MEth em rede separada continua funcionando quando o backbone falha.

## 802.1X (visão geral)
Autenticação de dispositivos na entrada da rede, com o equipamento de acesso consultando um servidor RADIUS.

## Erros comuns
Telnet habilitado, senha padrão, ACL que bloqueia a própria gerência, todos os usuários com privilégio 15, falta de registro (accounting).

## O que costuma cair na prova

- Significado de AAA
- RADIUS x TACACS+ (portas e criptografia)
- Restrição de acesso por ACL nas VTY
- SSH x Telnet
