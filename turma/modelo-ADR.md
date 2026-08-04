# ADR-000: Modelo de Registro de Decisão Arquitetural

> Copie este arquivo para `docs/adr/NNNN-titulo-curto.md` a cada decisão técnica
> relevante do projeto — por exemplo, ao propor uma alternativa à stack de referência.
> Numere sequencialmente. Um ADR não é alterado depois de aceito: se a decisão mudar,
> crie um novo ADR que substitui o anterior e referencie-o.

## Status

Proposto | Aceito | Substituído por ADR-XXXX

## Contexto

<!-- Qual problema estamos resolvendo? Que restrições existem (prazo, conhecimento do
     time, exigência da disciplina)? -->

## Decisão

<!-- O que decidimos fazer, em uma ou duas frases diretas. -->

## Alternativas consideradas

| Opção | Vantagem | Desvantagem |
|---|---|---|
| A | | |
| B | | |
| (escolhida) | | |

## Consequências

<!-- O que fica mais fácil? O que fica mais difícil? Que dívida técnica isso pode gerar? -->

---

### Exemplo preenchido (remova ao usar o modelo)

**Status:** Aceito

**Contexto:** A stack de referência da disciplina indica PostgreSQL. O time tem mais
experiência coletiva com MySQL, de disciplinas anteriores do curso.

**Decisão:** Usar MySQL 8 em vez de PostgreSQL para a persistência do projeto.

**Alternativas consideradas:**

| Opção | Vantagem | Desvantagem |
|---|---|---|
| PostgreSQL (referência) | Alinhado à bibliografia da disciplina; recursos avançados de JSON e full-text search | Time começa do zero |
| MySQL (escolhida) | Time já tem base de outra disciplina; reduz risco na Sprint 1 | Menor aderência a alguns exemplos da bibliografia; será preciso adaptar |

**Consequências:** Os exemplos de código do professor em PostgreSQL precisarão de
pequena adaptação de sintaxe pelo time. Em compensação, a Sprint 1 tem menor risco de
atraso por curva de aprendizado do banco.
