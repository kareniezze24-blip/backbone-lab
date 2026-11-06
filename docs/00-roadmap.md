# Roadmap dos labs

Marque `[x]` conforme concluir.

## Fase 1: Fundação (L1, L2 e IP)
- [ ] **Lab 1**: Eth-Trunk, IPs de link, Loopback e gerência
- [ ] **Lab 1.9**: erros (máscara divergente, LACP diferente, porta Unselected)
- [ ] **Lab 1.5**: VLAN, access/trunk, tabela MAC
- [ ] **Lab 1.5.9**: erros de VLAN (trunk sem a VLAN liberada, native VLAN, loop)
- [ ] **Lab 1.6**: STP/RSTP

## Fase 2: Roteamento no core
- [ ] **Lab 2**: rotas estáticas fim a fim
- [ ] **Lab 2.9**: erros (next-hop errado, rota de volta esquecida)
- [ ] **Lab 3**: OSPF (p2p, BFD, ldp-sync)
- [ ] **Lab 3.9**: erros de OSPF
- [ ] **Lab 4**: IS-IS e comparação com OSPF

## Fase 3: MPLS e engenharia de tráfego
- [ ] **Lab 5**: MPLS + LDP
- [ ] **Lab 5.2**: LDP remoto
- [ ] **Lab 5.1**: MPLS-TE, explicit-path, backup hot-standby, tunnel-policy
- [ ] **Lab 5.9**: erros de MPLS/LDP/TE

## Fase 4: Serviços
- [ ] **Lab 6**: L2VPN (pseudowire e VPLS)
- [ ] **Lab 6.1**: L3VPN (VRF, RD/RT, MP-BGP)
- [ ] **Lab 6.9**: erros de serviço

## Fase 5: Acesso
- [ ] **Lab 7**: OLT, VLANs de serviço, QinQ, gerência
- [ ] **Lab 7.9**: erros de acesso

## Fase 6: Operação
- [ ] **Lab 8**: segurança (ACL, SSH, AAA)
- [ ] **Lab 9**: monitoramento (SNMP, syslog, NTP) e backup de config
- [ ] **Lab 10**: simulado com vários erros ao mesmo tempo

## Rotina de cada lab
1. Configurar. 2. Verificar com `display`. 3. Testar a falha (derrubar um link). 4. Quebrar de propósito e diagnosticar.

## Exercícios
Após cada lab, resolva o bloco correspondente em `exercicios/` e registre o desempenho na tabela do `exercicios/README.md`.
