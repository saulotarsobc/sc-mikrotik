---
name: github-issues-sync
description: "Sincroniza o resumo local de issues com as issues abertas e fechadas de libras-pregar/libras-pregar usando o MCP do GitHub"
argument-hint: "Opcional: informe outro arquivo-resumo; se vazio, usa issues.txt"
agent: "agent"
---

Sincronize o arquivo de resumo local de issues deste workspace com as issues do repositório [libras-pregar/libras-pregar](https://github.com/libras-pregar/libras-pregar/issues).

## Objetivo

Atualizar o arquivo-resumo local para refletir o estado atual das issues no GitHub, usando o MCP do GitHub como fonte de verdade.

## Arquivo alvo

- Se o usuário informar um caminho de arquivo no argumento, use esse arquivo.
- Se nenhum caminho for informado, use [issues.txt](../../issues.txt).

## Fonte obrigatória

- Use o MCP do GitHub para ler as issues.
- Repositório alvo: `libras-pregar/libras-pregar`.
- Considere apenas issues, não pull requests.
- Não use conteúdo manual do arquivo local como fonte de verdade para contagem ou estado.

## O que sincronizar

- Data da atualização no topo do arquivo
- Quantidade de issues abertas
- Quantidade de issues fechadas
- Lista de abertas
- Lista de fechadas

## Formato esperado no arquivo

Preserve este formato base:

```md
_Resumo das issues - Syntor ISP_
Atualizado em DD/MM/AAAA

🟡 _Abertas (N)_

- _#2_ Título da issue

✅ _Fechadas / concluídas (N)_

- _#1_ Título da issue
```

## Regras de sincronização

- Ordene as issues por número crescente dentro de cada seção.
- Adicione issues que existirem no GitHub e ainda não estiverem no arquivo.
- Remova ou mova issues que estiverem na seção errada no arquivo local.
- Atualize a contagem para refletir exatamente o GitHub.
- Prefira usar o título atual da issue no GitHub, sem reescrever nem resumir por conta própria.
- Preserve a estrutura, os emojis e o estilo geral do arquivo.
- Faça a menor edição possível no arquivo.

## Fluxo obrigatório

1. Identificar o arquivo alvo.
2. Ler o arquivo atual para preservar o formato.
3. Buscar issues abertas e fechadas no GitHub via MCP.
4. Atualizar o arquivo local com contagens, data e listas corretas.
5. Responder com um resumo curto do que mudou.

## Resposta final no chat

Depois de concluir, responda com:

- arquivo atualizado
- total de abertas
- total de fechadas
- observação curta se algum título foi ajustado para bater com o GitHub

## Exemplo de uso

`/github-issues-sync`

`/github-issues-sync issues.txt`
