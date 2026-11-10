# Backbone Lab

Site de estudo de redes de operadora, com três áreas:

| Aba | O que tem |
|---|---|
| **Conceitos** | 48 tópicos que um analista de rede precisa saber, em 10 módulos: fundamentos, camada 2, roteamento, MPLS, serviços de operadora, acesso (fibra, PON, OLT), QoS, segurança e operação |
| **Laboratórios** | 15 labs. Cada um traz o fundamento, a topologia interativa, o passo a passo com o porquê de cada etapa, erros para diagnosticar e perguntas de reflexão |
| **Exercícios** | Quiz por tema, simulado cronometrado, treino de sub-redes com calculadora, flashcards, cenários de diagnóstico e painel de desempenho |

Também tem busca no conteúdo, tema claro e escuro, e funciona no celular.
O seu progresso fica salvo no próprio navegador.

> Material de estudo. **Não coloque aqui configurações reais de produção**
> (senhas, hashes, comunidades SNMP, IPs públicos, nomes de clientes).

## Como publicar (GitHub Pages)

1. Envie todos os arquivos para a raiz do repositório (o `index.html` precisa ficar na raiz).
2. Em **Settings > Pages**, deixe a origem em *Deploy from a branch*, branch `main`, pasta `/ (root)`.
3. Mantenha o arquivo `.nojekyll` na raiz.
4. Abra `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/` e use **Ctrl+F5**.

O site não depende de nenhum serviço externo: as bibliotecas (markdown-it e Mermaid) já estão na pasta `assets/`.

## Testar no computador

O site carrega arquivos por `fetch`, então não funciona abrindo o `index.html` com duplo clique. Rode um servidor local:

```
python3 -m http.server 8000
```

e abra `http://localhost:8000`.

## Estrutura

```
index.html          página principal
assets/             estilo, código do site e bibliotecas
conceitos/          um arquivo .md por tópico (dá para editar direto no GitHub)
data/index.json     lista de módulos e tópicos, perguntas de fixação
data/labs.json      os laboratórios
data/quiz.json      as questões dos exercícios
data/decks.json     os flashcards
```

Os textos dos tópicos de **Conceitos** são arquivos Markdown e podem ser ajustados direto no GitHub.
Para incluir um tópico novo, é preciso registrá-lo também em `data/index.json`.
