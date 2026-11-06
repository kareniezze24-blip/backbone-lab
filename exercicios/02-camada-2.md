# Exercícios: Camada 2: VLAN, trunk, STP e LACP

Cobre o que se cobra de L2 e o que o dia a dia de acesso exige.

Gabarito em [`gabarito/02-camada-2.md`](gabarito/02-camada-2.md). Responda por escrito antes de consultar.

### 1. O que uma VLAN separa?

- a) Domínios de colisão
- b) Domínios de broadcast
- c) Redes de camada 3 automaticamente
- d) Zonas de segurança

### 2. Qual a faixa de VLANs utilizáveis no 802.1Q?

- a) 0 a 4095
- b) 1 a 4094
- c) 1 a 1005
- d) 1 a 2048

### 3. Qual o tamanho da tag 802.1Q?

- a) 2 bytes
- b) 4 bytes
- c) 6 bytes
- d) 8 bytes

### 4. Um quadro chega com MAC de destino desconhecido. O que o switch faz?

- a) Descarta
- b) Envia por todas as portas da VLAN, exceto a de entrada
- c) Responde com erro
- d) Envia só à porta do gateway

### 5. O que acontece quando a VLAN nativa é diferente nas duas pontas de um trunk?

- a) O trunk cai
- b) O tráfego sem tag cai em VLANs diferentes em cada lado
- c) Nada, é só informativo
- d) O STP bloqueia a porta

### 6. Como é eleita a root bridge do STP?

- a) Maior MAC
- b) Menor Bridge ID (prioridade, depois MAC)
- c) O switch com mais portas
- d) Aleatoriamente

### 7. Quais são os estados de porta no RSTP?

- a) Bloqueio, escuta, aprendizado, encaminhamento
- b) Descarte, aprendizado, encaminhamento
- c) Up, down, standby
- d) Raiz, designada, alternativa

### 8. Por que um loop de L2 é mais grave que um de L3?

- a) O quadro Ethernet não tem TTL e circula indefinidamente
- b) O L2 usa mais banda
- c) O L3 não tem broadcast
- d) O STP não existe em L3

### 9. Qual requisito é necessário para portas entrarem em um agregado LACP?

- a) Mesma velocidade e duplex, e modo compatível nas duas pontas
- b) Estarem em VLANs diferentes
- c) Terem IPs diferentes
- d) Serem do mesmo andar

### 10. Em um agregado de 2 cabos, um único fluxo (mesma origem e destino) usa:

- a) Os dois cabos ao mesmo tempo
- b) Um único cabo (por hash)
- c) O cabo menos usado em cada pacote
- d) Nenhum, o agregado é só redundância

### 11. O que o QinQ faz?

- a) Criptografa o quadro
- b) Adiciona uma segunda tag VLAN
- c) Remove a tag
- d) Aumenta a banda

### 12. Por que o Eth-Trunk entre dois switches não forma loop?

_Responda por escrito antes de ver o gabarito._

### 13. O que é uma Vlanif e quando ela fica ativa?

_Responda por escrito antes de ver o gabarito._

### 14. Cenário: o trunk está ativo, a Vlanif está ativa, mas o ping para o vizinho falha. A VLAN 200 deveria passar. Qual a causa provável?

_Responda por escrito antes de ver o gabarito._
