## Configuração em execução x salva
- **Running configuration**: a que está valendo agora (perde-se no reinício se não for salva).
- **Saved configuration**: a gravada para o próximo boot.

Equipamentos de operadora também usam o modelo de **commit**: o que você digita só vale depois de confirmar.

## Backup
| Prática | Detalhe |
|---|---|
| **Automático e periódico** | O equipamento envia a configuração a um servidor (SFTP) em horário fixo |
| Antes de cada mudança | Para poder voltar |
| Fora do equipamento | Se ele queimar, a configuração está guardada |
| Retenção de versões | Para comparar o que mudou |

Prefira **SFTP/SCP** a TFTP/FTP, que não são seguros.

## Controle de versão
Guardar as configurações em um repositório (Git) permite ver **quem mudou o quê e quando** e voltar a versões antigas. **Remova senhas, hashes e comunidades** antes de guardar ou compartilhar.

## Gestão de mudanças
1. Planejar e documentar (objetivo, impacto, janela).
2. Ter **plano de retorno (rollback)**.
3. Fazer um passo por vez e validar.
4. Registrar o resultado.

## Padronização e automação
- **Templates** e configuração padrão ("golden config").
- Ferramentas como **Ansible** e bibliotecas como **Netmiko** e **NAPALM** automatizam tarefas repetitivas.
- **NETCONF** e **YANG** oferecem uma interface programática estruturada.
- Um **inventário** atualizado (equipamento, função, localização, IP, versão) evita muitos erros.

## Erros comuns
Salvar só no equipamento, não comparar antes e depois, senha em texto claro no repositório, mudança sem plano de retorno.

## O que costuma cair na prova

- Diferença entre configuração em execução e salva
- Backup automático por SFTP
- Plano de retorno
- Noções de automação (Ansible, NETCONF)
