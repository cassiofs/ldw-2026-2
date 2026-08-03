# Lista de Exercícios — Semana 1
## ISW-033 · Laboratório de Desenvolvimento Web

> **Como usar:** tente **todos** antes de abrir o gabarito (`03-gabarito-comentado.md`).
> O gabarito explica o raciocínio, não só a resposta — ele só ajuda depois da tentativa.
>
> **Entrega:** os exercícios da Lista B e o desafio escolhido da Lista C entram no seu
> Pull Request da Semana 1, na pasta `docs/exercicios/seu-nome.md`.
>
> **Tempo estimado:** Lista A 40 min · Lista B 90 min · Lista C 30 min por desafio.

---

## Lista A — Conceituais

### A1. Versão fixada
Seu time colocou `"22"` dentro do arquivo `.nvmrc` e o versionou no Git.
**(a)** Qual problema concreto esse arquivo evita?
**(b)** Um colega clonou o repositório, mas não rodou `nvm use`. O `.nvmrc` protege esse colega? Justifique.

### A2. Classificação de dependências
Classifique cada pacote como `dependencies` ou `devDependencies` e justifique em uma linha:

| Pacote | Para que serve |
|---|---|
| `express` | servidor HTTP da API |
| `vitest` | executor de testes |
| `pg` | driver de conexão com PostgreSQL |
| `eslint` | analisador estático de código |
| `dotenv` | leitura de variáveis de ambiente |
| `prettier` | formatador de código |

### A3. SemVer na prática
Uma dependência está declarada como `"express": "^4.19.2"`.
**(a)** O npm pode instalar a versão 4.20.0? E a 5.0.0? E a 4.19.1?
**(b)** Se a declaração fosse `~4.19.2`, o que mudaria?
**(c)** Duas pessoas do time rodaram `npm install` com uma semana de diferença e ficaram com versões diferentes do Express. Que arquivo evitaria isso, e por que ele precisa estar no Git?

### A4. Contêiner e máquina virtual
Assinale a alternativa **correta** e explique por que cada uma das outras está errada:

- **(a)** O contêiner é mais leve porque virtualiza menos hardware que a máquina virtual.
- **(b)** O contêiner é mais leve porque compartilha o núcleo do sistema operacional hospedeiro.
- **(c)** O contêiner é mais leve porque roda sempre com menos memória alocada.
- **(d)** Contêiner e máquina virtual são a mesma coisa, com nomes diferentes.

### A5. Onde está o meu arquivo?
Para cada situação, diga em qual das quatro áreas do Git o arquivo está e qual comando o move para a próxima:

**(a)** Você editou `README.md` no VS Code e salvou. Nada mais.
**(b)** Você rodou `git add README.md`.
**(c)** Você rodou `git commit -m "docs: ajusta README"`.
**(d)** Um colega abriu o GitHub e viu a sua alteração.

### A6. Autenticação SSH
Ao rodar `ssh -T git@github.com`, você recebe:

```
Hi cassiofs! You've successfully authenticated, but GitHub does not provide shell access.
```

**(a)** Isso é sucesso ou erro? Justifique.
**(b)** Qual das duas chaves (`id_ed25519` ou `id_ed25519.pub`) foi colada no GitHub, e por quê?
**(c)** Você está numa máquina compartilhada do laboratório. O que deve fazer ao final da aula, e por quê?

### A7. Código de saída
No `doctor.js`, a última linha é `process.exit(falhas > 0 ? 1 : 0)`.
**(a)** O que muda no comportamento do script se essa linha for removida?
**(b)** Por que isso importa para a pipeline de integração contínua da Sprint 4?

### A8. Mensagens de commit
Reescreva as cinco mensagens abaixo no padrão Conventional Commits, corrigindo o que houver de errado:

1. `Ajustes`
2. `Corrigido o bug do login que dava erro 500 quando o usuário não preenchia o campo de e-mail e clicava no botão entrar.`
3. `TESTE FINAL agora vai`
4. `feat: Adicionou a listagem de produtos.`
5. `subindo arquivos`

### A9. Definition of Done
Um colega diz: "terminei a funcionalidade de cadastro, está tudo funcionando na minha máquina, só falta escrever teste e subir para o GitHub". Segundo o Definition of Done do componente, quantos dos sete critérios estão comprovadamente atendidos? Liste quais faltam.

### A10. Privilégio administrativo
Um tutorial na internet manda rodar `sudo npm install -g nodemon`.
**(a)** Por que **não** devemos usar `sudo` com npm no nosso ambiente?
**(b)** Que decisão anterior, tomada na Semana 1, torna o `sudo` desnecessário?

---

## Lista B — Práticos no terminal

> Registre a saída dos comandos. Onde o exercício pedir "cole a saída", cole como **texto**, nunca como imagem.

### B1. Duas versões de Node
1. Instale a versão LTS e também a versão 20.
2. Liste o que está instalado.
3. Alterne para a 20 e comprove com `node -v`.
4. Volte para a LTS e comprove novamente.
5. Cole as saídas.

### B2. `.nvmrc` funcionando
1. Dentro do repositório do time, crie o `.nvmrc` com a versão maior do Node que o time adotou.
2. Troque manualmente para outra versão.
3. Rode `nvm use` sem argumento e mostre que ele voltou sozinho para a versão do arquivo.

### B3. Primeiro `package.json`
1. Crie uma pasta `laboratorio-b3` e rode `npm init -y`.
2. Habilite módulos ES.
3. Crie um script chamado `ola` que execute `node src/ola.js`.
4. Crie `src/ola.js` imprimindo seu nome e a versão do Node em execução.
5. Rode com `npm run ola` e cole a saída.

### B4. Histórico e retorno
1. Crie um repositório local novo com `git init`.
2. Faça três commits, cada um alterando o mesmo arquivo `notas.md`.
3. Exiba o histórico em uma linha por commit.
4. Volte o diretório de trabalho ao estado do **primeiro** commit, sem apagar os outros dois.
5. Retorne para o estado mais recente.
6. Cole as saídas de `git log --oneline` antes e depois.

### B5. Conflito de merge provocado
1. Na `main`, crie `time.md` com a linha `Responsavel: a definir` e faça commit.
2. Crie a branch `alteracao-a`, mude a linha para `Responsavel: Ana` e faça commit.
3. Volte para a `main`, crie a branch `alteracao-b` a partir dela, mude a **mesma linha** para `Responsavel: Bruno` e faça commit.
4. Volte para a `main`, integre a `alteracao-a` e depois tente integrar a `alteracao-b`.
5. Resolva o conflito mantendo **as duas** informações.
6. Cole o conteúdo do arquivo durante o conflito e depois de resolvido.

### B6. Banco em contêiner
1. Suba um PostgreSQL 16 em contêiner, com senha `dev`, publicando a porta 5432.
2. Em outro terminal, liste os contêineres em execução.
3. Conecte-se ao banco de dentro do próprio contêiner e execute `SELECT version();`.
4. Encerre o contêiner e comprove que ele não está mais na lista.
5. Explique, em duas linhas, o que sobrou instalado na sua máquina depois disso.

### B7. O verificador de ambiente
1. Escreva o `scripts/doctor.js` conforme a Atividade Prática 3 (digitando, não copiando).
2. Registre-o como script `doctor` no `package.json`.
3. Execute e cole a saída.
4. Mostre o código de saída do processo.
5. Implemente **pelo menos dois** dos quatro desafios de extensão:
   - **(a)** comparar a versão obtida com o mínimo exigido e falhar se for menor;
   - **(b)** verificar se o `.nvmrc` existe e bate com a versão de Node em uso;
   - **(c)** testar se a porta 5432 está livre;
   - **(d)** colorir a saída (verde para OK, vermelho para FALHA).

### B8. Fluxo completo de Pull Request
1. Partindo da `main` atualizada, crie a branch `docs/perfil-seunome`.
2. Crie `docs/time/seu-nome.md` com: nome, papel inicial, três pontos fortes e duas prioridades.
3. Faça commit com mensagem no padrão e envie para o remoto.
4. Abra o Pull Request preenchendo o modelo.
5. Revise o PR de **um colega**, deixando ao menos um comentário útil (não apenas "aprovado").
6. Cole o link do seu PR e o link do PR que você revisou.

---

## Lista C — Desafios (para quem terminar antes)

### C1. `doctor` que conhece o time
Faça o `doctor.js` verificar também se `user.name` e `user.email` do Git estão configurados, e falhar com mensagem útil caso não estejam.

### C2. Script de preparação idempotente
Escreva `scripts/setup.sh` que prepare o ambiente do projeto e possa ser executado **duas vezes seguidas sem causar erro nem efeito duplicado**. Explique em comentários onde está a idempotência.

### C3. Atalhos de Git do time
Proponha cinco `alias` de Git úteis para o fluxo do semestre, documente-os em `docs/git-aliases.md` e justifique cada escolha com o problema que ele resolve.

### C4. Medição honesta
Meça o tempo de subida do PostgreSQL em contêiner (`time docker run ...` até o banco aceitar conexão) e compare com o tempo estimado de instalar o PostgreSQL nativamente. Escreva um parágrafo com a conclusão — inclusive se o resultado contrariar a sua expectativa.
