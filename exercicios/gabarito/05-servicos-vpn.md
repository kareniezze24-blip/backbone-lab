# Gabarito: Serviços: L2VPN e L3VPN

**1. B)** VPWS é ponto a ponto e VPLS multiponto

O pseudowire liga dois pontos; o VPLS emula um switch para vários.

**2. B)** Tornar o prefixo do cliente único dentro do BGP

O RD diferencia prefixos iguais de clientes diferentes.

**3. B)** Controlar a exportação e a importação de rotas entre VRFs

O RT é a etiqueta de importação/exportação.

**4. B)** MP-BGP (VPNv4)

MP-BGP com a família VPNv4.

**5. B)** Duas: transporte e serviço (VPN)

A de cima leva o pacote até o PE de saída; a de baixo identifica a VRF.

**6. B)** Split horizon: evita loops entre os PEs em malha completa

Com malha completa, repassar entre pseudowires criaria loops.

**7.** A associação de uma interface a uma VRF apaga o endereço IP. É preciso reaplicá-lo depois da associação.

Erro clássico: ordem inversa dos comandos.

**8.** Cada cliente tem sua VRF, com RD diferente. As rotas ficam em tabelas separadas.

**9.** vsi-id ou identificador do circuito diferente nas pontas; ausência de LDP remoto; MTU incompatível; VLAN não liberada.

**10.** L2VPN quando o cliente (ou a própria operadora) quer controlar o roteamento e levar quadros Ethernet, como transporte de VLANs de OLT. L3VPN quando a operadora entrega uma rede IP privada e roteia entre os sites do cliente.

