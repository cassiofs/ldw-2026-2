# Lista de Exercícios — Semana 2
## ISW-033 · Laboratório de Desenvolvimento Web

> **Como usar:** tente **todos** antes de abrir o gabarito (`03-gabarito-comentado.md`).
>
> **Entrega:** os exercícios da Lista B entram no repositório do time, em
> `docs/exercicios/semana02-seu-nome.md`. O desafio escolhido da Lista C é opcional.
>
> **Tempo estimado:** Lista A 40 min · Lista B 100 min · Lista C 30 min por desafio.

---

## Lista A — Conceituais

### A1. Cascata x ágil
Um colega diz: "ágil é só não ter processo, ir fazendo". Aponte dois erros nessa afirmação, usando os quatro valores do Manifesto Ágil.

### A2. Papéis do Scrum
Para cada situação, diga qual papel do Scrum (Product Owner, Scrum Master ou Development Team) deveria decidir, e por quê:

**(a)** O time quer usar TypeScript em vez de JavaScript puro.
**(b)** O cliente pede uma funcionalidade nova no meio da sprint.
**(c)** A daily está sistematicamente passando de 20 minutos.
**(d)** Uma história está ambígua demais para ser estimada.

### A3. Eventos do Scrum
Associe cada situação ao evento correspondente (Sprint Planning, Daily, Sprint Review ou Retrospectiva):

**(a)** O time decide que, na próxima sprint, vai revisar Pull Requests em até 24 horas.
**(b)** O Product Owner recusa um incremento porque não atende ao critério de aceite.
**(c)** Uma pessoa avisa que está travada esperando definição de um endpoint.
**(d)** O time decide quantas histórias cabem no próximo ciclo.

### A4. WIP
Um time decide **não** limitar o trabalho em progresso, alegando que "quanto mais coisas abertas ao mesmo tempo, mais rápido tudo fica pronto". Argumente contra essa afirmação usando o conceito de gargalo visível.

### A5. Scrum ou Kanban?
Para cada situação, diga se o mecanismo descrito é mais associado a Scrum ou a Kanban, e por quê:

**(a)** Uma coluna do quadro trava porque atingiu o limite de cartões.
**(b)** O time se compromete com um conjunto fechado de histórias por duas semanas.
**(c)** Uma nova prioridade entra no quadro no meio do dia, sem esperar o próximo ciclo.

### A6. Backlog x lista de tarefas
Explique, com um exemplo, por que "detalhado de forma desigual" é uma propriedade **desejável** de um backlog, e não um sinal de descuido.

### A7. As três armadilhas de uma história
Classifique cada história abaixo na armadilha correspondente (tarefa técnica disfarçada, grande demais, ou sem benefício claro) e reescreva-a corrigida:

1. "Como desenvolvedor, quero criar os índices do banco de dados."
2. "Como cliente, quero uma interface bonita."
3. "Como cliente, quero gerenciar toda a minha conta no sistema."

### A8. INVEST aplicado
A história "Como cliente, quero editar meu pedido depois de enviado, contanto que a cozinha ainda não tenha iniciado o preparo" falha em qual(is) letra(s) do INVEST, se a funcionalidade de **criar** pedido ainda não existir no sistema? Justifique.

### A9. Critério de aceite
Escreva **dois** cenários de critério de aceite, no formato Gherkin, para a história: *"Como cliente, quero receber uma notificação quando meu pedido sair para entrega, para saber quando aguardar na porta."* Um cenário deve cobrir o caminho esperado; o outro, uma situação de exceção (ex.: cliente sem notificação habilitada).

### A10. DoR x DoD
Um item do backlog está assim: *"Como cliente, quero pagar pelo aplicativo. — sem critério de aceite, sem estimativa."* Ele pode entrar na próxima sprint, segundo o Definition of Ready apresentado na aula? Justifique e reescreva o que falta.

### A11. MoSCoW
Um time classificou 6 das 8 histórias do backlog inicial como Must have. Isso é, por si só, um problema? Qual pergunta o time deveria fazer para cada uma dessas 6 histórias antes de manter essa classificação?

### A12. MVP
Explique por que "lançar o sistema completo, mas só para 10 usuários de teste" **não é**, necessariamente, um MVP — mesmo tendo poucos usuários.

---

## Lista B — Práticos

### B1. Lean Canvas do time
Preencham o Lean Canvas do produto do time, nos nove blocos, seguindo a ordem de preenchimento da apostila (1→2→3→4→5→8→7→6→9). Versionem em `docs/lean-canvas.md`.

### B2. Persona
Escrevam a persona principal do produto: nome, idade, ocupação, frustração, objetivo e contexto de uso. Versionem em `docs/persona.md`.

### B3. Mapa de jornada
Desenhem (pode ser em texto ou imagem) o mapa de jornada do usuário, com pelo menos 4 etapas, destacando qual etapa o produto do time ataca. Versionem em `docs/jornada.md`.

### B4. Cinco histórias INVEST
Escrevam 5 histórias de usuário no formato Como/Quero/Para que, cada uma com:
- checklist INVEST preenchido (as 6 letras, com justificativa de uma linha cada);
- ao menos 1 critério de aceite em Gherkin.

Versionem em `docs/backlog.md`.

### B5. Classificação MoSCoW
Classifiquem as 5 histórias da B4 (mais qualquer outra que tenha surgido) em Must/Should/Could/Won't. Apliquem a pergunta de corte a cada Must have.

### B6. Quadro no GitHub Projects
1. Criem o quadro do time com as cinco colunas (Backlog, A fazer, Em progresso, Em revisão, Concluído).
2. Criem os campos "Papel responsável" e "Sprint".
3. Transformem cada história da B4 em uma Issue vinculada ao quadro.
4. Ordenem as Issues por valor (não por facilidade).
5. Configurem a automação: Issue fechada move para "Concluído".
6. Cole o link do quadro.

### B7. Definition of Done do time
Copiem o Definition of Done do componente (piso obrigatório) e acrescentem **ao menos dois** critérios próprios do time, justificando cada um com base no autodiagnóstico da Semana 1. Versionem em `docs/definition-of-done.md`.

### B8. Conflito de merge em dupla
Em dupla, dentro do time:
1. Criem juntos `docs/equipe.md` com uma linha, commitada direto na `main`.
2. Cada pessoa da dupla cria uma branch a partir da main e altera a **mesma linha** de forma diferente.
3. Uma pessoa integra primeiro (sem conflito). A outra, ao tentar integrar, vai enfrentar conflito.
4. Resolvam mantendo as duas informações.
5. Colem: a saída do terminal no momento do conflito, o conteúdo do arquivo com os marcadores, e o conteúdo final resolvido.

### B9. Pull Request vinculado à Issue
Abram um Pull Request para qualquer mudança pequena e documentada (por exemplo, a própria B7), escrevendo `Closes #N` na descrição, referenciando uma Issue real do quadro. Comprovem, com print ou link, que o merge moveu o card automaticamente.

---

## Lista C — Desafios (para quem terminar antes)

### C1. Persona secundária
O produto pode ter mais de um tipo de usuário relevante (ex.: cliente e funcionário da lanchonete). Criem uma segunda persona e reescrevam pelo menos uma história de usuário sob o ponto de vista dela.

### C2. Métrica-chave mensurável
Peguem a métrica-chave do Lean Canvas (bloco 8) e especifiquem: como ela seria medida tecnicamente (que evento, que tabela, que cálculo)? Isso adianta trabalho da Sprint 5.

### C3. Automação adicional no quadro
Configurem uma segunda automação no GitHub Projects (por exemplo: PR aberto move a Issue vinculada para "Em revisão" automaticamente). Documentem o passo a passo em `docs/automacoes-quadro.md`.

### C4. Simulação de conflito em três vias
Repitam o exercício B8, mas com **três** pessoas alterando a mesma linha em branches diferentes, integrando em sequência. Descreva se o processo de resolução muda, e como.
