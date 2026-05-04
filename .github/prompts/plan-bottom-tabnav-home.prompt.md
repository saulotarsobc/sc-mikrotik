## Plan: Bottom tab nav + Home page (mobile)

Substituir, **somente no mobile**, o `Drawer` lateral atual por uma **bottom tab bar fixa com 5 slots** (ícone central destacado tipo FAB) e criar uma página **Início** mais útil. Sidebar do desktop permanece intocada.

**Tabs (admin)**

| Slot | Item                                       | Rota                                               | Roles            |
| ---- | ------------------------------------------ | -------------------------------------------------- | ---------------- |
| 1    | Territórios                                | `/territorios`                                     | admin, conductor |
| 2    | Designações                                | `/designacoes` (publisher → `/minhas-designacoes`) | todos            |
| 3    | **Início** (centro, FAB)                   | `/inicio`                                          | todos            |
| 4    | Gestão (hub Usuários/Convites/Congregação) | `/gestao`                                          | admin            |
| 5    | Mais (perfil/config/logout)                | `/mais`                                            | todos            |

Conductor mostra 4 tabs (sem Gestão); publisher mostra 3 (sem Territórios e Gestão) — bar centraliza Início dinamicamente.

**Steps**

1. **Phase 1 — Navegação**
   - 1.1 Adicionar `getMobileTabs(role)` em app/src/components/layout/navItems.tsx (mantém `getNavItems` para sidebar desktop intocado).
   - 1.2 Criar app/src/components/layout/BottomTabBar.tsx — `AppShell.Footer` (height 64, `collapsed: { desktop: true }`), item central elevado com `marginTop: -16` + shadow, `usePathname()` para ativo, safe-area iOS.
   - 1.3 Atualizar app/src/components/layout/AppLayout.tsx: adicionar `footer={...}`, fixar `navbar.collapsed.mobile = true`, remover state `navOpened`, remover `MobileNav`. Branch `noNav` não renderiza footer.
   - 1.4 Excluir app/src/components/layout/MobileNav.tsx.
2. **Phase 2 — Página Início** (depende de Phase 1 para rota `/inicio` existir, mas pode ser feita em paralelo)
   - 2.1 Criar app/src/app/inicio/page.tsx: header (saudação + congregação + `OfflineIndicator`), KPIs para admin/conductor (territórios via `reportsControllerMaps`, designações ativas via `designationsControllerList`), card "Minhas designações" para todos via `designationsControllerListMine`, atalhos rápidos.
   - 2.2 Atualizar `destinationFor()` em app/src/app/page.tsx → `/inicio` para todos roles.
3. **Phase 3 — Hubs** (paralelo a Phase 2)
   - 3.1 app/src/app/gestao/page.tsx — 3 cards de navegação (admin only, redirect senão).
   - 3.2 app/src/app/mais/page.tsx — perfil header + lista estilo settings + logout.

**Verification**

1. `cd app && pnpm lint` e `pnpm build` sem erros.
2. Mobile (390×844): bar visível em todas rotas exceto `noNav` (ex.: mapa fullscreen), centro destacado leva a `/inicio`, item ativo correto.
3. Desktop (≥ sm): sidebar preservada, bottom bar oculta.
4. Login publisher → `/inicio` sem KPIs admin; login admin → KPIs visíveis.
5. `/gestao` redireciona não-admin; `/mais` logout funciona.
6. Safe-area iOS respeitada (DevTools com inset).

**Decisions**

- Escopo: somente mobile.
- `/designacoes` e `/minhas-designacoes` permanecem rotas separadas; tab "Designações" abre a apropriada por role.
- `MobileNav` (drawer + FAB) removido — sem hambúrguer no mobile.
- Sidebar desktop continua expondo os 7 itens individuais.

**Further considerations**

1. **Tabs "Todas/Minhas" dentro de `/designacoes`** para admin/conductor. Recomendação: **adiar para PR futuro**. (A) Adiar / (B) Incluir agora.
2. **KPI "designações concluídas no mês"** — sem endpoint agregado. Recomendação: **omitir no MVP**. (A) Omitir / (B) Filtrar no client (custo) / (C) Criar endpoint `/reports/designations` no backend.
3. **Restauração de scroll por tab** — App Router não preserva por padrão. Recomendação: aceitar padrão. (A) Aceitar / (B) `ScrollRestoration` custom.
