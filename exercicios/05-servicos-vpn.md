# Exercícios: Serviços: L2VPN e L3VPN

Diferenças, componentes e erros clássicos.

Gabarito em [`gabarito/05-servicos-vpn.md`](gabarito/05-servicos-vpn.md). Responda por escrito antes de consultar.

### 1. VPWS e VPLS: qual a diferença?

- a) VPWS é multiponto e VPLS ponto a ponto
- b) VPWS é ponto a ponto e VPLS multiponto
- c) São iguais
- d) VPWS é de L3

### 2. Qual a função do RD na L3VPN?

- a) Controlar quem importa as rotas
- b) Tornar o prefixo do cliente único dentro do BGP
- c) Criptografar a rota
- d) Definir a label

### 3. Qual a função do RT?

- a) Tornar a rota única
- b) Controlar a exportação e a importação de rotas entre VRFs
- c) Calcular a banda
- d) Marcar o tráfego

### 4. Qual protocolo carrega as rotas de L3VPN entre PEs?

- a) OSPF
- b) MP-BGP (VPNv4)
- c) LDP
- d) RIP

### 5. Quantas labels há no pacote de uma L3VPN no backbone?

- a) Uma
- b) Duas: transporte e serviço (VPN)
- c) Três
- d) Nenhuma

### 6. Em VPLS, por que os PEs não repassam o que recebem de um pseudowire para outro?

- a) Para economizar banda
- b) Split horizon: evita loops entre os PEs em malha completa
- c) Porque o LDP proíbe
- d) Porque o MTU é pequeno

### 7. Cenário: após associar a interface do cliente à VRF, o IP dela sumiu. Por quê?

_Responda por escrito antes de ver o gabarito._

### 8. Dois clientes usam 192.168.0.0/24. Como a operadora os mantém separados?

_Responda por escrito antes de ver o gabarito._

### 9. Cenário: o pseudowire entre dois PEs não sobe. Cite duas causas.

_Responda por escrito antes de ver o gabarito._

### 10. Quando usar L2VPN e quando usar L3VPN?

_Responda por escrito antes de ver o gabarito._
