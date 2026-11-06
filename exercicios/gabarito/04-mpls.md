# Gabarito: MPLS, LDP e engenharia de tráfego

**1. B)** Label 20, TC 3, S 1, TTL 8

20 bits de label, 3 de classe de tráfego, 1 de fundo de pilha e 8 de TTL.

**2. A)** UDP 646 para descoberta e TCP 646 para sessão

Descoberta por UDP 646 e sessão por TCP 646.

**3. B)** O penúltimo roteador

O penúltimo salto retira a label para poupar trabalho ao último.

**4. B)** Apenas comutar pacotes por label, sem conhecer clientes

O P só olha a label. Isso mantém o núcleo simples.

**5. C)** Protocolo IP 46

O RSVP usa o protocolo IP 46. O número 89 é do OSPF.

**6.** O LDP distribui labels seguindo o caminho do IGP, sem controle de rota nem reserva. O RSVP-TE sinaliza túneis com caminho explícito, reserva de banda e proteção.

O LDP é simples e automático; o RSVP-TE oferece engenharia de tráfego.

**7.** O hot-standby é um caminho já estabelecido e pronto para assumir na hora. O comum é calculado e montado só depois da falha, então é mais lento.

**8.** Espera um tempo depois que o caminho principal volta antes de retornar a ele, evitando vai e vem se o link estiver instável.

**9. B)** Evitar mandar tráfego por um link onde o IGP subiu mas o LDP ainda não

Evita o buraco negro enquanto não há labels.

**10. B)** 8

Cada label tem 4 bytes.

**11.** A Loopback do PE remoto (LSR-ID) não está alcançável pelo IGP, ou a sessão remota não foi configurada nas duas pontas.

O LDP remoto depende do roteamento até o IP do peer.

**12.** Porque a Loopback não depende de nenhum cabo e continua alcançável por qualquer caminho. Um IP de link sumiria se aquele link caísse.

