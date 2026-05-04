---
name: github-issue-get
description: "Busca uma issue pelo número e planeja a ação necessária para executá-la"
argument-hint: "Informe o número da issue (ex.: 42)"
agent: "Plan"
tools: [read, search, "github/*"]
---

Busque a issue indicada pelo usuário no repositório [libras-pregar/libras-pregar](https://github.com/libras-pregar/libras-pregar/issues) e planeje como executá-la.

## Repositório alvo

- Repositório de issues: `libras-pregar/libras-pregar`

## Fluxo

1. Ler a issue pelo número fornecido.
2. Apresentar um resumo claro do que a issue pede.
3. Analisar o workspace e o código relevante para entender o estado atual.
4. Propor um plano de ação objetivo com os passos necessários para resolver a issue.

## Regras

- Se a issue tiver sub-issues, leia-as também para ter o contexto completo.
- Se houver comentários relevantes na issue, considere-os no planejamento.
- O plano deve ser prático e direto — liste os arquivos e mudanças envolvidos.
- Não execute nada. Apenas leia, analise e planeje.
- Se algo na issue estiver ambíguo, aponte e sugira interpretação razoável.

## Saída esperada no chat

- Resumo da issue (título, labels, status)
- O que precisa ser feito
- Plano de ação com passos concretos e arquivos envolvidos
