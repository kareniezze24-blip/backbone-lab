# Lab 2: Rotas estáticas fim a fim

**Status:** a fazer

## Objetivo

Fazer o tráfego chegar de uma ponta à outra do backbone usando só rotas escritas à mão, e entender por que isso não escala.

## Por que isso importa

Rota estática é o alicerce do roteamento e ainda é muito usada na borda com o cliente. Entender onde ela falha mostra por que existem protocolos dinâmicos.

## Pré-requisitos

- Lab 1 concluído (todos os vizinhos se enxergam)
- Leitura do conceito de rota, próximo salto e tabela de roteamento

## Passos e o porquê de cada um

| # | O que fazer | Por que fazer |
|---|---|---|
| 1 | Listar, para cada roteador, as redes que ele conhece sem configurar nada | Um roteador só conhece as redes diretamente ligadas a ele. Descobrir o que falta é o primeiro passo de qualquer diagnóstico. |
| 2 | Identificar as redes remotas que faltam em cada roteador | Sem rota, o pacote é descartado. Esse é o motivo do ping para a Loopback distante falhar no Lab 1. |
| 3 | Criar uma rota para cada rede remota apontando para o próximo salto, que é o vizinho direto | O próximo salto precisa ser alcançável em uma rede diretamente conectada, senão a rota não é usada. |
| 4 | Criar as rotas de volta | O roteamento é uma via de mão dupla. Ping que "vai e não volta" é o erro mais comum em rota estática. |
| 5 | Testar ida e volta entre as pontas | Confirma que cada salto sabe para onde enviar nos dois sentidos. |
| 6 | Criar uma rota padrão no equipamento da ponta | Cliente simples costuma ter só uma saída; a rota padrão resume "todo o resto vai por aqui". |
| 7 | Criar uma rota estática de backup com preferência pior (flutuante) | Só entra na tabela se a principal cair. Introduz a ideia de preferência entre rotas. |
| 8 | Contar quantas rotas foram necessárias e imaginar uma rede com 100 roteadores | Mostra o limite do modelo manual e prepara a motivação do OSPF. |

## O que observar

- Tabela de roteamento de cada roteador com as rotas estáticas marcadas como tal
- Ping de ponta a ponta funcionando nos dois sentidos
- A rota flutuante só aparece depois da queda da principal

## Teste de falha

- Derrubar o link do caminho principal: o tráfego para de passar, a menos que exista rota flutuante
- Com rota flutuante, observar a troca e o tempo que ela leva

## Parte de troubleshooting: erros para provocar

Provoque um erro por vez, observe o sintoma e raciocine antes de corrigir.

| Erro | Sintoma esperado | Como raciocinar |
|---|---|---|
| Próximo salto errado | Rota existe mas o tráfego não passa | Verificar se o próximo salto está em rede diretamente conectada |
| Falta a rota de volta | Ping de ida e sem resposta | Conferir se o destino sabe responder para a origem |
| Máscara errada na rota | Alguns destinos funcionam e outros não | Comparar o prefixo configurado com o necessário |
| Duas rotas estáticas formando loop | Pacotes expiram por TTL | Seguir o pacote salto a salto |

## Perguntas de reflexão

1. Por que o ping pode ir e não voltar?
2. Qual a diferença entre rota padrão e rota específica?
3. Qual rota o roteador escolhe quando há mais de uma que casa com o destino?

## O que costuma cair na prova

- Longest prefix match e preferência entre protocolos
- Rota estática, padrão e flutuante
- Leitura de tabela de roteamento
- Diagnóstico de problema de ida e volta

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
