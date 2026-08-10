# Projeto — ISW-033 (nome do time aqui)

> Substitua este README pelo README real do projeto assim que o time definir o produto,
> na Semana 2. Até lá, ele documenta apenas o ambiente.

## Equipe

| Nome | Papel inicial |
|---|---|
| | Tech Lead |
| | Quality Owner |
| | DevOps Owner |
| | UX Owner |

## Ambiente

Pré-requisitos: Node.js (versão em `.nvmrc`), Git, Docker.

```bash
nvm use            # usa a versao fixada em .nvmrc
npm install
npm run doctor      # confirma que o ambiente esta pronto
npm run dev          # roda o ponto de partida
```

## Estrutura

```
docs/           documentacao do projeto (ACORDO.md, ADRs, perfis do time)
scripts/        scripts de apoio (doctor.js e outros)
src/            codigo da aplicacao
```

## Documentos do time

- [`docs/time/`](./docs/time/) — perfis individuais
- `ACORDO.md` — combinados do time (criar a partir da Atividade Prática 2)
- `docs/adr/` — registros de decisão arquitetural (a partir da Sprint 1)
