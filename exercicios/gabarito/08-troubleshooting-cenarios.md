# Gabarito: Cenários de troubleshooting

**1.** Modo LACP diferente nas pontas, velocidade ou duplex divergentes, porta desligada ou lado oposto não configurado.

Comece comparando o estado de cada porta membro dos dois lados.

**2.** Os hellos do vizinho chegam, mas o vizinho não vê os seus: problema de comunicação em um sentido (filtro, ACL, falha de enlace parcial).

Em Init, o equipamento recebeu hello do vizinho, mas seu próprio ID não aparece na lista do vizinho.

**3.** MTU. Teste com tamanhos crescentes e sem fragmentação para achar o limite.

Típico em MPLS, PPPoE e pseudowire, por causa do overhead.

**4.** TE e RSVP ativos nas interfaces de todos os saltos, informação de TE no IGP, saltos do explicit-path corretos, banda disponível e configuração do túnel confirmada.

**5.** A sessão LDP remota entre os PEs, a alcançabilidade da Loopback do peer, o identificador do circuito e a MTU.

**6.** Loop de L2 (círculo físico) sem STP ou sem agregação, causando tempestade de broadcast.

Solução: agregar os cabos (Eth-Trunk) ou habilitar o STP.

**7.** VLAN não liberada no trunk, VLAN/tag diferente entre as pontas, porta bloqueada pelo STP ou IP/máscara incorretos.

**8.** RT de exportação e importação não casam, família VPN não ativada no peer, rotas do cliente não redistribuídas no BGP da VRF.

**9.** Falta de sincronização NTP ou fuso incorreto. Configurar NTP com a Loopback como origem e conferir o fuso.

**10.** Sem BFD, o OSPF depende do dead interval (40 s no padrão). Com BFD, a detecção cai para centenas de milissegundos.

