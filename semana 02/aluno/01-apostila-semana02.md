# Apostila — Semana 2
## ISW-033 · Laboratório de Desenvolvimento Web · Aulas 5 a 8

> Este material é o texto de apoio dos slides. Use durante a aula e depois dela.

---

## Sumário

1. [Por que existe metodologia ágil](#1-por-que-existe-metodologia-ágil)
2. [Scrum: pilares, papéis, eventos e artefatos](#2-scrum-pilares-papéis-eventos-e-artefatos)
3. [Kanban e o limite de trabalho em progresso](#3-kanban-e-o-limite-de-trabalho-em-progresso)
4. [Scrum e Kanban juntos](#4-scrum-e-kanban-juntos)
5. [Backlog](#5-backlog)
6. [Histórias de usuário e o critério INVEST](#6-histórias-de-usuário-e-o-critério-invest)
7. [Critérios de aceite no formato Gherkin](#7-critérios-de-aceite-no-formato-gherkin)
8. [Definition of Ready e Definition of Done](#8-definition-of-ready-e-definition-of-done)
9. [GitHub Projects](#9-github-projects)
10. [Design Sprint compacto e Lean Canvas](#10-design-sprint-compacto-e-lean-canvas)
11. [Persona e mapa de jornada](#11-persona-e-mapa-de-jornada)
12. [MVP e priorização MoSCoW](#12-mvp-e-priorização-moscow)
13. [Fluxo Git: branches, commits e conflitos](#13-fluxo-git-branches-commits-e-conflitos)
14. [Glossário](#14-glossário)

---

## 1. Por que existe metodologia ágil

### 1.1 O problema que ela resolve

Antes do movimento ágil, o modelo dominante de desenvolvimento de software era o **cascata**: escopo definido por completo antes de escrever a primeira linha de código, meses entre a ideia e a primeira entrega visível, mudança de requisito tratada como exceção cara. O cliente só via o produto pronto — e se algo estivesse errado, corrigir já era caro.

O modelo ágil inverte essa lógica: ciclos curtos, entrega frequente (mesmo que pequena), mudança de requisito **esperada**, cliente reagindo ao produto a cada poucas semanas.

### 1.2 O Manifesto Ágil

Escrito em 2001 por 17 desenvolvedores, expressa quatro valores. Cada linha tem a forma "X mais que Y" — o lado direito não é descartado, apenas priorizado abaixo do esquerdo:

| Mais valor para... | ...do que para |
|---|---|
| Indivíduos e interações | processos e ferramentas |
| Software em funcionamento | documentação abrangente |
| Colaboração com o cliente | negociação de contratos |
| Responder a mudanças | seguir um plano |

O Manifesto é uma declaração de valores, não uma metodologia executável. Scrum e Kanban são duas formas concretas de viver esses valores no dia a dia — é isso que vemos a seguir.

---

## 2. Scrum: pilares, papéis, eventos e artefatos

### 2.1 Três pilares

- **Transparência** — o trabalho e o progresso são visíveis a todos.
- **Inspeção** — revisamos o que foi feito em intervalos regulares.
- **Adaptação** — ajustamos o rumo com base no que a inspeção revelou.

### 2.2 Três papéis, mapeados ao nosso projeto

| Papel do Scrum | Quem faz, no nosso projeto | Responsabilidade |
|---|---|---|
| **Product Owner** | O professor | Prioriza o backlog, aceita ou recusa cada incremento, representa o cliente |
| **Scrum Master** | Rotativo, dentro do time (geralmente o Tech Lead da sprint) | Conduz a daily, protege o tempo de foco, escala impedimentos |
| **Development Team** | O time inteiro | Projeta, constrói, testa e demonstra — autogerido no *como*, não no *o quê* |

### 2.3 Três artefatos

- **Product Backlog** — tudo o que pode vir a ser feito, ordenado por valor.
- **Sprint Backlog** — o recorte escolhido para o ciclo atual.
- **Incremento** — o que está pronto (segundo o Definition of Done) ao final do ciclo.

### 2.4 Os quatro eventos

| Evento | Quando | Propósito |
|---|---|---|
| **Sprint Planning** | Abertura da sprint | O time examina o backlog priorizado e decide o que cabe no ciclo |
| **Daily Scrum** | Todo encontro, ~10 min | Sincronização entre pares: o que fiz, o que farei, o que me impede |
| **Sprint Review** | Fechamento da sprint | Demonstração do incremento; o PO aceita ou recusa com base nos critérios de aceite |
| **Retrospectiva** | Após a review | O time examina o próprio processo e define uma ação de melhoria concreta |

Pular um evento não economiza tempo — desloca o problema para mais tarde, quando fica mais caro de resolver.

---

## 3. Kanban e o limite de trabalho em progresso

Onde o Scrum organiza ciclos fechados, o Kanban organiza **fluxo contínuo**, visualizado em um quadro de colunas (por exemplo: *A fazer → Em progresso → Em revisão → Concluído*).

### 3.1 Por que limitar o trabalho em progresso (WIP)

| Sem limite | Com limite (por exemplo, WIP = 3) |
|---|---|
| Todo mundo abre tarefa nova antes de terminar a anterior | Ao atingir o limite, ninguém puxa tarefa nova |
| Muita coisa "quase pronta", nada realmente pronto | O time é forçado a ajudar quem está travado |
| Gargalo só aparece quando já é tarde | Gargalo fica visível imediatamente — a coluna trava e todos veem |

**Analogia:** um pedágio com muitas cabines abertas não faz o trânsito andar mais rápido se a saída depois dele tiver uma única pista. O limite de WIP é decidir abrir só as cabines que a saída consegue escoar.

Contraintuitivamente, **reduzir** o WIP costuma **aumentar** a velocidade de entrega do time — porque reduz troca de contexto e expõe gargalos escondidos cedo.

---

## 4. Scrum e Kanban juntos

Os dois não competem: no nosso projeto, **Scrum organiza a sprint inteira** (2 a 3 semanas) e **Kanban organiza o quadro do dia a dia**, dentro de cada sprint.

| | Scrum | Kanban |
|---|---|---|
| Unidade de tempo | Ciclos fechados (sprints) | Fluxo contínuo, sem ciclo fixo |
| Mudança de prioridade | Fica para a próxima sprint | Pode entrar a qualquer momento, se a fila permitir |
| Papéis formais | Sim — PO, Scrum Master, Dev Team | Não exige papéis específicos |
| Métrica típica | Velocidade por sprint | Tempo de ciclo (*lead time*) |

---

## 5. Backlog

O backlog não é uma lista de tarefas — é uma lista **viva**, com quatro propriedades:

- **Único** — existe um backlog por produto, não um por pessoa ou módulo.
- **Ordenado** — o topo é o que será feito primeiro; ordem substitui prioridade solta.
- **Dinâmico** — itens entram, saem e mudam de posição a cada sprint, com base em aprendizado.
- **Detalhado de forma desigual** — o topo é bem detalhado; o fundo pode ser só uma frase. Detalhar tudo cedo é desperdício, porque itens distantes ainda vão mudar.

**Regra prática adotada no componente:** se um item está previsto para as próximas duas sprints, precisa estar como história INVEST com critério de aceite. Se está mais distante, uma frase basta.

---

## 6. Histórias de usuário e o critério INVEST

### 6.1 O formato

```
Como <tipo de usuário>,
quero <ação ou funcionalidade>,
para que <benefício ou motivo>.
```

### 6.2 Três armadilhas comuns

| Armadilha | Exemplo | Problema |
|---|---|---|
| Disfarçada de tarefa técnica | "Como desenvolvedor, quero criar a tabela de usuários" | Não descreve valor para quem usa o sistema |
| Grande demais para uma sprint | "Como cliente, quero gerenciar todo o meu pedido" | Esconde várias histórias menores; precisa ser fatiada |
| Sem benefício claro | "Como cliente, quero um botão azul" | Descreve solução, não necessidade |

### 6.3 INVEST — os seis testes

| Letra | Critério | O que verifica |
|---|---|---|
| **I** | Independent | A história pode ser priorizada e entregue sem depender de outra específica |
| **N** | Negotiable | É um convite à conversa, não uma especificação fechada |
| **V** | Valuable | Entrega valor perceptível a quem usa — não só valor técnico interno |
| **E** | Estimable | O time consegue dar uma estimativa aproximada de esforço |
| **S** | Small | Cabe dentro de uma única sprint, com folga |
| **T** | Testable | Existe forma objetiva de verificar se foi atendida |

Se o time não arrisca uma estimativa, a história provavelmente está vaga ou grande demais — refine antes de seguir.

---

## 7. Critérios de aceite no formato Gherkin

Transforma a história em algo verificável até por quem não programou:

```
Cenário: pedido em preparo
  Dado que fiz um pedido às 19h00
  Quando a cozinha inicia o preparo
  Então vejo o status "Em preparo"
  E recebo uma notificação no celular
```

| Parte | Função |
|---|---|
| **Dado** | o contexto inicial — o que já é verdade antes da ação |
| **Quando** | a ação que dispara o comportamento sendo testado |
| **Então** | o resultado esperado, verificável objetivamente |

Este mesmo formato volta na Sprint 1 como esqueleto de teste automatizado (Vitest + Supertest) — não é apenas documentação.

---

## 8. Definition of Ready e Definition of Done

Dois portões, em momentos diferentes do mesmo item:

| | Definition of Ready | Definition of Done |
|---|---|---|
| **Quando se aplica** | Antes de o item entrar na sprint | Antes de o item sair da sprint |
| **O que garante** | O time entende o suficiente para estimar e trabalhar | O item está pronto para uso, não só "escrito" |
| **Critérios típicos** | Formato Como/Quero/Para que; passa em INVEST; tem critério de aceite | Testado, revisado, documentado, seguro, publicado (ver Semana 1) |

Sem o primeiro portão, o time perde tempo estimando o que não entende. Sem o segundo, entrega "quase pronta" se acumula. Nesta semana, cada time **estende** o Definition of Done do componente com ao menos dois critérios próprios.

---

## 9. GitHub Projects

O quadro Kanban do time, no mesmo lugar do código — sem sincronizar duas ferramentas separadas.

### 9.1 Configuração mínima

1. Criar o quadro: organização → Projects → New project → modelo *Board*.
2. Colunas: *Backlog · A fazer · Em progresso · Em revisão · Concluído*.
3. Vincular ao repositório do time.
4. Criar campos personalizados: "Papel responsável" e "Sprint".
5. Automação mínima: Issue fechada move para "Concluído" (Settings → Workflows).
6. Popular: cada história de usuário vira uma Issue, vinculada ao quadro.

### 9.2 Vinculando Pull Request e Issue

Na descrição do PR, escrever `Closes #12` (usando o número da Issue) faz o GitHub fechar a Issue automaticamente quando o PR for integrado à `main` — e a automação do passo 5 move o card sozinho.

---

## 10. Design Sprint compacto e Lean Canvas

### 10.1 O formato original

O Design Sprint, criado no Google Ventures, dura cinco dias: **Mapear → Esboçar → Decidir → Prototipar → Testar**. No componente, compactamos: Mapear e Esboçar viram o Lean Canvas (rápido, em uma folha); Decidir vira a priorização MoSCoW; Prototipar e Testar acontecem ao longo do semestre — cada sprint repete, em certo sentido, esses dois últimos dias.

### 10.2 Lean Canvas — os nove blocos, na ordem de preenchimento

A ordem que reduz retrabalho **não** é a ordem numérica do canvas impresso:

| Ordem | Bloco | Pergunta que responde |
|---|---|---|
| 1 | **Problema** | Que problema real, específico, estamos resolvendo? (evite "as pessoas precisam de um app" — é solução disfarçada) |
| 2 | **Segmentos de cliente** | Quem sente esse problema, especificamente? |
| 3 | **Proposta de valor única** | O que diferencia sua solução das alternativas óbvias? |
| 4 | **Solução** | O esboço mais simples que resolve o problema do bloco 1 |
| 5 | **Canais** | Como o produto chega até quem precisa dele? |
| 8 | **Métricas-chave** | Que número prova que o problema está sendo resolvido? |
| 7 | **Estrutura de custos** | O que custa manter isso rodando? |
| 6 | **Fontes de receita** | Como o produto se sustentaria, se fosse real? |
| 9 | **Vantagem injusta** | O que é difícil de copiar rapidamente? ("nenhuma ainda" é resposta válida) |

O Lean Canvas é rascunho, não contrato: 2 a 3 minutos por bloco, revisável a qualquer momento.

---

## 11. Persona e mapa de jornada

### 11.1 Persona

Dá nome e rosto ao segmento de cliente (bloco 2 do canvas). Não é enfeite — toda decisão de prioridade pode ser testada perguntando **"isso ajuda a [nome da persona]?"**. Uma persona útil responde três perguntas:

- **Frustração** — o que hoje a incomoda de verdade?
- **Objetivo** — o que ela quer alcançar?
- **Contexto de uso** — onde e quando ela usaria o produto?

### 11.2 Mapa de jornada

Lista as etapas que o usuário vive, do "antes" ao "depois" do uso do produto. A maioria das soluções resolve **apenas uma** dessas etapas — ver a jornada inteira evita perder de vista o contexto ao redor daquela etapa.

Exemplo (lanchonete): *Antes → Pedido → Espera → Entrega → Depois*. Se a proposta de valor é "acompanhar o status em tempo real", o foco está na etapa **Espera** — as outras seguem como estão.

---

## 12. MVP e priorização MoSCoW

### 12.1 O que MVP não é

Não é "metade de um produto completo", nem "versão feia do produto final com todas as telas planejadas", nem "protótipo que ninguém usa de verdade".

### 12.2 O que MVP é

A fatia mais fina que resolve a etapa mais dolorosa da jornada, funcional e testável por um usuário real, focada em **uma** hipótese de valor por vez. Uma pergunta com resposta: *"isso resolve o problema, ou não?"*

**Analogia:** o MVP de um carro não é um chassi sem rodas — é um skate. Já anda, já testa a hipótese de locomoção, antes de virar bicicleta e depois carro.

### 12.3 MoSCoW

| Categoria | Significado | No nosso backlog |
|---|---|---|
| **M**ust have | Sem isso, o produto não resolve o problema central | Vai no MVP |
| **S**hould have | Importante, mas o produto sobrevive sem por uma sprint ou duas | Fica para depois do MVP |
| **C**ould have | Bom ter, impacto pequeno se ficar de fora por mais tempo | Baixa prioridade |
| **W**on't have (por ora) | Fora do escopo deste semestre | Registrado, não descartado — evita reabrir a discussão a cada sprint |

**Pergunta de corte para Must have:** *"Se essa história não existisse, o produto ainda resolveria o problema central da persona?"* Se sim, não é Must have.

---

## 13. Fluxo Git: branches, commits e conflitos

### 13.1 O fluxo padrão, agora com Issue vinculada

```
1. git checkout main && git pull
2. git checkout -b tipo/nome-curto-da-historia
3. ... implementar, seguindo o critério de aceite ...
4. git add <arquivos> && git commit -m "tipo: mensagem"
5. git push -u origin tipo/nome-curto-da-historia
6. Abrir Pull Request, com "Closes #N" na descrição
7. Revisão de par → aprovação → merge → Issue move sozinha
```

### 13.2 Resolvendo um conflito, passo a passo

```
$ git merge main
CONFLICT (content): Merge conflict in docs/equipe.md

# o arquivo mostra:
<<<<<<< HEAD
Responsavel: Ana
=======
Responsavel: Bruno
>>>>>>> main

# editar manualmente, apagando os TRÊS marcadores
# decidir o conteúdo final (uma versão, a outra, ou as duas)

$ git add docs/equipe.md
$ git commit
$ git push
```

### 13.3 Os três erros mais comuns

1. **Esquecer de apagar os marcadores** `<<<<<<<`, `=======`, `>>>>>>>` — o arquivo passa a ter sintaxe inválida.
2. **Resolver sem entender o conteúdo** — aceitar "o que veio de fora" sem ler.
3. **Usar `git merge --abort` para fugir** — o conflito continua lá na próxima tentativa.

Conflito de merge é rotina de trabalho em equipe, não sinal de erro grave. Melhor errar nele durante um exercício supervisionado do que na véspera de uma Sprint Review.

---

## 14. Glossário

| Termo | Definição curta |
|---|---|
| **Backlog** | lista viva e ordenada de tudo o que pode vir a ser feito |
| **Critério de aceite** | condição objetiva, no formato Dado/Quando/Então, que prova que uma história está pronta |
| **Definition of Ready** | critérios que um item precisa cumprir antes de entrar na sprint |
| **Design Sprint** | processo de cinco dias para reduzir o risco de construir a coisa errada |
| **Incremento** | o que está pronto (segundo o DoD) ao final de uma sprint |
| **INVEST** | seis critérios de qualidade de uma história de usuário |
| **Lean Canvas** | modelo de uma folha para descrever um produto em nove blocos |
| **MoSCoW** | técnica de priorização em quatro categorias |
| **MVP** | menor versão de um produto que já testa a hipótese de valor central |
| **Persona** | representação fictícia e específica de um segmento de cliente |
| **Product Owner** | papel do Scrum que prioriza o backlog e aceita o incremento |
| **Scrum Master** | papel do Scrum que protege o processo e remove impedimentos |
| **Sprint Backlog** | recorte do backlog escolhido para o ciclo atual |
| **WIP** | *Work In Progress* — quantidade de itens em andamento ao mesmo tempo |
