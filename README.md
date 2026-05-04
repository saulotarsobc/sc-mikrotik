# Mikrotik

## 🚨 Erro de TLS no RouterOS 7

Esse erro não é de usuário/senha — é falha no **handshake TLS**. Ou seja, o RouterOS não está conseguindo negociar SSL corretamente com o `curl`.

Pelo teu export, o problema mais provável é aqui:

```
/ip service
set api-ssl certificate=api-cert
```

Mas não aparece nenhuma configuração válida de certificado (CA, trusted, etc.). No RouterOS 7 isso é crítico.

---

### 🔍 Causas comuns desse erro

- Certificado não assinado corretamente
- Certificado sem **key usage** adequado
- Certificado não marcado como **trusted**
- API REST usa HTTPS (porta 443), não a API-SSL (8729)

👉 E tem um detalhe importante:
Você está acessando:

```txt
https://192.168.1.111/rest/system/resource
```

Isso usa o **REST API via www-ssl**, não o `api-ssl`.

---

### ✔️ Corrige assim (passo direto)

#### 1. Criar certificado corretamente

```bash
/certificate
add name=ca-template common-name=myCA key-usage=key-cert-sign,crl-sign
sign ca-template name=myCA

add name=server-template common-name=192.168.1.111 \
    subject-alt-name=IP:192.168.1.111 \
    key-usage=digital-signature,key-encipherment,tls-server
sign server-template ca=myCA name=server-cert
```

---

#### 2. Marcar como confiável

```bash
/certificate
set myCA trusted=yes
set server-cert trusted=yes
```

---

#### 3. Aplicar no HTTPS (REST API)

```bash
/ip service
set www-ssl certificate=server-cert disabled=no
```

---

#### 4. Testar de novo

```bash
curl -k -u admin:asdf1234 https://192.168.1.111/rest/system/resource
```

---

### ⚠️ Observação importante

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
