# Guia Rápido — Metodologia Ágil e Fluxo Git
## Semana 2

> Imprima e deixe ao lado do teclado.

## Checklist INVEST

| Letra | Pergunta rápida |
|---|---|
| **I**ndependent | Dá para entregar isso sozinho, sem esperar outra história? |
| **N**egotiable | O COMO ainda está em aberto para conversa? |
| **V**aluable | Quem usa o sistema percebe diferença? |
| **E**stimable | O time arrisca um tamanho aproximado? |
| **S**mall | Cabe numa sprint, com folga? |
| **T**estable | Existe forma objetiva de provar que está pronto? |

## Formato da história

```
Como <tipo de usuário>,
quero <ação>,
para que <benefício>.
```

## Formato do critério de aceite

```
Dado <contexto inicial>
Quando <ação>
Então <resultado esperado>
```

## Definition of Ready (checklist antes de entrar na sprint)

- [ ] Segue o formato Como/Quero/Para que
- [ ] Passa nas seis letras do INVEST
- [ ] Tem ao menos um critério de aceite
- [ ] O time entende o suficiente para estimar

## MoSCoW — pergunta de corte para Must have

> "Se esta história não existisse, o produto ainda resolveria o problema central da persona?"
> Se **sim** → não é Must have.

## Fluxo Git com Issue vinculada

```bash
git checkout main && git pull
git checkout -b tipo/nome-curto-da-historia

# ... implementar ...

git add <arquivos>
git commit -m "tipo: mensagem"
git push -u origin tipo/nome-curto-da-historia
```

Na descrição do Pull Request:
```
Closes #12
```

## Resolver conflito de merge

```bash
git merge main
# CONFLICT (content): Merge conflict in <arquivo>

# abrir o arquivo, localizar:
#   <<<<<<< HEAD
#   (sua versão)
#   =======
#   (versão de fora)
#   >>>>>>> main

# editar deixando so o conteudo final, SEM os 3 marcadores

git add <arquivo>
git commit
git push
```

**Antes de considerar resolvido:**
```bash
grep -rn "<<<<<<<" .    # nao pode sobrar nenhum marcador
```

## GitHub Projects — configuração mínima

| Passo | Onde |
|---|---|
| Criar quadro | Organização → Projects → New project → Board |
| Colunas | Backlog · A fazer · Em progresso · Em revisão · Concluído |
| Vincular ao repositório | Settings do projeto → Manage access |
| Campos personalizados | + New field (ex.: Papel responsável, Sprint) |
| Automação mínima | Settings → Workflows → Issue closed → Concluído |
