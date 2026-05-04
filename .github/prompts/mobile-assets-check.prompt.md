---
description: "Verifica e sincroniza os assets de imagem do app mobile com o app.json do Expo"
argument-hint: "Opcional: caminho alternativo para o diretório de assets"
agent: "agent"
---

Faça a verificação e sincronização dos assets de imagem do app mobile Expo com o [app.json](../../mobile/app.json).

## Passos

1. **Listar arquivos existentes** em `mobile/assets/images/` (ou no caminho indicado como argumento).

2. **Visualizar cada imagem** para identificar:
   - Variantes de modo (light/dark/tinted)
   - Ícone adaptativo Android
   - Splash screens (light e dark)
   - Favicon / ícone geral

3. **Comparar** os caminhos referenciados no `app.json` com os arquivos reais encontrados:
   - `expo.icon`
   - `expo.ios.icon` (light, dark, tinted)
   - `expo.android.adaptiveIcon` (foregroundImage, backgroundImage, monochromeImage, backgroundColor)
   - `expo.web.favicon`
   - Plugin `expo-splash-screen` (image, dark.image e suas cores de fundo)

4. **Corrigir o `app.json`** para:
   - Remover referências a arquivos que não existem
   - Apontar para os arquivos corretos com base no conteúdo visual identificado
   - Configurar `userInterfaceStyle: "automatic"` se houver variantes dark disponíveis
   - Configurar splash screen dark com `dark.image` se existir variante escura
   - Configurar `ios.icon` com objeto `{ light, dark, tinted }` se as três variantes existirem

## Critérios de qualidade

- Nenhum caminho no `app.json` deve apontar para arquivo inexistente
- Variantes dark/tinted do iOS devem ser configuradas quando disponíveis
- O `backgroundColor` do adaptive icon Android deve combinar com o fundo real da imagem
