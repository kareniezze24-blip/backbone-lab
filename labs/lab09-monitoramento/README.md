# Lab 9: Monitoramento, horário e backup

**Status:** a fazer

## Objetivo

Monitorar equipamentos (SNMP), registrar eventos (syslog), sincronizar horário (NTP) e proteger a configuração (backup automático).

## Por que isso importa

Ninguém opera uma rede sem enxergá-la. Alarmes, logs com horário correto e backup de configuração são o que permite descobrir o que mudou e reverter.

## Pré-requisitos

- Labs 1 e 8 concluídos
- Um servidor (Linux) no lab para receber logs e coletar SNMP

## Passos e o porquê de cada um

| # | O que fazer | Por que fazer |
|---|---|---|
| 1 | Sincronizar o horário por NTP e definir o fuso | Log com horário errado impede correlacionar eventos entre equipamentos. |
| 2 | Usar a Loopback como origem dos serviços de gerência | A Loopback não cai com um link; o servidor sempre vê o mesmo endereço do equipamento. |
| 3 | Configurar SNMP para consulta e envio de alarmes | É como o sistema de monitoramento sabe o estado das interfaces e do equipamento. |
| 4 | Enviar os logs a um servidor central | O log guardado só no equipamento some com o reinício ou o problema. |
| 5 | Ligar o backup periódico da configuração para um servidor | Se o equipamento queimar, a configuração está guardada. |
| 6 | Ler e interpretar um log de queda de interface e de sessão de protocolo | Saber ler a mensagem é o primeiro passo do diagnóstico. |
| 7 | Medir a utilização de uma interface | Capacidade é monitorada para prever saturação. |

## O que observar

- Servidor recebendo alarmes e logs
- Horário idêntico em todos os equipamentos
- Backup chegando ao servidor

## Teste de falha

- Derrubar uma interface e ver o alarme e o log chegarem ao servidor

## Parte de troubleshooting: erros para provocar

Provoque um erro por vez, observe o sintoma e raciocine antes de corrigir.

| Erro | Sintoma esperado | Como raciocinar |
|---|---|---|
| NTP não sincroniza | Horários divergentes nos logs | Verificar acesso ao servidor e restrições por ACL |
| ACL bloqueando SNMP do servidor | Monitoramento cego | Comparar origem do servidor e a regra |
| Backup falhando | Sem cópia recente | Verificar credenciais e caminho no servidor |

## Perguntas de reflexão

1. Por que usar a Loopback como origem dos serviços de gerência?
2. O que acontece se o relógio do equipamento estiver errado?

## O que costuma cair na prova

- SNMP (161/162), syslog (514), NTP (123)
- Traps x polling
- Gerência em banda x fora de banda
- Níveis de severidade de syslog

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
