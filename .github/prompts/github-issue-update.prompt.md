---
name: github-issue-update
description: "Atualiza o status de uma issue do repositório libras-pregar/libras-pregar e fecha a issue quando apropriado"
argument-hint: "Informe o número ou link da issue e o status desejado: Todo, In Progress ou Done; diga também se deve fechar"
agent: "agent"
tools: [read, search, "github/*"]
---

Atualize uma issue já existente em [libras-pregar/libras-pregar](https://github.com/libras-pregar/libras-pregar/issues)

## Repositório e projeto alvo

- Repositório de issues: `libras-pregar/libras-pregar`
- Lista de issues: `https://github.com/libras-pregar/libras-pregar/issues`

## Status válidos

- `Todo`
- `In Progress`
- `Done`

## Regras de fechamento

- Se o usuário pedir para fechar a issue, feche.
- Se o status pedido for `Done` e não houver instrução contrária, feche a issue.
- Se o status pedido for `Todo` ou `In Progress`, mantenha a issue aberta.
- Nunca feche a issue silenciosamente sem informar isso na resposta final.

## Fluxo obrigatório

1. Identificar a issue pelo número ou link fornecido.
2. Ler a issue atual para evitar atualizar o item errado.
3. Se útil, adicionar comentário curto registrando a transição ou o motivo do fechamento.
4. Responder com um resumo objetivo do que foi atualizado e do que não pôde ser atualizado por limitação de ferramenta.

## Segurança operacional

- Não altere título ou corpo da issue a menos que o usuário peça.
- Não feche múltiplas issues quando o usuário tiver indicado apenas uma.
- Se houver ambiguidade entre dois números de issue possíveis, peça esclarecimento.

## Saída final esperada no chat

Depois de concluir, responda com:

- link da issue atualizada
- status pretendido
- estado final da issue (`open` ou `closed`)
- comentário curto sobre qualquer ação adicional executada

## Exemplos de uso

`/update-issue-status #10 Done fechar`

`/update-issue-status issue 23 para In Progress`

`/update-issue-status https://github.com/libras-pregar/libras-pregar/issues/11 Todo`
