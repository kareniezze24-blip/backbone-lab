# Gabarito: Roteamento: estático, OSPF, IS-IS e BGP

**1. A)** Down, Init, 2-Way, ExStart, Exchange, Loading, Full

É a sequência completa até Full.

**2. B)** 10/40 s

10 e 40 segundos. 30/120 é o padrão em redes NBMA.

**3. B)** Broadcast (multiacesso)

Em ponto a ponto não há eleição, o que acelera a adjacência.

**4. C)** Tipo 3

O LSA tipo 3 é o resumo entre áreas. O tipo 5 carrega rotas externas.

**5. B)** Porque com a referência padrão links de 1G e 100G ficam com o mesmo custo

O custo é referência dividida pela banda. Com referência baixa, links rápidos empatam.

**6. B)** OSPF interna, preferência 10

Menor preferência vence: OSPF 10 contra estática 60. Em outros fabricantes (como Cisco) a distância administrativa da estática é 1 e vence o OSPF (110). Confirme sempre no equipamento.

**7. B)** A /24

O roteador usa o prefixo mais longo (longest prefix match).

**8. B)** MTU diferente nas interfaces

MTU divergente impede a troca de descrições da base. Hello ou área diferentes impedem a vizinhança antes.

**9. B)** Detecta falha de caminho em milissegundos

Avisa o protocolo de roteamento da falha muito mais rápido que os temporizadores.

**10. A)** Rotas aprendidas de um peer iBGP não são repassadas a outro peer iBGP

É a regra anti-loop do iBGP.

**11. B)** Pelo AS-path: rota que contém o próprio AS é descartada

O AS-path registra os sistemas autônomos percorridos.

**12. B)** Local Preference

Local Preference (maior) é avaliada bem antes do MED (menor).

**13.** IS-IS roda diretamente sobre a camada 2 (não usa IP), usa endereço NET, e a fronteira entre áreas fica no link, não no roteador. Usa DIS em vez de DR/BDR e tem níveis 1 e 2.

Outras respostas válidas: extensibilidade por TLV e menos tipos de pacote.

**14.** Se o destino tem rota de volta para a origem.

Ping que vai e não volta é, na maioria dos casos, rota de retorno ausente.

