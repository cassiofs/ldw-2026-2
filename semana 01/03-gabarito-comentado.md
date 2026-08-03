# Gabarito Comentado — Semana 1
## ISW-033 · Laboratório de Desenvolvimento Web

> **Leia depois de tentar.** Cada resolução traz três partes: a **resposta**, o **porquê**
> (o raciocínio que leva até ela) e, quando cabe, o **erro comum** — aquilo que costuma
> aparecer nas correções e que vale mais do que a resposta certa.

---

# Lista A — Conceituais

---

## A1. Versão fixada

**(a) Qual problema o `.nvmrc` evita?**

**Resposta.** Evita que integrantes do mesmo time executem o projeto em versões diferentes do Node — situação em que um recurso da linguagem ou uma dependência funciona na máquina de um e falha na do outro, sem que o código tenha mudado.

**Por quê.** O `.nvmrc` transforma uma combinação informal ("a gente usa a 22") em um **artefato versionado**. Ele passa a viajar junto com o código: quem clona o repositório recebe a informação, e não depende de alguém lembrar de avisar. É o mesmo princípio das outras duas camadas — lockfile e Docker: *o que não está no repositório não existe*.

**(b) O `.nvmrc` protege quem não roda `nvm use`?**

**Resposta.** Não. Sozinho, o arquivo é apenas uma declaração de intenção: ele não muda a versão ativa do Node automaticamente.

**Por quê.** O `nvm` só lê o arquivo quando alguém executa `nvm use`. Existem três formas de fechar essa lacuna:

1. **automação no shell** — configurar o terminal para rodar `nvm use` ao entrar na pasta;
2. **verificação no `doctor`** — é exatamente o desafio (b) do exercício B7: o script compara `.nvmrc` com a versão ativa e falha se divergirem;
3. **`engines` no `package.json`** — o npm avisa (ou bloqueia, com `engine-strict`) quando a versão não bate.

> **Erro comum:** responder que "o arquivo força a versão". Ele **declara**; quem força é o comando, a automação ou a verificação.

---

## A2. Classificação de dependências

| Pacote | Classificação | Justificativa |
|---|---|---|
| `express` | `dependencies` | é o servidor HTTP; sem ele a aplicação não roda em produção |
| `vitest` | `devDependencies` | executa testes; o servidor de produção nunca roda testes |
| `pg` | `dependencies` | driver do banco; a aplicação precisa dele em execução |
| `eslint` | `devDependencies` | análise estática acontece durante o desenvolvimento e na pipeline |
| `dotenv` | `dependencies` (com ressalva) | a aplicação o usa em tempo de execução — veja abaixo |
| `prettier` | `devDependencies` | formatação de código-fonte; irrelevante para o processo em produção |

**O critério, em uma pergunta.** *Se eu apagar o pacote e subir a aplicação no servidor, ela quebra?* Se sim, é `dependencies`. Se não, é `devDependencies`.

**A ressalva do `dotenv`.** É `dependencies` quando a aplicação o chama em tempo de execução (`import "dotenv/config"`). Em muitos ambientes de produção, porém, as variáveis já são injetadas pelo orquestrador — e aí o `dotenv` só serve em desenvolvimento, virando `devDependencies`. É uma decisão de arquitetura, e merece uma linha de ADR quando o time optar.

> **Erro comum:** classificar pelo "tamanho" ou pela "importância" do pacote. O critério é **momento de uso**, não relevância.

---

## A3. SemVer na prática

**(a) Com `^4.19.2`:**

| Versão | Aceita? | Por quê |
|---|---|---|
| 4.20.0 | **sim** | o `^` libera incrementos de MENOR e CORREÇÃO |
| 5.0.0 | **não** | mudança de MAIOR pode quebrar compatibilidade |
| 4.19.1 | **não** | é **anterior** à mínima declarada |

O `^` significa "a partir de 4.19.2, até (sem incluir) 5.0.0".

**(b) Com `~4.19.2`:** o intervalo se estreita para "a partir de 4.19.2, até (sem incluir) 4.20.0". Ou seja, só correções entram; 4.20.0 passa a ser recusada.

**(c) O arquivo é o `package-lock.json`.**

**Por quê.** O `^` descreve uma **faixa**, não uma versão. Quando a pessoa A instalou, a última compatível era a 4.19.2; uma semana depois, para a pessoa B, já era a 4.20.1. Ambas respeitaram a declaração e mesmo assim ficaram diferentes. O lockfile resolve porque grava a **árvore completa resolvida** — versão exata de cada pacote, inclusive das dependências das dependências, com hash de integridade.

Ele precisa estar no Git porque só assim viaja para as outras máquinas e para a pipeline. Em ambiente automatizado, aliás, não se usa `npm install` e sim `npm ci`: esse comando **exige** o lockfile e instala exatamente o que está nele.

> **Erro comum:** confundir `package-lock.json` com `node_modules/`. O primeiro é a **receita exata** (texto, pequeno, versionado); o segundo é o **resultado** (milhares de arquivos, nunca versionado).

---

## A4. Contêiner e máquina virtual

**Correta: (b)** — o contêiner é mais leve porque compartilha o núcleo do sistema operacional hospedeiro.

**Por que as outras estão erradas:**

- **(a)** Inverte a explicação. O contêiner não "virtualiza menos hardware": ele **não virtualiza hardware nenhum**. Quem virtualiza hardware é o hipervisor da máquina virtual. O contêiner isola processos, rede e sistema de arquivos por meio de recursos do próprio kernel (*namespaces* e *cgroups*).
- **(c)** Confunde causa com configuração. É possível limitar memória de um contêiner (`--memory`) e também de uma VM. A leveza não vem do limite imposto, e sim de não haver um segundo sistema operacional carregado.
- **(d)** Falso. As garantias de isolamento são diferentes: a VM isola no nível do hardware virtualizado, o contêiner no nível do kernel compartilhado. Por isso a VM ainda é preferida quando o isolamento precisa ser mais forte — cargas não confiáveis, por exemplo.

**Consequência que volta na Sprint 4.** Como o kernel é compartilhado, um contêiner Linux não roda sobre um kernel Windows sem uma camada intermediária — e é exatamente por isso que o Docker Desktop no Windows depende do WSL2.

---

## A5. Onde está o meu arquivo?

| Situação | Área | Comando que move adiante |
|---|---|---|
| **(a)** editado e salvo, nada mais | Diretório de trabalho | `git add README.md` |
| **(b)** após `git add` | Área de preparação (*staging*) | `git commit -m "..."` |
| **(c)** após `git commit` | Repositório local | `git push` |
| **(d)** visível no GitHub | Repositório remoto | (para trazer de volta a outra máquina: `git pull`) |

**Como conferir sem decorar.** `git status` nomeia a área em que cada arquivo está:

- `Changes not staged for commit` → diretório de trabalho;
- `Changes to be committed` → área de preparação;
- `nothing to commit, working tree clean` + `Your branch is ahead of 'origin/main' by N commits` → está no repositório local, falta o `push`.

> **Erro comum:** achar que `git commit -a` elimina a área de preparação. Ele apenas adiciona automaticamente os arquivos **já rastreados** — arquivos novos continuam exigindo `git add`.

---

## A6. Autenticação SSH

**(a) É sucesso.** A frase começa com `You've successfully authenticated`. A segunda metade — `GitHub does not provide shell access` — não é ressalva ao seu caso: é a informação de que o GitHub, por princípio, não dá terminal remoto a ninguém. O `-T` do comando justamente pede para não abrir terminal.

**(b) A chave colada no GitHub é a pública (`id_ed25519.pub`).**

**Por quê.** A criptografia assimétrica funciona em par: a chave privada assina, a pública verifica. O GitHub precisa apenas **verificar** que você tem a privada — para isso basta a pública. Entregar a privada seria equivalente a dar a senha; qualquer pessoa com ela passaria a se autenticar como você, em qualquer repositório.

**(c) Em máquina compartilhada**, ao final da aula: remova o par de chaves local (`rm -rf ~/.ssh`) **e** apague a chave correspondente nas configurações do GitHub.

**Por quê.** A chave privada não tem senha (pressionamos Enter nas três perguntas, por agilidade). Quem sentar naquele computador depois de você estará autenticado como você — podendo fazer push, apagar branches e assinar commits com o seu nome. Apagar apenas no GitHub deixa o arquivo na máquina; apagar apenas na máquina deixa uma chave autorizada sem dono. Faça os dois.

---

## A7. Código de saída

**(a) Sem a linha `process.exit(...)`,** o script continua imprimindo as mesmas mensagens na tela, mas termina com código de saída **0** — ou seja, informa "sucesso" ao sistema operacional mesmo quando encontrou falhas. Para uma pessoa lendo o terminal, nada muda; para qualquer programa que dependa do resultado, tudo muda.

**(b) Importa para a pipeline** porque uma etapa de CI é considerada bem-sucedida **exatamente** quando o comando termina com código 0. Um `doctor` que sempre sai com 0 é uma verificação decorativa: ela roda, imprime "FALHA" no log e a pipeline segue verde.

**Regra geral para scripts de automação.**

| Código | Significado |
|---|---|
| `0` | sucesso |
| diferente de `0` | falha (o valor pode distinguir o tipo de falha) |

> **Erro comum:** usar `console.error` achando que isso "faz o script falhar". `console.error` só escolhe o canal de saída (stderr em vez de stdout); quem determina sucesso ou falha é o código de saída.

---

## A8. Mensagens de commit

| # | Original | Corrigida | O que estava errado |
|---|---|---|---|
| 1 | `Ajustes` | `refactor: extrai validacao de e-mail para modulo proprio` | não diz o que mudou nem por quê; sem tipo. Se você não consegue nomear a mudança, provavelmente o commit está juntando coisas demais |
| 2 | `Corrigido o bug do login...` (frase longa) | `fix: trata e-mail vazio no login`<br><br>corpo: `Antes o campo vazio chegava ao banco e gerava 500. Agora retorna 400 com mensagem.` | passa de 72 caracteres na primeira linha e usa passado. O detalhe vai no **corpo**, separado por linha em branco |
| 3 | `TESTE FINAL agora vai` | `test: adiciona teste de integracao do cadastro` | maiúsculas, sem tipo, e descreve o estado emocional em vez da mudança |
| 4 | `feat: Adicionou a listagem de produtos.` | `feat: adiciona listagem de produtos` | tipo correto, mas com inicial maiúscula, verbo no passado e ponto final |
| 5 | `subindo arquivos` | `chore: adiciona configuracao do editor e do lint` | descreve a **operação de Git**, não a mudança. O Git já sabe que você subiu arquivos; o que ele não sabe é o quê e por quê |

**O teste rápido:** a mensagem deve completar a frase *"Ao aplicar este commit, o projeto vai..."*. `Ajustes` não completa; `adiciona listagem de produtos` completa.

---

## A9. Definition of Done

**Resposta.** Dos sete critérios, **nenhum está comprovadamente atendido**.

**Por quê.** "Funciona na minha máquina" não comprova nenhum item da lista. Percorrendo:

| # | Critério | Situação |
|---|---|---|
| 1 | passa nos testes automatizados | não — ele mesmo diz que falta escrever teste |
| 2 | revisado e aprovado por par de outro time | não — o código não saiu da máquina dele, não há PR |
| 3 | documentado | não mencionado, portanto não comprovado |
| 4 | não introduz vulnerabilidade conhecida | não verificado (`npm audit` não foi rodado) |
| 5 | sobe via `docker compose up` | não comprovado; "na minha máquina" sugere justamente o contrário |
| 6 | pipeline verde | impossível: sem push, a pipeline não rodou |
| 7 | demonstrado em ambiente publicado | não |

**A leitura que interessa.** O colega está a **um passo** de concluir na percepção dele e a **sete passos** segundo o critério público. Essa distância é a razão de existir um Definition of Done escrito: ele substitui a discussão subjetiva sobre "está pronto?" por uma verificação.

> Aceitar meia resposta aqui é o começo do atraso: o item volta na sprint seguinte, quando o contexto já se perdeu.

---

## A10. Privilégio administrativo

**(a) Por que não usar `sudo npm install -g`:**

1. **Não é necessário.** Com `nvm`, o Node e os pacotes globais ficam em `~/.nvm`, dentro do seu perfil. Você já tem permissão de escrita ali.
2. **É perigoso.** A instalação de um pacote npm pode executar scripts (`postinstall`) definidos pelo autor. Com `sudo`, esse código roda como administrador da máquina — um pacote comprometido na cadeia de dependências ganha o sistema inteiro. É o vetor de ataque de supply chain que estudamos na Sprint 3.
3. **Quebra o ambiente depois.** Arquivos criados como root passam a pertencer ao root. O próximo `npm install` **sem** `sudo` falha com `EACCES` — e a solução aparente ("usar `sudo` de novo") aprofunda o problema.

**(b) A decisão anterior** foi instalar o Node **via nvm**, no perfil do usuário, em vez de instalar no sistema pelo pacote oficial. O `EACCES` é sintoma de instalação em diretório do sistema; com nvm, ele simplesmente não ocorre.

---

# Lista B — Práticos no terminal

---

## B1. Duas versões de Node

```bash
nvm install --lts          # instala a LTS mais recente
nvm install 20             # instala a linha 20
nvm ls                     # lista o instalado; -> marca a versão ativa
nvm use 20
node -v                    # v20.x.x
nvm use --lts
node -v                    # v22.x.x (ou a LTS vigente)
```

**Saída esperada de `nvm ls`** (o formato varia conforme a versão do nvm):

```
       v20.19.0
->     v22.14.0
default -> lts/* (-> v22.14.0)
```

**Comentário.** `nvm use` vale **apenas para a sessão de terminal atual**. Abra outro terminal e você estará na versão `default`. Esse comportamento não é defeito: é o que permite manter dois projetos abertos em versões diferentes ao mesmo tempo, cada um no seu terminal.

> **Erro comum:** rodar `nvm use 20` num terminal e conferir `node -v` em outro. As sessões são independentes.

---

## B2. `.nvmrc` funcionando

```bash
cd isw033-2026-<seu-time>
echo "22" > .nvmrc
cat .nvmrc                 # 22

nvm use 20                 # sai de propósito da versão do projeto
node -v                    # v20.x.x

nvm use                    # sem argumento: lê o .nvmrc
# Found '/caminho/.nvmrc' with version <22>
# Now using node v22.14.0
node -v                    # v22.x.x
```

**Comentário.** Colocamos só o número maior (`22`) em vez de `22.14.0` de propósito. Fixar o patch exato obrigaria o time a editar o arquivo a cada correção de segurança do Node, e o arquivo acabaria abandonado. Fixar o maior já elimina a classe de problema que interessa: diferença de comportamento entre linhas do Node.

**Não esqueça de versionar:**

```bash
git add .nvmrc
git commit -m "chore: fixa a versao do Node do projeto"
```

Um `.nvmrc` fora do Git não serve para nada.

---

## B3. Primeiro `package.json`

```bash
mkdir laboratorio-b3 && cd laboratorio-b3
npm init -y
npm pkg set type=module
npm pkg set scripts.ola="node src/ola.js"
mkdir src
```

`src/ola.js`:

```js
// process.versions.node traz a versão em execução — sem depender de comando externo.
const nome = "Ana Souza";
console.log(`Ola, ${nome}. Rodando em Node ${process.versions.node}.`);
```

```bash
npm run ola
```

Saída esperada:

```
> laboratorio-b3@1.0.0 ola
> node src/ola.js

Ola, Ana Souza. Rodando em Node 22.14.0.
```

**Comentário.**

- `npm init -y` aceita todos os padrões, sem perguntas. Serve para começar rápido; em projeto real vale revisar `name`, `description` e `license` depois.
- `npm pkg set` edita o `package.json` pelo terminal, sem abrir o arquivo. É menos sujeito a erro de digitação — e funciona igual em qualquer sistema, o que importa quando o comando entra num script.
- `type: "module"` é o que permite `import`/`export`. Sem ele, `import` gera `SyntaxError: Cannot use import statement outside a module`.
- As duas primeiras linhas da saída são do próprio npm ecoando o script. Não são erro.

---

## B4. Histórico e retorno

```bash
mkdir laboratorio-b4 && cd laboratorio-b4
git init

echo "primeira nota" > notas.md
git add notas.md && git commit -m "docs: cria arquivo de notas"

echo "segunda nota" >> notas.md
git add notas.md && git commit -m "docs: acrescenta segunda nota"

echo "terceira nota" >> notas.md
git add notas.md && git commit -m "docs: acrescenta terceira nota"

git log --oneline
```

```
c3d4e5f (HEAD -> main) docs: acrescenta terceira nota
b2c3d4e docs: acrescenta segunda nota
a1b2c3d docs: cria arquivo de notas
```

**Voltar ao primeiro commit sem apagar os outros:**

```bash
git checkout a1b2c3d        # use o hash da SUA saída
cat notas.md                # apenas "primeira nota"
```

O Git avisa que você está em *detached HEAD*. Isso não é erro: significa que você está posicionado em um commit específico, e não na ponta de uma branch. Os commits seguintes continuam existindo.

**Retornar ao estado mais recente:**

```bash
git checkout main
cat notas.md                # as três notas de volta
git log --oneline           # histórico intacto
```

**Comentário — por que `checkout` e não `reset --hard`.** O objetivo era **visitar** um estado anterior, não reescrever a história. `git checkout <hash>` move só o ponteiro de leitura. `git reset --hard <hash>` moveria a própria branch, e os dois commits seguintes ficariam órfãos (recuperáveis por `git reflog` por algum tempo, mas fora do histórico). Em repositório compartilhado, isso é destrutivo — e é uma das causas mais comuns de trabalho perdido em trabalho de equipe.

> Em versões recentes do Git existe `git switch --detach <hash>` para o mesmo efeito, com nome mais claro.

---

## B5. Conflito de merge provocado

```bash
mkdir laboratorio-b5 && cd laboratorio-b5 && git init
echo "Responsavel: a definir" > time.md
git add time.md && git commit -m "docs: cria arquivo do time"

git checkout -b alteracao-a
echo "Responsavel: Ana" > time.md
git commit -am "docs: define Ana como responsavel"

git checkout main
git checkout -b alteracao-b
echo "Responsavel: Bruno" > time.md
git commit -am "docs: define Bruno como responsavel"

git checkout main
git merge alteracao-a        # sem conflito: a main não mudou desde a criação da branch
git merge alteracao-b        # CONFLITO
```

```
Auto-merging time.md
CONFLICT (content): Merge conflict in time.md
Automatic merge failed; fix conflicts and then commit the result.
```

**Conteúdo do arquivo durante o conflito:**

```
<<<<<<< HEAD
Responsavel: Ana
=======
Responsavel: Bruno
>>>>>>> alteracao-b
```

**Depois de resolvido, mantendo as duas informações:**

```
Responsaveis: Ana e Bruno
```

```bash
git add time.md
git commit                   # o Git já propõe a mensagem de merge
git log --oneline --graph
```

**Comentário.**

- O primeiro `merge` não deu conflito porque a `main` não havia mudado desde que a branch nasceu — o Git só avançou o ponteiro (*fast-forward*).
- O segundo deu conflito porque **a mesma linha** havia mudado nos dois lados. Se as pessoas tivessem editado linhas diferentes do mesmo arquivo, o Git resolveria sozinho.
- Resolver conflito é **decisão humana**, não operação mecânica: aqui optamos por preservar as duas informações, mas manter só uma também seria uma resolução válida. Quem resolve precisa entender o conteúdo.
- **Apague os três marcadores.** Deixar `<<<<<<<` no arquivo e commitar é o defeito mais comum da semana, e ele passa despercebido até alguém tentar executar o código.

> **Erro comum:** rodar `git merge --abort` no primeiro susto. Abortar é legítimo quando você quer recomeçar, mas o conflito continuará lá na próxima tentativa. Ele não desaparece por adiamento.

---

## B6. Banco em contêiner

```bash
# terminal 1
docker run --rm --name pg-b6 -e POSTGRES_PASSWORD=dev -p 5432:5432 postgres:16

# terminal 2
docker ps
```

```
CONTAINER ID   IMAGE         COMMAND                  STATUS         PORTS                    NAMES
a1b2c3d4e5f6   postgres:16   "docker-entrypoint.s…"   Up 20 seconds  0.0.0.0:5432->5432/tcp   pg-b6
```

**Conectar de dentro do próprio contêiner:**

```bash
docker exec -it pg-b6 psql -U postgres -c "SELECT version();"
```

```
                                          version
--------------------------------------------------------------------------------------------
 PostgreSQL 16.x on x86_64-pc-linux-gnu, compiled by gcc ...
(1 row)
```

**Encerrar e comprovar:**

```bash
# no terminal 1: Ctrl+C
docker ps          # a lista não mostra mais o pg-b6
docker ps -a       # também não aparece: --rm removeu o contêiner ao encerrar
```

**O que sobrou instalado na máquina.** Apenas a **imagem** `postgres:16` no cache local (visível em `docker images`). Nenhum serviço de banco foi instalado, nenhuma porta ficou permanentemente ocupada, nenhum arquivo de dados foi criado no sistema — porque não usamos volume e o `--rm` descartou a camada de escrita do contêiner.

**Comentário sobre `-p 5432:5432`.** O primeiro número é a porta **da sua máquina**; o segundo, a **de dentro do contêiner**. Se a 5432 já estivesse ocupada, bastaria `-p 5433:5432` — o contêiner continua achando que atende na 5432, e você se conecta na 5433. Essa separação é o que permite subir três projetos ao mesmo tempo sem conflito.

**Consequência para a Sprint 1.** Sem volume, os dados somem ao encerrar. Isso é ótimo para teste e péssimo para desenvolvimento contínuo — por isso o `docker-compose.yml` do projeto vai declarar um volume nomeado.

---

## B7. O verificador de ambiente

A versão base está em `repo-modelo/scripts/doctor.js` e a versão com **os quatro desafios resolvidos e comentados linha a linha** está em `repo-modelo/scripts/doctor-solucao-completa.js`. Abaixo, o essencial de cada extensão.

### (a) Comparar versões de verdade

A armadilha é comparar como texto: `"v9.0.0" > "v10.0.0"` é **verdadeiro** em comparação alfabética, porque `"9"` vem depois de `"1"`. A solução é extrair os números e comparar posição por posição:

```js
function extrairVersao(texto) {
  const m = texto.match(/(\d+)\.(\d+)\.(\d+)/);
  return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : null;
}

function versaoAtende(atual, minima) {
  for (let i = 0; i < 3; i++) {
    if (atual[i] > minima[i]) return true;
    if (atual[i] < minima[i]) return false;
  }
  return true;
}
```

A expressão regular resolve outro problema: cada ferramenta imprime num formato diferente (`v22.14.0`, `10.9.2`, `git version 2.43.0`, `Docker version 27.3.1, build ce12230`). Buscar o primeiro padrão `número.número.número` funciona para todas.

### (b) `.nvmrc` coerente

```js
if (!existsSync(".nvmrc")) {
  // aviso: o time não fixou a versão
} else {
  const desejado = Number(readFileSync(".nvmrc", "utf8").trim().replace(/^v/, "").split(".")[0]);
  const atual = Number(process.versions.node.split(".")[0]);
  if (desejado !== atual) { /* falha, sugerindo `nvm use` */ }
}
```

Compara-se apenas o número **maior** de propósito: exigir o patch exato criaria falso alarme a cada atualização do Node.

### (c) Porta livre

Não existe forma portátil de *consultar* portas (`lsof` e `netstat` mudam de sintaxe entre sistemas e nem sempre estão instalados). A forma confiável é **tentar ocupar**:

```js
import { createServer } from "node:net";

function portaLivre(porta) {
  return new Promise((resolve) => {
    const servidor = createServer();
    servidor.once("error", (err) => resolve(err.code !== "EADDRINUSE"));
    servidor.once("listening", () => servidor.close(() => resolve(true)));
    servidor.listen(porta, "127.0.0.1");
  });
}
```

Repare que este é o primeiro contato prático com o modelo assíncrono do Node: a API de rede não devolve resultado imediatamente, então envolvemos em `Promise` e usamos `await`.

### (d) Cores no terminal

Sem biblioteca. Terminais interpretam sequências de escape ANSI: `\u001b[32m` liga verde, `\u001b[0m` desliga.

```js
const usarCor = process.stdout.isTTY;   // desliga cor quando a saída vai para um log de CI
const pintar = (c, t) => (usarCor ? `\u001b[${c}m${t}\u001b[0m` : t);
```

O `isTTY` é o detalhe que separa um script de aula de um script de produção: dentro da pipeline, os códigos de cor virariam lixo no log.

### Decisão de projeto: aviso × falha

| Situação | Classificação | Motivo |
|---|---|---|
| ferramenta ausente | **falha** | impede o trabalho |
| versão abaixo da mínima | **falha** | comportamento imprevisível |
| `.nvmrc` divergente | **falha** | quebra a paridade entre máquinas |
| `.nvmrc` ausente | **aviso** | o time ainda não decidiu; não bloqueia |
| porta ocupada | **aviso** | pode ser o próprio projeto já rodando |

Só a falha derruba o código de saída. Uma verificação que reprova por motivo irrelevante é ignorada pelo time em duas semanas — e verificação ignorada é pior do que verificação inexistente, porque dá falsa sensação de controle.

---

## B8. Fluxo completo de Pull Request

```bash
git checkout main && git pull
git checkout -b docs/perfil-ana

# criar docs/time/ana.md (modelo em repo-modelo/docs/time/EXEMPLO-perfil.md)

git add docs/time/ana.md
git commit -m "docs: adiciona perfil de Ana ao time"
git push -u origin docs/perfil-ana
```

O `push` imprime um link direto para abrir o Pull Request. Abra-o, preencha o modelo e peça revisão a um colega.

**Comentários sobre cada passo:**

- **`git checkout main && git pull` antes de criar a branch.** Partir de uma `main` desatualizada gera conflitos evitáveis. Este é o passo que mais se esquece.
- **`-u` no primeiro push.** Vincula a branch local à remota; nos próximos envios basta `git push`.
- **Nome da branch.** `docs/perfil-ana` segue o mesmo vocabulário do Conventional Commits. `minha-branch` ou `teste2` não dizem nada em uma lista com trinta branches.
- **Um PR, um assunto.** Se você aproveitou para "arrumar outra coisinha", o revisor precisa avaliar duas mudanças não relacionadas — e a rastreabilidade se perde.

**O que é um comentário útil de revisão.** Comparativo:

| Comentário inútil | Comentário útil |
|---|---|
| "aprovado" | "O arquivo está em `docs/time/`, correto. Sugiro incluir a disponibilidade fora de aula, como no exemplo — ajuda na hora de marcar a reunião do time." |
| "tá bom" | "A mensagem de commit está no padrão. Uma observação: o campo de papel diz 'talvez UX' — vale decidir agora, porque o papel entra no ACORDO.md." |
| "não gostei" | "Aqui você repetiu a informação do README. Sugiro remover daqui e deixar só num lugar, senão as duas versões vão divergir." |

Um comentário útil é **específico**, **acionável** e diz **por quê**.

---

# Lista C — Desafios

---

## C1. `doctor` que conhece o time

```js
function conferirGit(chave, rotulo) {
  try {
    const valor = execSync(`git config --global --get ${chave}`, {
      stdio: ["ignore", "pipe", "ignore"],
    }).toString().trim();
    if (!valor) throw new Error("vazio");
    console.log(`OK    ${rotulo.padEnd(12)} ${valor}`);
    return true;
  } catch {
    console.log(
      `FALHA ${rotulo.padEnd(12)} nao configurado -> git config --global ${chave} "..."`
    );
    return false;
  }
}

if (!conferirGit("user.name", "git user")) falhas++;
if (!conferirGit("user.email", "git email")) falhas++;
```

**Por que isso vale um desafio.** O nome e o e-mail do Git entram em **cada commit** e são a base do fator de contribuição individual da nota. Quem trabalha a semana toda com `user.email` errado aparece no histórico como outra pessoa — e descobrir isso na Sprint 3 é tarde. A mensagem de falha traz o comando de correção porque uma verificação que só diz "está errado" transfere o trabalho para quem já está travado.

**Refinamento possível:** validar o formato do e-mail com regex, ou avisar se o domínio não for institucional.

---

## C2. Script de preparação idempotente

```bash
#!/usr/bin/env bash
# setup.sh - prepara o ambiente do projeto.
# Idempotente: rodar duas vezes produz o mesmo resultado, sem erro.

set -euo pipefail
# -e  aborta no primeiro erro
# -u  trata variável não definida como erro
# -o pipefail  faz o pipe falhar se qualquer etapa falhar

echo "==> 1/4 versao do Node"
# IDEMPOTÊNCIA: apenas verifica; não instala nada por conta própria.
node -v

echo "==> 2/4 dependencias"
# IDEMPOTÊNCIA: npm ci apaga node_modules e reinstala a partir do lockfile.
# O resultado é sempre o mesmo, independentemente do estado anterior.
if [ -f package-lock.json ]; then
  npm ci
else
  npm install
fi

echo "==> 3/4 arquivo de ambiente"
# IDEMPOTÊNCIA: só copia se ainda não existir.
# Sem o teste, a segunda execução sobrescreveria o .env do desenvolvedor.
if [ ! -f .env ]; then
  cp .env.example .env
  echo "    .env criado a partir de .env.example"
else
  echo "    .env ja existe - preservado"
fi

echo "==> 4/4 verificacao"
npm run doctor
```

**O conceito.** Idempotência é a propriedade de uma operação produzir o mesmo estado final independentemente de quantas vezes for executada. Ela aparece três vezes aqui:

1. `npm ci` sempre parte do zero — não depende do que havia em `node_modules`;
2. o `if [ ! -f .env ]` impede que a segunda execução destrua configuração local;
3. nenhuma etapa **acrescenta** algo a um arquivo existente (`>>`), o que duplicaria linhas a cada execução.

**Por que isso importa além do exercício.** Todo script de implantação da Sprint 4 precisa ser idempotente: uma pipeline pode ser reexecutada por falha de rede, e a segunda execução não pode produzir um sistema diferente da primeira.

> **Erro comum:** usar `mkdir logs` em vez de `mkdir -p logs`. A segunda execução falha com "File exists" e derruba o script inteiro por causa do `set -e`.

---

## C3. Atalhos de Git do time

`docs/git-aliases.md`:

```bash
git config --global alias.s  "status -sb"
git config --global alias.l  "log --oneline --graph --decorate -20"
git config --global alias.ca "commit --amend --no-edit"
git config --global alias.up "!git checkout main && git pull"
git config --global alias.br "branch --sort=-committerdate"
```

| Atalho | Problema que resolve |
|---|---|
| `git s` | `git status` completo é verboso; `-sb` cabe na tela e mostra branch e situação em relação ao remoto |
| `git l` | o `log` padrão ocupa a tela inteira com poucos commits; a versão em grafo mostra a topologia das branches |
| `git ca` | corrigir o **último** commit local (arquivo esquecido) sem poluir o histórico com "fix do fix" — **só antes do push** |
| `git up` | o passo mais esquecido do fluxo é atualizar a `main` antes de criar branch; o `!` executa comando de shell, permitindo encadear |
| `git br` | com trinta branches, ordenar por data de último commit encontra a sua em segundos |

**Ressalva honesta.** Atalho acelera quem já entendeu o comando; para quem ainda está aprendendo, ele esconde o que está acontecendo. A recomendação do semestre é adotar os atalhos **a partir da Sprint 2**, quando o fluxo já estiver internalizado.

---

## C4. Medição honesta

**Como medir:**

```bash
docker pull postgres:16                       # tira o download da medição
time docker run --rm -d --name pg-c4 \
  -e POSTGRES_PASSWORD=dev -p 5432:5432 postgres:16

# esperar até o banco aceitar conexão de verdade:
time docker exec pg-c4 sh -c 'until pg_isready -U postgres; do sleep 0.2; done'
docker stop pg-c4
```

**Ordem de grandeza esperada:** com a imagem já baixada, poucos segundos até `pg_isready` responder positivamente. A instalação nativa envolve download do pacote, instalação, inicialização do cluster e configuração de autenticação — tipicamente vários minutos, e com passos que variam por sistema operacional.

**O que a medição honesta precisa registrar:**

1. **o primeiro `docker pull` não é rápido** — baixar a imagem leva tempo e banda. A vantagem aparece a partir da segunda vez e nas demais máquinas do time;
2. **iniciar o processo ≠ estar pronto para uso** — medir só até o `docker run` retornar superestima o ganho, porque o banco ainda está inicializando. Por isso a espera com `pg_isready`;
3. **o contêiner não é mais rápido "porque Docker é rápido"** — ele é mais rápido porque a imagem **já contém o banco instalado e configurado**. O trabalho foi feito antes, por outra pessoa, e é reaproveitado.

**Se o resultado contrariar a expectativa** — máquina com pouca memória, disco lento, antivírus inspecionando cada camada — registre assim mesmo. Medição que só é publicada quando confirma a hipótese não é medição: é ilustração. Esse critério vale para o relatório de performance da Sprint 5.
