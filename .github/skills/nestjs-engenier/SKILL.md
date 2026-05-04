---
name: nestjs-engenier
description: "Use when: criar ou refatorar módulos NestJS em api/, criar controllers/services/modules/schema/DTOs, manter Swagger/OpenAPI consistente com Orval, evoluir páginas Next.js App Router em app/, integrar frontend com endpoints gerados automaticamente, implementar fluxos autenticados e entregar features fullstack ponta‑a‑ponta mantendo contrato estável entre backend e frontend. Keywords: nest module, swagger, dto, controller, service, prisma, openapi, orval, nextjs, react, app router, scss, auth. Do not use when: ajustes puramente visuais isolados, refatorações internas sem impacto em API, mudanças exclusivamente no schema Prisma sem impacto em endpoints, tarefas infra/devops."
---

Você é responsável por garantir consistência entre schema Prisma, DTOs NestJS, OpenAPI e client Orval mantendo contrato estável entre backend e frontend neste workspace.

Ao implementar recursos fullstack ponta‑a‑ponta preservando convenções existentes do projeto.

---

# ORDEM OBRIGATÓRIA DE ALTERAÇÃO (SEMPRE SEGUIR)

1. schema / prisma relations (quando necessário)
2. service
3. DTOs
4. swagger decorators
5. module registration
6. gerar openapi.json
7. executar orval
8. implementar frontend

Nunca inverter essa ordem.

---

# BACKEND — API NestJS

## Escopo

Trabalhe dentro de:

api/src

Sempre seguir estrutura:

- \*.module.ts
- \*.controller.ts
- \*.service.ts
- \*.schema.ts
- pasta dtos/
- \*.swagger.ts

Ao criar módulo novo:

Registrar em:

api/src/app.module.ts

---

# CONVENÇÕES DA API

Controllers:

- usar @ApiTags(<Modulo>Swagger.tag)
- decorators centralizados em \*.swagger.ts

Swagger:

- usar applyDecorators
- centralizar ApiOperation
- centralizar ApiResponse
- centralizar ApiOkResponse

DTOs:

- sempre classes separadas
- documentar com ApiProperty
- validar com class-validator
- nunca reutilizar DTO incorretamente apenas por conveniência

Guards:

- definidos no controller
- usar @JwtGuardsDecorator()
- roles derivam de user_role Prisma

---

# REGRAS PRISMA

Alterações estruturais exigem:

- migration
- prisma generate

Enums:

- devem refletir roles utilizadas nos guards

Relations:

- respeitar naming existente
- evitar aliases novos sem padrão prévio

Sempre após alteração estrutural:

pnpm --dir api exec prisma generate

---

# STRATEGY DE ERROS BACKEND

Sempre:

- usar HttpException
- evitar throw string
- evitar formatos inconsistentes
- manter compatibilidade com getApiErrorMessage()

Responses devem ser previsíveis.

---

# BREAKING CHANGE DETECTION

Se alterar qualquer um dos itens abaixo:

- nome de campo
- tipo
- obrigatoriedade
- rota
- formato de response

Então obrigatoriamente:

executar orval

E informar impacto ao frontend.

---

# OPENAPI + ORVAL

OpenAPI:

api/openapi.json

Gerado via:

pnpm --dir api run orval

Nunca editar manualmente:

- openapi.json
- client.ts
- client.schemas.ts

Sempre regenerar.

---

# FRONTEND — NEXT.JS APP ROUTER

## Stack

Next.js 16
React 19
TypeScript
SCSS
CSS custom properties
Leaflet
react-leaflet

Fonts:

Sora
Manrope
IBM Plex Mono

---

# ESCOPO FRONTEND

Trabalhar dentro de:

app/src

Páginas:

app/src/app/<rota>/page.tsx

Componentes:

app/src/components/<feature>/

Hooks opcionais:

app/src/hooks/<feature>/

Schemas opcionais:

app/src/schemas/<feature>/

Alias:

@/_ → ./src/_

---

# CLIENT COMPONENT STRATEGY

Preferir Client Components quando houver:

- estado
- interação
- navegação

Caso contrário:

preferir Server Components

---

# AUTH FLOW

Rotas autenticadas:

usar AppLayout

Auth provider:

useAuth()

Disponibiliza:

- user
- isLoading
- login()
- register()
- logout()
- isAuthenticated

Token:

localStorage

Injetado automaticamente via:

axios.mutator.ts

Roles:

user?.role === "admin"

---

# CONSUMO DA API

Sempre importar de:

client.ts

Tipos importar de:

client.schemas.ts

O axios.mutator.ts já retorna res.data diretamente (não AxiosResponse).

---

# PADRÃO DE ERROS FRONTEND

Sempre usar:

getApiErrorMessage()

---

# PADRÃO DE DATA

Sempre:

toLocaleDateString("pt-BR")

---

# PADRÃO DE MODAIS

Controlados por:

boolean state

Exemplo:

showCreateModal
editEntity

---

# LOADING UI

Sempre usar:

.skeleton

---

# FEATURE STRUCTURE PATTERN

Organizar por domínio:

components/<feature>/
hooks/<feature>/
schemas/<feature>/

Evitar estrutura flat quando feature crescer.

---

# WORKFLOW FULLSTACK OBRIGATÓRIO

Antes de implementar:

- localizar módulo semelhante
- replicar padrão estrutural existente
- reutilizar DTO compatível

Depois:

Backend:

- schema
- DTO
- service
- controller
- swagger
- module

Registrar module se necessário

Executar:

pnpm --dir api run orval

Frontend:

- atualizar client-wrapper
- implementar páginas
- implementar componentes

Validar builds:

pnpm --dir api run build
pnpm --dir app run build

---

# CRITÉRIOS DE QUALIDADE

Sempre:

- preservar formato de resposta existente
- evitar duplicação de DTO
- manter naming consistente
- respeitar contrato OpenAPI

Se contrato mudar:

indicar:

- endpoints afetados
- DTOs impactados
- necessidade de rebuild frontend

---

# FORMATO DE SAÍDA

Sempre responder com:

1. resumo do recurso implementado
2. arquivos alterados API
3. arquivos alterados APP
4. execução de build
5. execução de orval
6. decisões de modelagem
7. pontos que exigem confirmação
