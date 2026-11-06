# Lab 8: Segurança de gerência e acesso

**Status:** a fazer

## Objetivo

Proteger o acesso aos equipamentos: acesso remoto seguro, controle de quem pode entrar, autenticação e filtros.

## Por que isso importa

A rede real usa lista de acesso para limitar quem faz SSH e SNMP. Um equipamento exposto é o caminho mais curto para um incidente.

## Pré-requisitos

- Labs 1 e 3 concluídos

## Passos e o porquê de cada um

| # | O que fazer | Por que fazer |
|---|---|---|
| 1 | Trocar o acesso remoto por SSH e desligar o Telnet | Telnet trafega senha em texto claro. |
| 2 | Criar usuários com níveis de privilégio | Nem todo mundo precisa de acesso total; o mínimo necessário limita danos. |
| 3 | Usar autenticação centralizada com fallback local | RADIUS ou TACACS+ centralizam o controle; o usuário local garante acesso se o servidor cair. |
| 4 | Restringir o acesso à linha de comando por lista de acesso | Só os IPs da gerência entram. É o controle mais eficaz. |
| 5 | Restringir SNMP e NTP por origem | Evita consulta e manipulação por quem não deveria. |
| 6 | Usar SNMPv3 ou ao menos comunidade não padrão | A comunidade v2c é praticamente uma senha de texto claro. |
| 7 | Revisar o que está aberto e o que está desligado | Serviço que não se usa fica desligado (por exemplo, o servidor web). |

## O que observar

- Acesso SSH funcionando a partir da origem permitida
- Acesso negado a partir de uma origem não permitida
- Telnet recusado

## Teste de falha

- Testar de uma origem fora da lista: deve ser bloqueada

## Parte de troubleshooting: erros para provocar

Provoque um erro por vez, observe o sintoma e raciocine antes de corrigir.

| Erro | Sintoma esperado | Como raciocinar |
|---|---|---|
| ACL que bloqueia a própria gerência | Perda de acesso | Revisar a ordem das regras e ter acesso de console |
| Regra permissiva antes da negação | ACL não bloqueia | Lembrar que a primeira regra que casa vale |
| Telnet liberado por exceção esquecida | Exposição de credenciais | Auditar as regras de permissão |

## Perguntas de reflexão

1. Por que a ordem das regras de uma ACL importa?
2. Qual a diferença entre RADIUS e TACACS+?

## O que costuma cair na prova

- ACL básica x avançada
- RADIUS (UDP 1812/1813) x TACACS+ (TCP 49)
- SSH (22) x Telnet (23)
- SNMPv2c x SNMPv3

## Checklist

- [ ] Passo 1
- [ ] Passo 2
- [ ] Passo 3
- [ ] Passo 4
- [ ] Passo 5
- [ ] Passo 6
- [ ] Passo 7
- [ ] Teste de falha feito
- [ ] Erros provocados e diagnosticados
- [ ] Perguntas respondidas por escrito
