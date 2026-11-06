# Gabarito: Fundamentos e endereçamento IP

**1. B)** Rede (3)

O roteador usa o endereço IP, que é da camada de rede (3).

**2. B)** TCP 179

BGP usa TCP na porta 179. TCP 646 é o LDP e UDP 520 é o RIP.

**3. A)** Discover, Offer, Request, Acknowledge

DORA: Discover, Offer, Request, Acknowledge.

**4. B)** Resolver IP em MAC na rede local

O ARP descobre o MAC correspondente a um IP no mesmo segmento.

**5. B)** Evitar que o pacote circule para sempre em loop

O TTL cai 1 a cada roteador; ao chegar em 0 o pacote é descartado.

**6.** 30

/27 tem 2^5 = 32 endereços; menos rede e broadcast, sobram 30.

**7.** Rede 10.200.0.52, broadcast 10.200.0.55, usáveis .53 e .54

O bloco do /30 tem tamanho 4 e 52 é múltiplo de 4, então o bloco vai de .52 a .55.

**8.** Rede 192.168.10.64, broadcast 192.168.10.127, hosts .65 a .126

/26 tem blocos de 64. 77 está no bloco de 64 a 127.

**9.** /26

/26 oferece 62 usáveis. /27 oferece só 30.

**10. B)** Não, estão em redes diferentes (.4/30 e .8/30)

O .5 está no bloco .4 a .7 e o .10 no bloco .8 a .11. São redes distintas.

**11.** 172.16.0.0/26, 172.16.0.64/26, 172.16.0.128/26, 172.16.0.192/26

Quatro sub-redes exigem 2 bits a mais: /24 vira /26, com blocos de 64.

**12.** 10.0.0.0/22

Quatro blocos consecutivos de /24 se resumem em um /22.

**13.** 64

256 endereços divididos em blocos de 4.

**14. C)** 128 bits

IPv6 tem 128 bits.

**15.** A Loopback não liga a nenhum vizinho, então precisa de um único endereço. O link liga dois equipamentos que devem estar na mesma rede, e o /30 comporta exatamente dois.

A máscara descreve o tamanho da rede em que a interface está, e não quantos IPs o equipamento tem.

**16.** O switch L2 encaminha quadros por MAC dentro de uma VLAN. O switch L3 também roteia entre VLANs (Vlanif). O roteador decide por IP entre redes e suporta protocolos de roteamento e serviços de borda.

As fronteiras são funcionais: muitos equipamentos fazem mais de uma função.

