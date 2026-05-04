---
name: github-issue-plan
description: "Registra uma ideia como issue no GitHub com detalhes extras, sem planejamento excessivo"
argument-hint: "Descreva a ideia, o problema ou o objetivo; eu registro no GitHub com contexto adicional"
agent: "agent"
tools: [read, search, "github/*"]
---

Registre a ideia fornecida pelo usuário como uma issue no GitHub do repositório [libras-pregar/libras-pregar](https://github.com/libras-pregar/libras-pregar/issues).

## Objetivo

Receber uma ideia e registrá-la rapidamente como issue no GitHub, adicionando contexto e detalhes úteis sem transformar em planejamento técnico completo. O foco é **capturar a ideia**, não planejar a execução.

## Repositório alvo

- Repositório de issues: `libras-pregar/libras-pregar`
- Lista de issues: `https://github.com/libras-pregar/libras-pregar/issues`

Sempre crie as issues no repositório acima. Não crie branches, pull requests nem interaja com projetos.

## Regras gerais

- Registre a ideia de forma direta. Não transforme em épico nem planeje implementação detalhada.
- Faça suposições razoáveis quando o objetivo estiver claro.
- Se a ideia for muito vaga (ex.: "melhorar o app"), faça **poucas perguntas curtas** para entender o que o usuário quer. Não interrogue.
- Antes de criar, verifique se já existe issue aberta ou fechada muito parecida.
- Se houver issue relacionada, cite-a no corpo da nova issue.
- Não crie sub-issues. Mantenha tudo numa única issue simples.

## Labels

Aplique as labels que melhor descrevam a issue. As labels disponíveis no repositório são:

- `bug`: comportamento incorreto, regressão, erro funcional ou problema de confiabilidade
- `feature`: nova funcionalidade, melhoria de produto ou evolução relevante
- `database`: mudanças de schema, migrations ou queries
- `api`: trabalho no backend NestJS ou nos endpoints
- `app`: trabalho no frontend Next.js
- `doc`: documentação, comentários ou guias
- `infra`: infraestrutura, CI/CD, Docker, Kubernetes ou deploy
- `mobile`: comportamento ou layout específico para dispositivos móveis

Combine labels quando fizer sentido. Não invente labels fora dessa lista.

## Fluxo

1. Entender a ideia do usuário. Se estiver muito vaga, perguntar o mínimo necessário.
2. Procurar duplicatas ou issues relacionadas.
3. Escolher as labels adequadas.
4. Criar a issue com título claro e corpo conciso.
5. Responder com o link da issue e as labels aplicadas.

## Estrutura da issue

Mantenha o corpo simples e proporcional à ideia. Use no máximo estas seções, apenas as que fizerem sentido:

- `Ideia` — o que o usuário quer ou o problema que identificou
- `Contexto` — informação adicional útil (cenário atual, motivação, referências)
- `Detalhes` — qualquer detalhe extra relevante inferido da conversa ou do workspace

Não crie seções vazias. Uma ideia simples pode ter apenas um ou dois parágrafos no corpo.

## Qualidade do texto

- Escreva em português do Brasil.
- Linguagem objetiva e curta.
- Não infle o texto. Registre a essência da ideia com clareza.

## Saída final no chat

Depois de criar a issue, responda apenas com:

- link da issue
- labels aplicadas

## Exemplo de uso

`/github-issue-plan quero uma funcionalidade para usar o app offline`

`/github-issue-plan o fluxo de convites tá deixando entrar em congregação errada`
