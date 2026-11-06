# Exercícios: MPLS, LDP e engenharia de tráfego

Estrutura da label, papéis dos roteadores e proteção de túneis.

Gabarito em [`gabarito/04-mpls.md`](gabarito/04-mpls.md). Responda por escrito antes de consultar.

### 1. Como é composto o cabeçalho MPLS (32 bits)?

- a) Label 16, TC 4, S 4, TTL 8
- b) Label 20, TC 3, S 1, TTL 8
- c) Label 24, TTL 8
- d) Label 20, TC 4, TTL 8

### 2. Qual porta o LDP usa?

- a) UDP 646 para descoberta e TCP 646 para sessão
- b) TCP 179
- c) UDP 520
- d) UDP 3784

### 3. Quem retira a label no PHP (penultimate hop popping)?

- a) O PE de saída
- b) O penúltimo roteador
- c) O PE de entrada
- d) O roteador do cliente

### 4. Qual o papel do roteador P?

- a) Aplicar a política do cliente
- b) Apenas comutar pacotes por label, sem conhecer clientes
- c) Terminar o serviço
- d) Autenticar o usuário

### 5. RSVP-TE é transportado como:

- a) TCP 179
- b) UDP 646
- c) Protocolo IP 46
- d) Protocolo IP 89

### 6. Qual a diferença entre LDP e RSVP-TE?

_Responda por escrito antes de ver o gabarito._

### 7. Qual a diferença entre backup hot-standby e backup comum (ordinary)?

_Responda por escrito antes de ver o gabarito._

### 8. Para que serve o WTR?

_Responda por escrito antes de ver o gabarito._

### 9. Para que serve a sincronização entre IGP e LDP?

- a) Aumentar a banda
- b) Evitar mandar tráfego por um link onde o IGP subiu mas o LDP ainda não
- c) Autenticar o LDP
- d) Reduzir o MTU

### 10. Um pacote carrega duas labels. Quantos bytes o MPLS soma?

- a) 4
- b) 8
- c) 12
- d) 2

### 11. Cenário: sessões LDP entre vizinhos diretos estão ótimas, mas a sessão LDP remota com um PE distante não sobe. Qual a causa provável?

_Responda por escrito antes de ver o gabarito._

### 12. Por que o destino de um túnel TE é a Loopback do PE remoto e não o IP de um link?

_Responda por escrito antes de ver o gabarito._
