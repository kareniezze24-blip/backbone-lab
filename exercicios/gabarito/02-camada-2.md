# Gabarito: Camada 2: VLAN, trunk, STP e LACP

**1. B)** Domínios de broadcast

Cada VLAN é um domínio de broadcast separado.

**2. B)** 1 a 4094

O campo tem 12 bits, mas 0 e 4095 são reservadas.

**3. B)** 4 bytes

A tag soma 4 bytes ao quadro.

**4. B)** Envia por todas as portas da VLAN, exceto a de entrada

É o flooding de unicast desconhecido.

**5. B)** O tráfego sem tag cai em VLANs diferentes em cada lado

Não há erro visível, mas o tráfego sem tag vai parar em VLANs diferentes.

**6. B)** Menor Bridge ID (prioridade, depois MAC)

Vence o menor Bridge ID. Por isso a prioridade deve ser definida em projeto.

**7. B)** Descarte, aprendizado, encaminhamento

O RSTP simplificou para descarte (discarding), aprendizado e encaminhamento. Raiz e designada são papéis, não estados.

**8. A)** O quadro Ethernet não tem TTL e circula indefinidamente

Sem prazo de validade, o quadro de broadcast se multiplica até travar a rede.

**9. A)** Mesma velocidade e duplex, e modo compatível nas duas pontas

Velocidade, duplex e modo precisam bater.

**10. B)** Um único cabo (por hash)

O hash define o cabo do fluxo. Vários fluxos diferentes se espalham.

**11. B)** Adiciona uma segunda tag VLAN

Adiciona a tag da operadora sobre a tag do cliente.

**12.** Porque os dois cabos são tratados como uma única interface lógica, então para o switch existe um só caminho.

Sem círculo de caminhos independentes, não há loop.

**13.** É a interface virtual com IP de uma VLAN. Fica ativa enquanto houver ao menos uma porta ativa na VLAN.

Por isso ela pode continuar ativa mesmo com um caminho específico caído.

**14.** A VLAN 200 não foi liberada no trunk (ou a tag/VLAN difere entre as pontas).

Interface ativa e ping falhando aponta para o caminho de VLAN, e não para o físico.

