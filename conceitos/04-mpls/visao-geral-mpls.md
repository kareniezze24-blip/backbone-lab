## MPLS e labels

O PE de entrada cola uma label; os P só trocam a label; o PE de saída retira.

```mermaid
flowchart LR
    A["Cliente"] --> PE1["PE1<br/>coloca label"]
    PE1 --> P["P<br/>troca label"]
    P --> PE2["PE2<br/>retira label"]
    PE2 --> B["Cliente"]
```

| Termo | Significado |
|---|---|
| LSR-ID | Identificação do roteador no MPLS (a Loopback) |
| LDP | Protocolo que distribui labels entre vizinhos |
| LDP remoto | Sessão LDP com PE distante (`mpls ldp remote-peer`) |
| LSP | Caminho de labels entre dois PEs |

## MPLS-TE

| Conceito | Função |
|---|---|
| Túnel TE | LSP reservado de um PE a outro (destino = Loopback do PE remoto) |
| RSVP-TE | Sinaliza e reserva o túnel |
| Explicit-path | Lista de saltos obrigatórios |
| CSPF | Calcula o caminho com restrições (usa dados do OSPF com `mpls-te enable`) |
| Backup hot-standby | Segundo caminho já montado |
| Backup ordinary | Caminho montado só após a falha |
| WTR | Espera antes de voltar ao caminho principal (evita vaivém) |
| Auto-FRR | Desvio local imediato na falha |
| tunnel-policy | Amarra um serviço a um túnel TE específico |

## Pilha de labels de um serviço

```
[ label do TÚNEL ][ label do SERVIÇO ][ dados do cliente ]
```

## MTU

Cada label soma 4 bytes e o pseudowire soma cabeçalho: use jumbo frame no
backbone (`jumboframe enable`) e MTU maior nas interfaces de serviço.

## Dependência dos protocolos

```
IGP (Loopbacks alcançáveis) -> MPLS/LDP -> TE -> serviço
```

## O que costuma cair na prova

- Papéis de LER/PE e LSR/P
- Pilha de labels: transporte e serviço
- Dependência: IGP, MPLS/LDP, TE e serviço
- MTU e labels
