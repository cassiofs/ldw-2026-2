# Gabarito Comentado — Semana 2
## ISW-033 · Laboratório de Desenvolvimento Web

> **Leia depois de tentar.** Cada resolução traz a **resposta**, o **porquê** e,
> quando cabe, o **erro comum** visto nas correções.

---

# Lista A — Conceituais

---

## A1. Cascata × ágil

**Resposta.** A afirmação erra em pelo menos dois pontos:

1. **Ágil não é ausência de processo — é um processo diferente.** O Manifesto não elimina processos e ferramentas: ele prioriza "indivíduos e interações" **acima** deles, o que é diferente de não ter nenhum. Scrum e Kanban, que vimos nesta semana, são processos formais, com papéis, eventos e artefatos definidos.

2. **"Ir fazendo" ignora o valor "responder a mudanças mais que seguir um plano".** Esse valor não significa "não planejar" — significa que o plano se ajusta a cada ciclo com base em aprendizado real. Há planejamento (Sprint Planning, backlog priorizado); o que muda é a frequência de revisão desse plano.

> **Erro comum:** confundir "processo leve" com "sem processo". Um Scrum bem executado tem tanta disciplina de rito quanto um cascata — a diferença está na duração dos ciclos e na abertura à mudança, não na quantidade de estrutura.

---

## A2. Papéis do Scrum

| Situação | Quem decide | Por quê |
|---|---|---|
| **(a)** TypeScript vs. JavaScript | **Development Team** | É decisão de *como* fazer, não de *o quê* fazer — o time é autogerido nessa dimensão |
| **(b)** Funcionalidade nova no meio da sprint | **Product Owner**, negociando com o time | O PO prioriza; mas a Sprint Backlog já fechada é do time — a mudança entra na próxima sprint, salvo acordo explícito de recorte |
| **(c)** Daily estourando o tempo | **Scrum Master** | É função dele proteger o processo e o tempo de foco do time |
| **(d)** História ambígua demais para estimar | **Development Team**, sinalizando ao Product Owner | O time identifica a falta de clareza (viola Estimable do INVEST); cabe ao PO refinar a história antes dela voltar a ser proposta |

> **Erro comum em (b):** achar que o PO pode simplesmente "inserir" a mudança na sprint em andamento. Isso quebra o compromisso do Sprint Planning e é uma das causas mais comuns de sprints que nunca terminam nada — a mudança deveria, via de regra, esperar o próximo ciclo, a menos que o time concorde em trocar algo já planejado por ela (não simplesmente somar mais trabalho).

---

## A3. Eventos do Scrum

| Situação | Evento |
|---|---|
| **(a)** Decisão de revisar PR em 24h para a próxima sprint | **Retrospectiva** — produz uma ação de melhoria concreta para o próximo ciclo |
| **(b)** PO recusa incremento por não atender critério de aceite | **Sprint Review** — é o momento de aceitar ou recusar, com base em critério objetivo |
| **(c)** Aviso de estar travado esperando definição de endpoint | **Daily** — sincronização diária de impedimentos |
| **(d)** Decisão de quantas histórias cabem no ciclo | **Sprint Planning** — é exatamente o propósito desse evento |

**O critério para diferenciar Review de Retrospectiva** (a confusão mais comum): a Review olha para o **produto** ("o que construímos está certo?"); a Retrospectiva olha para o **processo** ("como estamos trabalhando, e o que podemos melhorar?"). Ambas acontecem ao final da sprint, uma logo depois da outra, mas perguntam coisas diferentes.

---

## A4. WIP

**Resposta.** A afirmação inverte a causalidade real: mais itens abertos ao mesmo tempo **não** significa mais itens **terminados** ao mesmo tempo.

**Por quê.** Cada pessoa tem capacidade finita de atenção. Ao abrir muitas tarefas simultaneamente:

1. **A troca de contexto tem custo** — cada vez que alguém pausa uma tarefa para começar outra, parte do tempo seguinte é gasto relembrando onde parou, não avançando.
2. **O gargalo fica invisível até tarde.** Se dez tarefas estão "em progresso" e nenhuma está de fato avançando porque todas esperam a mesma pessoa revisar, isso só aparece quando a sprint já está perto do fim — tarde demais para reagir.
3. **"Quase pronto" não é entregável.** O valor de uma história só existe quando ela está **concluída** segundo o Definition of Done; dez histórias 80% prontas valem, na prática, zero histórias entregues.

O limite de WIP força o time a **fechar** antes de **abrir** — o que, contraintuitivamente, aumenta a taxa real de conclusão.

> **Erro comum:** achar que "limitar WIP" significa "trabalhar mais devagar". O limite não reduz o ritmo de trabalho — reduz a quantidade de coisas incompletas ao mesmo tempo, o que é diferente.

---

## A5. Scrum ou Kanban?

**(a) Kanban.** O limite de trabalho em progresso é um mecanismo característico de Kanban; Scrum, por si só, não define limites de coluna.

**(b) Scrum.** Compromisso fechado por um ciclo de tempo definido é exatamente a Sprint Backlog, artefato do Scrum.

**(c) Kanban.** Fluxo contínuo, sem esperar o próximo ciclo fechado, é a característica central do Kanban.

**A leitura que interessa.** No nosso projeto, os dois convivem: o **Sprint Backlog** (Scrum) define o que está dentro do escopo do ciclo atual; dentro dele, o **quadro Kanban** organiza o fluxo diário e sinaliza gargalo em tempo real.

---

## A6. Backlog × lista de tarefas

**Resposta.** "Detalhado de forma desigual" é desejável porque **detalhar cedo o que está longe é trabalho perdido**.

**Exemplo.** Um item no fundo do backlog — "permitir avaliação do pedido com estrelas" — pode ser descrito hoje em uma frase. Se o time investisse tempo agora escrevendo a história completa, com INVEST checado e critério de aceite em Gherkin, e depois de três sprints o Product Owner decidisse que essa funcionalidade não faz mais sentido (ou muda de forma), todo aquele detalhamento teria sido tempo gasto sem gerar valor.

**O princípio geral.** Detalhamento é investimento; investimento vale a pena perto do momento de uso, não muito antes. É a mesma lógica de "just-in-time" aplicada à documentação de requisitos — daí o nome alternativo "elaboração progressiva" para essa prática.

> **Erro comum:** achar que backlog "bem feito" significa todo mundo com o mesmo nível de detalhe. Um backlog assim geralmente significa **tempo desperdiçado no fundo da lista**, não qualidade.

---

## A7. As três armadilhas de uma história

| # | Original | Armadilha | Reescrita |
|---|---|---|---|
| 1 | "Como desenvolvedor, quero criar os índices do banco de dados." | **Tarefa técnica disfarçada** — o "usuário" é o próprio time, não quem usa o sistema | Não é história de usuário; vira item técnico do backlog (ex.: subtarefa dentro de uma história de performance, como "Como cliente, quero que a busca de pedidos responda em menos de 1 segundo") |
| 2 | "Como cliente, quero uma interface bonita." | **Sem benefício claro** — "bonita" não é verificável nem específico | "Como cliente, quero identificar rapidamente o status do meu pedido pela cor do ícone, para não precisar ler texto a cada consulta" |
| 3 | "Como cliente, quero gerenciar toda a minha conta no sistema." | **Grande demais** — "gerenciar toda" esconde várias histórias | Fatiar em: "Como cliente, quero editar meu telefone de contato", "Como cliente, quero ver meu histórico de pedidos", etc. — cada uma pequena o bastante para Small |

**O padrão por trás das três.** Cada armadilha corresponde a uma letra específica do INVEST falhando: a primeira falha em *Valuable*, a segunda em *Testable*, a terceira em *Small*. Reconhecer a armadilha é, na prática, já saber qual letra checar primeiro.

---

## A8. INVEST aplicado

**Resposta.** A história falha em **Independent**.

**Por quê.** "Editar pedido depois de enviado" pressupõe que a ação de **criar** pedido já existe e está concluída. Se essa funcionalidade-base ainda não existe no sistema, a história de edição não pode ser priorizada nem entregue isoladamente — ela **depende** de outra história específica estar pronta primeiro.

Isso não significa que a história esteja "errada" — significa que sua posição no backlog precisa respeitar essa dependência (a história de criação de pedido precisa vir antes, no ordenamento), e vale registrar essa dependência explicitamente na descrição da Issue.

> **Erro comum:** confundir isso com uma falha em *Small*. O tamanho da história pode estar adequado; o problema é a ordem de entrega, não o tamanho.

---

## A9. Critério de aceite

**Resposta — dois cenários possíveis:**

```gherkin
Cenário: notificação enviada normalmente
  Dado que o cliente tem notificações habilitadas
  Quando o pedido muda de status para "Saiu para entrega"
  Então o cliente recebe uma notificação no celular
  E a notificação contém o horário estimado de chegada

Cenário: cliente sem notificações habilitadas
  Dado que o cliente desabilitou notificações no aplicativo
  Quando o pedido muda de status para "Saiu para entrega"
  Então nenhuma notificação é enviada
  E o status "Saiu para entrega" ainda aparece ao abrir o aplicativo
```

**Por que o segundo cenário importa tanto quanto o primeiro.** Um critério de aceite que só descreve o caminho feliz deixa em aberto o que acontece nos outros casos — e "não especificado" quase sempre vira "não implementado" ou "implementado de forma inconsistente entre desenvolvedores diferentes do mesmo time". Cobrir ao menos uma exceção por história é prática recomendada, e volta a valer, com mais peso, quando os critérios de aceite virarem testes automatizados na Sprint 1.

---

## A10. DoR × DoD

**Resposta.** Não pode entrar na sprint, segundo o Definition of Ready apresentado.

**Por quê, item por item:**

| Critério do DoR | Situação do item | Atendido? |
|---|---|---|
| Formato Como/Quero/Para que | Tem "Como cliente, quero pagar" mas falta o "para que" | **Parcial** |
| Passa nos seis critérios INVEST | Sem critério de aceite, é impossível avaliar *Testable*; "pagar pelo aplicativo" é vago demais para *Small* e *Estimable* | **Não** |
| Tem ao menos um critério de aceite | Ausente | **Não** |
| O time entende o suficiente para estimar | Consequência direta dos itens anteriores | **Não** |

**Reescrita mínima para tornar o item pronto:**

```
Como cliente que já fez um pedido,
quero pagar pelo aplicativo com cartão de crédito,
para não precisar ter dinheiro em espécie na entrega.

Critério de aceite:
  Dado que tenho um pedido com valor definido
  Quando escolho "pagar com cartão" e confirmo os dados
  Então recebo confirmação de pagamento aprovado
  E o status do pedido muda para "Pagamento confirmado"
```

Mesmo essa versão provavelmente ainda precisaria de refinamento (qual gateway de pagamento? o que acontece se for recusado?) — mas já cruza o portão mínimo do DoR: tem formato, tem foco e tem algo verificável.

---

## A11. MoSCoW

**Resposta.** Sim, 6 de 8 como Must have é, por si só, um sinal de alerta.

**Por quê.** Se quase tudo é "essencial", a categorização perdeu sua função — que é **forçar escolha**, não descrever preferência. Um MVP com 6 Must haves provavelmente não cabe em uma única sprint, o que quebra o critério *Small* do INVEST aplicado ao conjunto.

**A pergunta que o time deveria aplicar a cada uma das 6:**

> *"Se esta história específica não existisse, o produto ainda resolveria o problema central da persona?"*

Se a resposta for "sim, ainda resolveria, só que de forma menos completa", a história é candidata a **Should have**, não Must have. O teste é sobre a **existência mínima** da solução, não sobre a **qualidade** dela.

> **Erro comum:** classificar por "quanto eu quero que isso exista" em vez de "o produto quebra sem isso". Desejo e necessidade mínima são coisas diferentes, e é fácil confundi-las quando se está entusiasmado com a própria ideia.

---

## A12. MVP

**Resposta.** Não necessariamente — "poucos usuários" e "MVP" são dimensões independentes.

**Por quê.** MVP é definido pelo **escopo funcional** (a menor fatia que testa a hipótese de valor central), não pelo **tamanho da audiência**. É perfeitamente possível ter:

- um sistema **completo** (todas as funcionalidades planejadas) testado com poucos usuários — isso é um **piloto restrito**, não um MVP;
- um sistema **mínimo** (uma única funcionalidade central) liberado para uma audiência grande — isso é um MVP de verdade.

A pergunta que separa os dois casos não é "quantas pessoas usam", e sim: *"o que está fora do sistema hoje, que só entraria numa versão posterior?"* Se a resposta for "nada, está tudo lá, só limitamos quem acessa", não é MVP — é o produto completo com lançamento controlado. Isso pode ser uma estratégia válida, mas resolve um problema diferente (risco de reputação, capacidade de suporte) do que o MVP resolve (risco de construir a coisa errada).

---

# Lista B — Práticos

---

## B1. Lean Canvas do time

**Como avaliar o resultado (não há uma única resposta correta — veja se o canvas do time atende a estes pontos):**

- O bloco **Problema** descreve algo real e específico, não uma necessidade genérica de mercado.
- O bloco **Segmentos de cliente** tem um perfil identificável, não "todo mundo que sente fome".
- A **Proposta de valor única** é uma frase, não um parágrafo, e menciona o diferencial — não apenas o que o produto faz.
- **Solução** é o esboço mais simples, coerente com o que foi descrito no bloco Problema.
- **Métricas-chave** é um número (ou algo mensurável), não uma frase de intenção como "ser útil".
- **Vantagem injusta** pode legitimamente estar em branco ou dizer "nenhuma ainda" — isso é aceitável nesta fase.

**Erro mais comum observado em turmas anteriores:** preencher o bloco Solução **antes** de fechar o bloco Problema, o que costuma produzir um Problema reescrito para justificar a Solução já decidida de antemão — o inverso da lógica do canvas.

---

## B2. Persona

**Modelo de verificação:** a persona deveria permitir responder, sem inventar na hora, à pergunta "o [nome da persona] usaria esta história?" para qualquer item do backlog. Se a persona é vaga demais ("gosta de tecnologia", "é ocupado"), essa pergunta não tem resposta útil.

**Exemplo de persona fraca vs. forte:**

| Fraca | Forte |
|---|---|
| "João, 30 anos, gosta de praticidade." | "João, 30 anos, entregador de aplicativo, faz 3 refeições fora de casa por dia, decide onde comer em menos de 1 minuto porque está sempre correndo entre entregas." |

A versão forte já sugere, sozinha, que velocidade de pedido importa mais que variedade de opções — informação que orienta prioridade real.

---

## B3. Mapa de jornada

**O que conferir:** cada etapa deveria ter uma ação ou estado claro (não "usa o produto", que é vago demais para ser uma etapa). O produto do time deveria estar claramente associado a **uma** etapa específica, não "a todas ao mesmo tempo" — se estiver associado a todas, provavelmente o escopo do MVP está grande demais (volta à Lista A, questão 12).

---

## B4. Cinco histórias INVEST

**Erro mais comum:** escrever 5 histórias tecnicamente corretas no formato, mas todas do ponto de vista do **mesmo** tipo de usuário, quando o produto tem mais de um perfil relevante (ex.: só do ponto de vista do cliente, esquecendo o funcionário da lanchonete que também interage com o sistema). Vale revisar se todos os "atores" da jornada (Exercício B3) têm ao menos uma história.

**Sobre os critérios de aceite:** um critério de aceite que apenas repete a história com outras palavras ("Dado que quero ver status, Quando abro o app, Então vejo o status") não agrega verificação nova. Um bom critério acrescenta **um detalhe concreto** que a história sozinha não define — um tempo, uma condição, um valor limite.

---

## B5. Classificação MoSCoW

**Verificação rápida:** aplicando a pergunta de corte (A11) a cada Must have declarado, o time deveria conseguir justificar em uma frase por que o produto "quebra" sem aquela história específica. Se a justificativa soar como "seria muito bom ter", é Should have, não Must have.

---

## B6. Quadro no GitHub Projects

**Pontos de verificação:**

- As cinco colunas existem, com esses nomes ou equivalentes claros.
- Cada história virou uma **Issue** (não apenas um cartão sem Issue vinculada) — isso importa porque é a Issue, não o cartão avulso, que se conecta ao Pull Request no passo B9.
- A ordem das Issues no backlog reflete **valor**, não facilidade de implementação — um erro comum é colocar primeiro o que é "mais fácil de programar", o que não é o mesmo critério que MoSCoW usa.
- A automação (Issue fechada → coluna Concluído) está de fato configurada, não apenas planejada.

---

## B7. Definition of Done do time

**O que os critérios extras deveriam refletir:** o autodiagnóstico da Semana 1. Um time que se autoavaliou fraco em acessibilidade, por exemplo, ganha mais adicionando "sem cor como único indicador de status" ao próprio DoD do que copiando um critério genérico da internet. O objetivo pedagógico é que o DoD do time seja **específico à lacuna real** daquele grupo, não decorativo.

---

## B8. Conflito de merge em dupla

**O que a saída esperada deveria conter**, nas três partes pedidas:

1. **Saída do terminal no momento do conflito** — deve incluir literalmente a palavra `CONFLICT` e o nome do arquivo.
2. **Conteúdo com marcadores** — deve mostrar `<<<<<<<`, `=======` e `>>>>>>>`, com o texto de cada lado do conflito diferente entre si (prova de que o exercício foi feito de verdade, e não simulado por texto).
3. **Conteúdo final resolvido** — não deve conter nenhum dos três marcadores, e deve refletir a decisão de manter as duas informações (conforme pedido no enunciado da atividade prática).

**Erro mais comum:** a dupla resolve o conflito **individualmente**, sem consultar a outra pessoa sobre qual conteúdo prevalece. O exercício pede resolução **em dupla** de propósito — decidir sozinho o que fazer com a mudança de outra pessoa, sem conversar, é exatamente o hábito que este exercício deveria prevenir antes que ele aconteça em código que importa.

---

## B9. Pull Request vinculado à Issue

**O que confere se funcionou:** depois do merge, a Issue referenciada deveria aparecer automaticamente como **fechada**, e — se a automação da B6 estiver configurada — o card correspondente deveria ter se movido sozinho para "Concluído" no quadro, sem ação manual.

**Causa mais comum de falha:** escrever `Closes #12` mas o número `#12` não corresponder à Issue pretendida (numeração errada, ou Issue de outro repositório). Vale sempre conferir o link gerado automaticamente pelo GitHub na própria descrição do PR antes de considerar concluído.

---

# Lista C — Desafios

---

## C1. Persona secundária

**O que observar na resolução:** a história reescrita sob o ponto de vista da segunda persona deveria mudar em **algo mais que o nome do ator** — se trocar apenas "Como cliente" por "Como funcionário" e manter o resto idêntico, provavelmente a persona secundária não tem uma necessidade genuinamente diferente, e vale reconsiderar se ela precisa mesmo existir separadamente.

**Exemplo de diferença genuína:** "Como cliente, quero ver o status do meu pedido" vs. "Como funcionário da cozinha, quero atualizar o status do pedido com um toque, sem digitar nada, porque minhas mãos estão sujas de massa." A segunda não é a mesma história de outro ângulo — é uma necessidade estruturalmente diferente (interface de toque rápido vs. interface de consulta).

---

## C2. Métrica-chave mensurável

**Exemplo de resolução, para a métrica "redução no número de ligações para a lanchonete":**

> Tecnicamente, isso não é medido diretamente (o sistema não sabe quantas ligações a lanchonete recebeu). A métrica **substituta** mensurável seria: número de acessos à tela de status do pedido por pedido feito. A hipótese é que, se essa tela é usada com frequência, ela está substituindo a ligação. Implementação: um evento `visualizacao_status` registrado a cada abertura da tela, com o `id_pedido` associado, permitindo calcular a média de visualizações por pedido ao longo do tempo.

**O ponto pedagógico deste desafio.** Métricas de produto raramente medem o problema diretamente — quase sempre precisam de uma métrica substituta (*proxy metric*) mensurável dentro do próprio sistema. Reconhecer essa diferença antecipa uma dificuldade real da Sprint 5.

---

## C3. Automação adicional no quadro

**Verificação:** a automação descrita deveria ser testada de fato (abrir um PR de teste e observar o card mover), não apenas configurada e presumida como funcionando. GitHub Projects tem automações com nomes específicos por evento (`Pull request opened`, `Pull request merged`, etc.) — o desafio pede que o time explore essas opções além da automação mínima já dada em aula.

---

## C4. Simulação de conflito em três vias

**O que costuma mudar com três pessoas:** o segundo merge (entre a primeira e a segunda pessoa) segue igual ao exercício B8. O **terceiro** merge, porém, frequentemente mistura conteúdo que já foi resolvido no segundo merge com uma terceira versão nova — o Git mostra o conflito contra o estado **já resolvido**, não contra o commit original de nenhuma das duas primeiras pessoas.

**O ponto pedagógico:** conflitos em cadeia (mais de duas pessoas mexendo na mesma linha em sequência) são mais difíceis de resolver corretamente porque exigem entender **três** intenções, não duas — e reforça por que o hábito de fazer `pull` com frequência (e não acumular mudanças isoladas por dias) reduz a chance desse cenário mais complexo acontecer.
