# Exercícios: Roteamento: estático, OSPF, IS-IS e BGP

Estados do OSPF, custos, preferências e noções de BGP são perguntas recorrentes.

Gabarito em [`gabarito/03-roteamento.md`](gabarito/03-roteamento.md). Responda por escrito antes de consultar.

### 1. Qual a ordem dos estados de vizinhança do OSPF?

- a) Down, Init, 2-Way, ExStart, Exchange, Loading, Full
- b) Down, 2-Way, Init, Exchange, ExStart, Full, Loading
- c) Init, Down, 2-Way, Full, Loading, Exchange, ExStart
- d) Down, Init, ExStart, 2-Way, Loading, Exchange, Full

### 2. Quais os temporizadores hello/dead padrão do OSPF em redes broadcast e ponto a ponto?

- a) 5/20 s
- b) 10/40 s
- c) 30/120 s
- d) 15/60 s

### 3. Em qual tipo de rede há eleição de DR/BDR?

- a) Ponto a ponto
- b) Broadcast (multiacesso)
- c) Loopback
- d) Nenhuma

### 4. Qual LSA é gerado pelo ABR para resumir rotas entre áreas?

- a) Tipo 1
- b) Tipo 2
- c) Tipo 3
- d) Tipo 5

### 5. Por que ajustar a banda de referência do OSPF em backbones rápidos?

- a) Para aumentar a banda
- b) Porque com a referência padrão links de 1G e 100G ficam com o mesmo custo
- c) Para o OSPF usar menos CPU
- d) Para formar vizinhança

### 6. No padrão do VRP (Huawei), qual rota é preferida: OSPF interna ou estática?

- a) Estática, preferência 60
- b) OSPF interna, preferência 10
- c) Empatam
- d) Depende do custo

### 7. Duas rotas casam com o destino: 10.0.0.0/16 e 10.0.1.0/24. Qual é usada?

- a) A /16
- b) A /24
- c) A mais antiga
- d) Balanceia entre as duas

### 8. Vizinhos OSPF travados em ExStart ou Exchange. Causa clássica:

- a) Hello diferente
- b) MTU diferente nas interfaces
- c) Área diferente
- d) Router-id vazio

### 9. O que o BFD faz?

- a) Calcula custo
- b) Detecta falha de caminho em milissegundos
- c) Distribui labels
- d) Autentica rotas

### 10. Qual a regra do iBGP que exige malha completa ou route reflector?

- a) Rotas aprendidas de um peer iBGP não são repassadas a outro peer iBGP
- b) O iBGP não usa TCP
- c) O iBGP só funciona em uma área
- d) O iBGP não aceita rotas externas

### 11. Como o eBGP evita loops?

- a) Pelo TTL
- b) Pelo AS-path: rota que contém o próprio AS é descartada
- c) Pelo router-id
- d) Pelo MED

### 12. Entre MED e Local Preference no processo de decisão do BGP, qual vem antes?

- a) MED
- b) Local Preference
- c) Vêm juntos
- d) Nenhum dos dois

### 13. Cite três diferenças entre IS-IS e OSPF.

_Responda por escrito antes de ver o gabarito._

### 14. Cenário: com rotas estáticas, o ping sai da origem e não recebe resposta. O que verificar primeiro?

_Responda por escrito antes de ver o gabarito._
