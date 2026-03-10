<div align="center">

<img src="public/logo-anubis.jpeg" alt="Anubis Tech" width="180" />

# ⚖️ Anubis Legal OS

### Sistema de Gestão Jurídica para Escritórios de Advocacia

[![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Prisma](https://img.shields.io/badge/Prisma-7.4-2D3748?style=flat-square&logo=prisma)](https://prisma.io)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-336791?style=flat-square&logo=postgresql)](https://neon.tech)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com)
[![LGPD](https://img.shields.io/badge/LGPD-Conformidade-22c55e?style=flat-square)](https://www.gov.br/anpd)
[![License](https://img.shields.io/badge/Licença-Proprietária-red?style=flat-square)](#licença)

**Plataforma SaaS multi-tenant para gestão completa de escritórios de advocacia.**

[🇧🇷 Português](#) · [🇺🇸 English](./README.en.md) · [🌐 Demo](#) · [📖 Docs](#instalação)

</div>

---

## 📋 Índice

- [Sobre](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Arquitetura](#arquitetura)
- [Instalação](#instalação)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Estrutura](#estrutura-do-projeto)
- [Deploy na Vercel](#deploy-na-vercel)
- [Roadmap](#roadmap)
- [Segurança](#segurança--conformidade)
- [Licença](#licença)
- [Contato](#contato)

---

## 🏛️ Sobre o Projeto

O **Anubis Legal OS** é um sistema SaaS de gestão jurídica desenvolvido pela **Anubis Tech**, criado para modernizar e digitalizar a operação de escritórios de advocacia de qualquer porte.

### 🎯 Problema que resolve

Escritórios de advocacia frequentemente dependem de planilhas desorganizadas, e-mails e sistemas legados para gerenciar centenas de processos, prazos fatais e clientes. O Anubis Legal OS centraliza tudo em uma plataforma moderna, intuitiva e segura — acessível de qualquer dispositivo.

### 💼 Modelo de Negócio

| Item | Valor |
|------|-------|
| Taxa de implantação | R$ 8.000 |
| Mensalidade por escritório | R$ 1.200/mês |
| Módulo IA Jurídica (em breve) | + R$ 400/mês |

> Arquitetura **multi-tenant**: um único sistema serve múltiplos escritórios com dados completamente isolados.

---

## ✨ Funcionalidades

### 🔐 Autenticação & Multi-tenant
- Acesso por slug único do escritório — `/login?org=nome-escritorio`
- Autenticação segura com NextAuth v4 + JWT
- Perfis de acesso: **Admin**, **Advogado** e **Assistente**
- Isolamento total de dados por organização
- Bloqueio de acesso por inadimplência com um comando SQL

### ⚖️ Gestão de Processos
- Cadastro completo com número, área, vara e tribunal
- Status: Em andamento · Aguardando decisão · Fase recursal · Encerrado
- Prioridades: Urgente · Alta · Média · Baixa
- Busca e filtros em tempo real

### ⏰ Controle de Prazos
- Urgência calculada automaticamente: **Hoje · Amanhã · X dias**
- Tipos: Ordinário, Fatal, Audiência, Diligência, Recurso
- Conclusão com checkbox e visual de risco (strikethrough)
- Alerta de prazos urgentes no dashboard

### 👥 Gestão de Clientes
- Suporte a Pessoa Física (CPF) e Jurídica (CNPJ)
- Busca em tempo real por nome, e-mail ou documento
- Histórico de processos vinculados por cliente

### 📄 Gestão de Documentos
- Upload com **drag & drop**
- Tipos: Petição, Procuração, Recurso, Contrato, Decisão
- Status: Rascunho · Em Revisão · Aprovado · Finalizado

### 💰 Financeiro
- Lançamento de horas com cálculo automático (horas × R$/h)
- Geração de faturas com numeração sequencial (FAT-001, FAT-002...)
- Dashboard financeiro com métricas em tempo real
- Controle de lançamentos faturáveis e não faturáveis

### 📊 Analytics & Dashboard
- Gráfico de crescimento de processos — Área e Barras
- Métricas: processos ativos, prazos urgentes, receita mensal
- Feed de atividades recentes

### 🔍 Busca Global
- Busca unificada no Topbar cobrindo processos, clientes, prazos e documentos
- Atalho **⌘K / Ctrl+K** de qualquer lugar
- Navegação por teclado ↑↓ · Enter · Esc

### 📱 Responsividade
- Layout totalmente adaptado para **desktop, tablet e celular**
- Menu hamburguer com drawer animado no mobile
- Footer glassmorphism fixo em todas as telas

---

## 🛠️ Tecnologias

| Categoria | Tecnologia | Versão |
|-----------|-----------|--------|
| Framework | Next.js App Router | 16.1.6 |
| Linguagem | TypeScript | 5.0 |
| ORM | Prisma | 7.4.2 |
| Banco de Dados | PostgreSQL via Neon | — |
| Autenticação | NextAuth.js | 4.24.11 |
| Estilização | Tailwind CSS | 4.0 |
| Gráficos | Recharts | 3.8 |
| Ícones | Lucide React | 0.577 |
| Deploy | Vercel | — |

---

## 🏗️ Arquitetura

```
┌──────────────────────────────────────────────────┐
│                    CLIENTE                        │
│          Next.js 16 · App Router · React          │
├──────────────────────────────────────────────────┤
│                 AUTENTICAÇÃO                      │
│         NextAuth v4 · JWT · Credenciais           │
├──────────────────────────────────────────────────┤
│                  MIDDLEWARE                       │
│     Proteção de rotas · Verificação de sessão     │
├──────────────────────────────────────────────────┤
│                API ROUTES                         │
│           Next.js · REST · Server Actions         │
├──────────────────────────────────────────────────┤
│                    ORM                            │
│            Prisma v7 · Neon Adapter               │
├──────────────────────────────────────────────────┤
│               BANCO DE DADOS                      │
│         PostgreSQL · Neon Serverless              │
└──────────────────────────────────────────────────┘
```

### Isolamento Multi-tenant

```
/login?org=escritorio-alpha  →  Organização A (dados 100% isolados)
/login?org=escritorio-beta   →  Organização B (dados 100% isolados)
```

Cada tabela possui `organizationId`. Toda query é filtrada por esse campo, garantindo que nenhum escritório acesse dados de outro.

---

## 🚀 Instalação

### Pré-requisitos

- **Node.js** 18 ou superior
- **npm** 9+
- Conta gratuita no [Neon](https://neon.tech) para o banco de dados

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/anubis-legal.git
cd anubis-legal

# 2. Instale as dependências
npm install --legacy-peer-deps

# 3. Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com suas credenciais do Neon e defina o AUTH_SECRET

# 4. Gere o cliente Prisma
npx prisma generate

# 5. Execute as migrations
npx prisma migrate deploy

# 6. Popule o banco com dados iniciais
node run-seed.js

# 7. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

### Credenciais de demonstração

```
URL:    http://localhost:3000/login?org=anubis-demo
Email:  admin@anubis.com
Senha:  admin123
```

> ⚠️ **Altere as credenciais padrão antes de ir para produção!**

---

## 🔧 Variáveis de Ambiente

Crie um arquivo `.env` na raiz com as seguintes variáveis:

```env
# Banco de dados (Neon PostgreSQL — obtenha em neon.tech)
DATABASE_URL="postgresql://user:password@host-pooler.neon.tech/dbname?sslmode=require&channel_binding=require"
DIRECT_URL="postgresql://user:password@host.neon.tech/dbname?sslmode=require&channel_binding=require"

# Autenticação (gere uma chave aleatória segura)
AUTH_SECRET="sua-chave-secreta-minimo-32-caracteres"
```

> 🔒 O arquivo `.env` já está no `.gitignore`. **Nunca o commite no Git.**

Para gerar um `AUTH_SECRET` seguro:
```bash
openssl rand -base64 32
```

---

## 📁 Estrutura do Projeto

```
anubis-legal/
├── prisma/
│   ├── schema.prisma          # Modelos do banco de dados
│   ├── migrations/            # Histórico de migrations
│   └── seed.ts                # Dados iniciais
├── public/
│   └── logo-anubis.jpeg       # Logo da marca
├── src/
│   ├── app/
│   │   ├── api/auth/          # API de autenticação (NextAuth)
│   │   ├── dashboard/         # Dashboard principal
│   │   ├── processos/         # Módulo de processos
│   │   ├── prazos/            # Módulo de prazos
│   │   ├── clientes/          # Módulo de clientes
│   │   ├── documentos/        # Módulo de documentos
│   │   ├── financeiro/        # Módulo financeiro
│   │   ├── analytics/         # Analytics e relatórios
│   │   ├── login/             # Página de autenticação
│   │   ├── privacidade/       # Política de privacidade (LGPD)
│   │   ├── termos/            # Termos de uso
│   │   ├── layout.tsx         # Layout raiz da aplicação
│   │   └── providers.tsx      # Providers globais (SessionProvider)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx    # Navegação lateral + menu mobile
│   │   │   ├── Topbar.tsx     # Barra superior + busca global
│   │   │   └── Footer.tsx     # Rodapé fixo glassmorphism
│   │   └── dashboard/
│   │       ├── StatsCards.tsx
│   │       ├── ProcessesChart.tsx
│   │       ├── UrgentAlert.tsx
│   │       ├── Deadlines.tsx
│   │       └── ActivityFeed.tsx
│   ├── lib/
│   │   ├── auth.ts            # Configuração NextAuth
│   │   └── prisma.ts          # Cliente Prisma singleton
│   ├── types/
│   │   └── next-auth.d.ts     # Extensão de tipos da sessão
│   └── middleware.ts          # Proteção de rotas autenticadas
├── prisma.config.ts           # Configuração Prisma v7
├── run-seed.js                # Script de seed (Node puro)
├── .env.example               # Exemplo de variáveis de ambiente
└── package.json
```

---

## 🌐 Deploy na Vercel

### Via GitHub (Recomendado)

1. Faça push do projeto para um repositório GitHub
2. Acesse [vercel.com](https://vercel.com) e clique em **"Add New Project"**
3. Importe o repositório do GitHub
4. Configure as variáveis de ambiente no painel da Vercel:
   - `DATABASE_URL`
   - `DIRECT_URL`
   - `AUTH_SECRET`
5. Clique em **Deploy**

### Via CLI

```bash
# Instale a CLI da Vercel
npm i -g vercel

# Autentique-se
vercel login

# Deploy de produção
vercel --prod
```

> ✅ O Next.js é otimizado nativamente para Vercel. Nenhuma configuração adicional é necessária.

---

## 🗺️ Roadmap

### MVP ✅
- [x] Autenticação multi-tenant com slug
- [x] Dashboard com métricas e gráficos
- [x] Módulo de Processos (CRUD + modais)
- [x] Módulo de Prazos com urgência automática
- [x] Módulo de Clientes (PF/PJ)
- [x] Módulo de Documentos com drag & drop
- [x] Módulo Financeiro (horas + faturas)
- [x] Busca global com atalho ⌘K
- [x] Responsividade mobile completa
- [x] Footer LGPD + Política de Privacidade + Termos de Uso

### Em Desenvolvimento 🔄
- [ ] Persistência de dados (CRUDs conectados ao banco)
- [ ] Painel Admin para gerenciar escritórios
- [ ] Deploy na Vercel

### Próximas Versões 🚀
- [ ] **IA Jurídica** — Resumo automático de processos
- [ ] **IA Jurídica** — Gerador de peças jurídicas
- [ ] **IA Jurídica** — Análise de risco do processo
- [ ] **IA Jurídica** — Extração de dados de PDFs
- [ ] **IA Jurídica** — Chatbot interno do escritório
- [ ] Notificações por e-mail (prazos urgentes)
- [ ] Relatórios em PDF
- [ ] App mobile (React Native)

---

## 🔒 Segurança & Conformidade

| Item | Status |
|------|--------|
| LGPD — Lei nº 13.709/2018 | ✅ Em conformidade |
| SSL/TLS — Criptografia em trânsito | ✅ Ativo |
| Bcrypt — Hash de senhas | ✅ Implementado |
| JWT — Sessões seguras | ✅ Implementado |
| Multi-tenant — Isolamento de dados | ✅ Implementado |
| RBAC — Controle por perfil de acesso | ✅ Implementado |
| Política de Privacidade | ✅ Publicada |
| Termos de Uso | ✅ Publicados |

---

## 📄 Licença

Este projeto é **proprietário e confidencial**.

© 2026 **Anubis Tech** · CNPJ: 42.804.763/0001-35 · Todos os direitos reservados.

É expressamente proibida a reprodução, distribuição, modificação ou uso deste software sem autorização prévia e por escrito da Anubis Tech.

---

## 📞 Contato

<div align="center">

**Anubis Tech**

[![Email](https://img.shields.io/badge/Email-fernandohugoferreira@gmail.com-C9A84C?style=flat-square&logo=gmail)](mailto:fernandohugoferreira@gmail.com)
[![Phone](https://img.shields.io/badge/Telefone-(11)_96210--4871-C9A84C?style=flat-square&logo=whatsapp)](tel:+5511962104871)
[![Instagram](https://img.shields.io/badge/Instagram-@anubis.tec-C9A84C?style=flat-square&logo=instagram)](https://www.instagram.com/anubis.tec?igsh=MTZyajRydWdzZTdmNg==)

---

*Desenvolvido com ❤️ pela **Anubis Tech***  
*⚖️ Tecnologia que transforma a prática jurídica*

</div>