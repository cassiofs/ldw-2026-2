# Apostila — Semana 1
## ISW-033 · Laboratório de Desenvolvimento Web · Aulas 1 a 4

> Este material é o texto de apoio dos slides. Use durante a aula e depois dela.
> Tudo o que está aqui volta a aparecer nas sprints seguintes — nada é conteúdo descartável.

---

## Sumário

1. [Por que ambiente padronizado](#1-por-que-ambiente-padronizado)
2. [Node.js: JavaScript fora do navegador](#2-nodejs-javascript-fora-do-navegador)
3. [nvm: várias versões de Node na mesma máquina](#3-nvm-várias-versões-de-node-na-mesma-máquina)
4. [npm, package.json e versionamento semântico](#4-npm-packagejson-e-versionamento-semântico)
5. [Git: o modelo mental](#5-git-o-modelo-mental)
6. [GitHub, SSH e Pull Request](#6-github-ssh-e-pull-request)
7. [Docker: contêiner não é máquina virtual](#7-docker-contêiner-não-é-máquina-virtual)
8. [Trabalho em time: papéis e acordos](#8-trabalho-em-time-papéis-e-acordos)
9. [Glossário](#9-glossário)

---

## 1. Por que ambiente padronizado

### 1.1 O problema

A frase "na minha máquina funciona" é o sintoma. A causa tem quatro origens típicas:

| Origem | O que acontece na prática |
|---|---|
| **Versões diferentes** | Você usa Node 18, o colega usa Node 22. Um recurso existe em um e não no outro. O defeito só aparece na máquina de quem vai apresentar. |
| **Dependência implícita** | O projeto funciona porque você tem um programa instalado há dois anos e esqueceu. O README não menciona. Ninguém mais consegue rodar. |
| **Configuração local** | Variável de ambiente definida à mão, banco populado manualmente, porta liberada uma vez. Nada disso está versionado. |
| **Sistema operacional** | Barra invertida em caminho de arquivo, diferença entre maiúsculas e minúsculas, terminal incompatível. |

### 1.2 A resposta profissional, em três camadas

1. **Versionar a versão da linguagem** — arquivo `.nvmrc`, lido pelo `nvm`.
2. **Versionar as dependências** — `package.json` + arquivo de trava (`package-lock.json`).
3. **Versionar o ambiente inteiro** — `Dockerfile` e `docker-compose.yml` (Sprint 4).

As três camadas têm o mesmo princípio: **o que não está no repositório não existe**. Se uma informação só vive na sua cabeça ou na sua máquina, ela vai se perder.

### 1.3 As cinco camadas que montamos na Semana 1

```
5  Editor            VS Code + extensões recomendadas pelo projeto
4  Isolamento        Docker + Compose
3  Controle de versão Git + GitHub
2  Runtime           Node.js LTS instalado via nvm
1  Sistema           Linux, macOS ou Windows com WSL2
```

Montamos de baixo para cima porque cada camada depende da anterior. Validamos tudo com um único comando: `npm run doctor`.

---

## 2. Node.js: JavaScript fora do navegador

### 2.1 O que é

Node.js é um **ambiente de execução** que usa o motor V8 (o mesmo do Chrome) para rodar JavaScript diretamente no sistema operacional, com acesso a arquivos, rede e processos. É o que permite escrever o servidor da nossa API na mesma linguagem do front-end.

Três consequências para o nosso projeto:

- uma linguagem só no time inteiro reduz atrito quando o front e o back forem integrados (Sprint 2);
- o ecossistema npm dá acesso a bibliotecas, ferramentas de teste e de qualidade;
- é a base da bibliografia da disciplina (BROWN, *Programação web com Node e Express*).

### 2.2 O modelo de execução, em uma frase

Node executa seu código em **uma única thread** e **delega** as tarefas lentas (disco, rede, banco de dados) ao sistema operacional, seguindo adiante enquanto espera. O *event loop* devolve o resultado ao código quando ele fica pronto.

```
1. Seu código chama uma operação de entrada/saída
2. Node registra um callback e NÃO bloqueia
3. O sistema operacional executa em segundo plano
4. O event loop devolve o resultado ao callback
```

**Analogia:** o garçom que anota o pedido e vai atender outra mesa, em vez de ficar parado esperando a cozinha. Uma thread, muitos clientes.

**Consequência prática que volta na Sprint 1:** nunca bloqueie a thread principal com um laço pesado ou uma leitura síncrona demorada. Enquanto ela estiver ocupada, a API inteira para de responder — não só para aquele usuário, para todos.

### 2.3 O que significa LTS

LTS é *Long Term Support*: versão com correções de segurança garantidas por anos. Versões pares do Node (20, 22, 24) entram em LTS; ímpares são de curta duração. **Produção usa LTS** — e o nosso projeto vai para produção na Sprint 4.

---

## 3. nvm: várias versões de Node na mesma máquina

### 3.1 Comparação

| Instalação direta do site | Node via nvm |
|---|---|
| Uma única versão por máquina | Várias versões lado a lado |
| Trocar de versão exige desinstalar e reinstalar | Troca em um comando |
| Projeto antigo quebra ao atualizar | Cada projeto fixa a sua versão |
| Costuma exigir privilégio de administrador | Instala no perfil do usuário |

### 3.2 Comandos essenciais

```bash
nvm install --lts          # instala a versão LTS mais recente
nvm install 20             # instala uma versão específica
nvm ls                     # lista o que está instalado
nvm use 20                 # troca a versão desta sessão de terminal
nvm alias default lts/*    # define o padrão para novos terminais
```

### 3.3 O arquivo que resolve o problema do time

```bash
echo "22" > .nvmrc   # fixa a versão do projeto
nvm use              # lê o .nvmrc e troca automaticamente
```

O `.nvmrc` é versionado no Git. Quem clonar o repositório roda `nvm use` e passa a executar exatamente a mesma versão do restante do time — sem combinar nada por mensagem.

> **Atenção:** `nvm use` vale apenas para a sessão de terminal atual. Ao abrir um terminal novo, você volta para a versão padrão. Por isso o `doctor` confere isso para você.

---

## 4. npm, package.json e versionamento semântico

### 4.1 Anatomia do `package.json`

```json
{
  "name": "projeto-time-x",
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "node --watch src/index.js",
    "test": "vitest run",
    "doctor": "node scripts/doctor.js"
  },
  "dependencies":    { "express": "^4.19.2" },
  "devDependencies": { "vitest":  "^2.0.0"  }
}
```

- **`scripts`** — atalhos padronizados. Todo mundo roda `npm run dev`, independentemente do sistema operacional. É o contrato de uso do projeto.
- **`dependencies`** — o que a aplicação precisa **em produção**.
- **`devDependencies`** — o que só o desenvolvedor precisa: testes, lint, formatação. Não vai para o servidor.
- **`type: "module"`** — habilita `import`/`export` em vez de `require`.

### 4.2 Versionamento semântico (SemVer)

```
MAIOR . MENOR . CORREÇÃO
  4   .  19   .    2
```

| Parte | Muda quando | Exemplo |
|---|---|---|
| **MAIOR** | quebra compatibilidade | 4.19.2 → 5.0.0 |
| **MENOR** | adiciona recurso compatível | 4.19.2 → 4.20.0 |
| **CORREÇÃO** | conserta defeito | 4.19.2 → 4.19.3 |

Os prefixos nas dependências:

| Notação | Aceita | Não aceita |
|---|---|---|
| `^4.19.2` | 4.19.3, 4.20.0, 4.99.9 | 5.0.0 |
| `~4.19.2` | 4.19.3, 4.19.9 | 4.20.0 |
| `4.19.2` | somente 4.19.2 | qualquer outra |

### 4.3 Por que o arquivo de trava é versionado

O `^` permite que duas máquinas instalem versões **diferentes** da mesma biblioteca. O `package-lock.json` congela exatamente o que foi instalado — resolução completa da árvore de dependências, com versão e hash de integridade.

**Regra:** `package-lock.json` **sempre** vai para o Git. `node_modules/` **nunca**.

### 4.4 Segurança de dependências (prévia da Sprint 3)

```bash
npm audit             # lista vulnerabilidades conhecidas
npm audit fix         # corrige o que dá para corrigir sem quebrar
npm outdated          # mostra o que está desatualizado
```

---

## 5. Git: o modelo mental

### 5.1 O problema que ele resolve

```
projeto_final.zip
projeto_final_v2.zip
projeto_final_v2_CORRIGIDO.zip
projeto_final_ENTREGA.zip
projeto_final_ENTREGA_real.zip
```

Ninguém sabe qual é a versão boa; duas pessoas não conseguem editar o mesmo arquivo; não há como saber quem mudou o quê, nem por quê.

Com Git você ganha histórico com autoria e justificativa, trabalho paralelo em branches, retorno seguro a qualquer ponto, revisão por pares antes da integração e — nesta disciplina — evidência objetiva de contribuição individual.

### 5.2 As três áreas e o remoto

```
[1] Diretório       [2] Área de        [3] Repositório     [4] Repositório
    de trabalho         preparação         local               remoto
    (seu editor)        (staging)          (histórico)         (GitHub)

        --- git add --->  --- git commit --->  --- git push --->
        <-------------------- git pull ---------------------
```

| Comando | O que faz |
|---|---|
| `git status` | responde "onde eu estou?" — use o tempo todo |
| `git add <arquivo>` | leva do diretório para a área de preparação |
| `git commit -m "..."` | grava a preparação no histórico local |
| `git push` | envia o histórico local para o remoto |
| `git pull` | traz o que o time enviou |
| `git checkout -b <nome>` | cria e entra em uma branch nova |
| `git log --oneline --graph` | mostra o histórico de forma legível |
| `git diff` | mostra o que mudou e ainda não foi preparado |

### 5.3 Configuração mínima

```bash
git config --global user.name  "Seu Nome"
git config --global user.email "voce@fatec.sp.gov.br"
git config --global init.defaultBranch main
git config --global pull.rebase false
```

O nome e o e-mail entram em **cada commit**. Eles são a base do fator de contribuição individual da nota — configure corretamente.

### 5.4 Conventional Commits

Padrão adotado a partir da Semana 1 e cobrado na rubrica de versionamento.

| Tipo | Quando usar | Exemplo |
|---|---|---|
| `feat` | nova funcionalidade para o usuário | `feat: adiciona filtro por categoria` |
| `fix` | correção de defeito | `fix: corrige status 500 ao salvar sem titulo` |
| `docs` | apenas documentação | `docs: adiciona perfil de Ana ao time` |
| `test` | inclusão ou ajuste de testes | `test: cobre regra de desconto` |
| `refactor` | muda o código sem mudar comportamento | `refactor: extrai servico de pedidos` |
| `chore` | infraestrutura, dependências, configuração | `chore: adiciona docker compose do banco` |

**Regra prática:** verbo no presente, minúsculas, sem ponto final, no máximo 72 caracteres na primeira linha.

### 5.5 Conflito de merge — o que é e como resolver

Um conflito acontece quando duas branches alteram **as mesmas linhas** do mesmo arquivo. O Git não adivinha qual versão vale e marca o trecho assim:

```
<<<<<<< HEAD
linha como está na sua branch
=======
linha como está na branch que você está trazendo
>>>>>>> outra-branch
```

Para resolver: abra o arquivo, **apague os marcadores** `<<<<<<<`, `=======` e `>>>>>>>`, deixe o conteúdo final correto (que pode ser uma das versões, as duas ou nenhuma), salve, e então:

```bash
git add <arquivo>
git commit          # o Git já sugere a mensagem de merge
```

Conflito não é erro nem falha de alguém. É a consequência normal de duas pessoas trabalharem ao mesmo tempo.

---

## 6. GitHub, SSH e Pull Request

### 6.1 Git ≠ GitHub

**Git** é o programa de controle de versão que roda na sua máquina. **GitHub** é um serviço que hospeda repositórios Git e acrescenta colaboração: Pull Request, revisão, issues, quadro de tarefas e automação.

### 6.2 SSH ou HTTPS?

Ambos funcionam. Usamos **SSH** porque a autenticação é feita uma vez pela chave — não há senha ou token digitado a cada `push`.

```bash
ssh-keygen -t ed25519 -C "voce@fatec.sp.gov.br"   # gera o par de chaves
cat ~/.ssh/id_ed25519.pub                          # a chave PÚBLICA, que você cola no GitHub
ssh -T git@github.com                              # testa a conexão
```

- `id_ed25519` — chave **privada**. Nunca sai da máquina, nunca é enviada a ninguém, nunca entra no repositório.
- `id_ed25519.pub` — chave **pública**. É essa que você cola no GitHub.

> **Laboratório compartilhado:** a chave privada fica na máquina. Ao final da aula, remova-a (`rm -rf ~/.ssh`) e apague a chave correspondente no GitHub, ou qualquer pessoa que usar aquele computador estará autenticada como você.

### 6.3 O fluxo de Pull Request

```
1. git checkout main && git pull        # partir da main atualizada
2. git checkout -b tipo/descricao-curta # criar sua branch
3. ... trabalhar ...
4. git add <arquivos> && git commit -m "tipo: mensagem"
5. git push -u origin tipo/descricao-curta
6. Abrir o PR no GitHub, preencher o modelo, pedir revisão
7. Revisor lê, comenta, aprova
8. Merge na main
```

**Regras do semestre:** ninguém aprova o próprio PR; ninguém faz merge sem aprovação; vale para todas as 20 semanas, inclusive para o Tech Lead.

---

## 7. Docker: contêiner não é máquina virtual

### 7.1 A diferença estrutural

```
MÁQUINA VIRTUAL                      CONTÊINER
┌───────────────────────┐            ┌───────────────────────┐
│  App A     |   App B  │            │  App A     |   App B  │
│  SO convidado (x2)    │            │  Bibliotecas isoladas │
│  Hipervisor           │            │  Docker Engine        │
│  SO hospedeiro        │            │  SO hospedeiro (único)│
│  Hardware             │            │  Hardware             │
└───────────────────────┘            └───────────────────────┘
```

A máquina virtual carrega um **sistema operacional inteiro** por instância. O contêiner **compartilha o núcleo (kernel) do hospedeiro** e isola apenas o espaço de processos, rede e arquivos.

| | Máquina virtual | Contêiner |
|---|---|---|
| Tempo de subida | minutos | segundos |
| Tamanho típico | gigabytes | megabytes |
| Isolamento | mais forte (hardware virtualizado) | mais leve (namespaces do kernel) |
| Quantidade por máquina | poucas | dezenas |

### 7.2 Comandos da Semana 1

```bash
docker --version                    # confere instalação
docker compose version              # confere o plugin compose
docker run --rm hello-world         # primeiro contêiner
docker ps                           # contêineres em execução
docker ps -a                        # incluindo os parados
docker images                       # imagens baixadas
```

Um banco de dados completo, sem instalar banco de dados:

```bash
docker run --rm -e POSTGRES_PASSWORD=dev -p 5432:5432 postgres:16
```

**O que aconteceu:** você executou um PostgreSQL sem instalar PostgreSQL. Nenhum arquivo do banco tocou o seu sistema e, ao encerrar com `--rm`, não sobrou nada. É esse isolamento que vamos usar para o banco do projeto na Sprint 1.

### 7.3 Vocabulário

| Termo | Significado |
|---|---|
| **imagem** | modelo somente-leitura (a receita) |
| **contêiner** | instância em execução de uma imagem (o prato pronto) |
| **volume** | área de dados que sobrevive ao contêiner |
| **porta publicada** | `-p 5432:5432` liga a porta do host à do contêiner |
| **registry** | repositório de imagens (Docker Hub, por exemplo) |

---

## 8. Trabalho em time: papéis e acordos

### 8.1 Os quatro papéis, que giram a cada sprint

| Papel | Responde por |
|---|---|
| **Tech Lead** | decisões técnicas e fidelidade do backlog |
| **Quality Owner** | testes, revisão e Definition of Done |
| **DevOps Owner** | ambiente, contêineres e pipeline |
| **UX Owner** | interface, acessibilidade e usuário |

Ao final do semestre, todos terão passado por todos. Papel não é cargo: é foco de atenção durante uma sprint.

### 8.2 Definition of Done do componente

Um item só está pronto quando:

1. passa nos testes automatizados;
2. foi revisado e aprovado por par de outro time;
3. está documentado (README, OpenAPI ou ADR);
4. não introduz vulnerabilidade conhecida;
5. sobe via `docker compose up` sem passo manual;
6. a pipeline de integração está verde;
7. foi demonstrado funcionando em ambiente publicado.

### 8.3 Como pedir ajuda (e por que isso é técnico)

Antes de chamar o professor ou abrir uma issue:

1. leia a **mensagem inteira** do erro, não só a primeira linha;
2. localize a **última linha** — quase sempre é onde está a causa;
3. formule **uma hipótese** e teste;
4. registre o que já tentou.

Depurar é competência avaliada na rubrica. Quem só reporta "não funciona" está entregando menos informação do que já tinha na tela.

---

## 9. Glossário

| Termo | Definição curta |
|---|---|
| **ADR** | *Architecture Decision Record*: registro curto de uma decisão técnica, com contexto, opções e consequências |
| **Backlog** | lista priorizada do que ainda falta fazer |
| **Branch** | linha paralela de desenvolvimento |
| **CI** | *Continuous Integration*: automação que testa cada mudança |
| **Commit** | unidade de mudança gravada no histórico |
| **Definition of Done** | critérios públicos que definem "pronto" |
| **Event loop** | mecanismo do Node que devolve resultados de operações assíncronas |
| **Incremento** | resultado utilizável entregue ao final de uma sprint |
| **Lockfile** | arquivo que congela as versões exatas das dependências |
| **LTS** | versão com suporte de longo prazo |
| **Merge** | integração de uma branch em outra |
| **Pull Request** | proposta de mudança aberta para revisão |
| **Runtime** | ambiente que executa o código |
| **SemVer** | versionamento semântico MAIOR.MENOR.CORREÇÃO |
| **Sprint** | ciclo curto e fechado de trabalho com entrega ao final |
| **WSL2** | subsistema Linux dentro do Windows |
