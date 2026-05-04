# sc-mikrotik

Cliente TypeScript para a API REST do MikroTik RouterOS.

## Instalação

```bash
npm install sc-mikrotik
```

## Uso

```ts
import { Mikrotik } from "sc-mikrotik";

const client = new Mikrotik({
  baseUrl: "https://192.168.1.111/rest",
  username: "admin",
  password: "asdf1234",
  insecure: true,
});

const systemResource = await client.getSystemResource();
const systemIdentity = await client.getSystemIdentity();
const ipAddress = await client.getIpAddress();
```

## Scripts

```bash
npm run build
npm run check:package
```

## Publicação no npm via GitHub Actions

O repositório já fica preparado para publicar no npm pelo workflow em `.github/workflows/publish.yml`.

### Pré-requisitos

```txt
1. Criar o secret NPM_TOKEN no repositório GitHub
2. Garantir que o nome do pacote em package.json esteja disponível no npm
3. Atualizar a versão em package.json antes de cada release
```

### Como publicar

```txt
1. Commitar e enviar as mudanças para a branch principal
2. Criar uma GitHub Release publicada
3. O GitHub Actions executa npm ci, npm run build e npm publish --provenance
```

Também é possível disparar o workflow manualmente pela aba Actions.

- `api-ssl` (porta 8729) → usado por bibliotecas MikroTik
- `www-ssl` (porta 443) → usado pelo REST (`/rest/...`)

Você está usando REST → então o certificado precisa estar no **www-ssl**, não só no `api-ssl`.

---

### 💡 Se ainda der erro

Tenta forçar TLS 1.2 no curl (Windows às vezes dá bug com TLS):

```bash
curl --tlsv1.2 -k -u admin:asdf1234 https://192.168.1.111/rest/system/resource
```

---
