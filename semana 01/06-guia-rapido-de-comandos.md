# Guia Rápido de Comandos — Semana 1

> Imprima e deixe ao lado do teclado nas primeiras semanas.

## nvm

| Comando | O que faz |
|---|---|
| `nvm install --lts` | instala a versão LTS mais recente |
| `nvm install 20` | instala uma versão específica |
| `nvm ls` | lista versões instaladas (`->` marca a ativa) |
| `nvm use 20` | troca a versão **desta sessão** |
| `nvm use` | lê o `.nvmrc` e troca |
| `nvm alias default lts/*` | define o padrão para novos terminais |

## npm

| Comando | O que faz |
|---|---|
| `npm init -y` | cria `package.json` com padrões |
| `npm pkg set type=module` | habilita `import`/`export` |
| `npm pkg set scripts.dev="node src/index.js"` | cria um script |
| `npm install <pkg>` | instala como dependência de produção |
| `npm install -D <pkg>` | instala como dependência de desenvolvimento |
| `npm ci` | instala exatamente o lockfile (usado na pipeline) |
| `npm run <script>` | executa um script declarado |
| `npm audit` | lista vulnerabilidades conhecidas |
| `npm outdated` | mostra o que está desatualizado |

## Git — o dia a dia

| Comando | O que faz |
|---|---|
| `git status` | onde eu estou |
| `git add <arquivo>` | prepara para o commit |
| `git commit -m "tipo: mensagem"` | grava no histórico local |
| `git push` | envia para o remoto |
| `git pull` | traz do remoto |
| `git log --oneline --graph --decorate` | histórico legível |
| `git diff` | o que mudou e não foi preparado |
| `git diff --staged` | o que está preparado |

## Git — branches e Pull Request

| Comando | O que faz |
|---|---|
| `git checkout main && git pull` | **sempre** antes de criar branch |
| `git checkout -b tipo/descricao` | cria e entra na branch |
| `git push -u origin tipo/descricao` | primeiro envio da branch |
| `git branch` | lista branches locais |
| `git merge <branch>` | integra uma branch na atual |
| `git merge --abort` | desiste de um merge em conflito |

## Git — configuração

```bash
git config --global user.name  "Seu Nome"
git config --global user.email "voce@fatec.sp.gov.br"
git config --global init.defaultBranch main
git config --global pull.rebase false
git config --list                       # confere tudo
```

## SSH

| Comando | O que faz |
|---|---|
| `ssh-keygen -t ed25519 -C "email"` | gera o par de chaves |
| `cat ~/.ssh/id_ed25519.pub` | exibe a chave **pública** (a que vai no GitHub) |
| `ssh -T git@github.com` | testa a autenticação |
| `rm -rf ~/.ssh` | remove as chaves (máquina compartilhada!) |

## Docker

| Comando | O que faz |
|---|---|
| `docker --version` | confere instalação |
| `docker compose version` | confere o plugin compose |
| `docker run --rm hello-world` | teste mínimo |
| `docker ps` / `docker ps -a` | contêineres ativos / todos |
| `docker images` | imagens baixadas |
| `docker logs <nome>` | saída do contêiner (o primeiro lugar a olhar) |
| `docker exec -it <nome> bash` | abre terminal dentro do contêiner |
| `docker stop <nome>` | encerra |
| `docker system df` | quanto espaço o Docker ocupa |

## Conventional Commits

```
feat:     nova funcionalidade
fix:      correção de defeito
docs:     apenas documentação
test:     testes
refactor: muda código sem mudar comportamento
chore:    infraestrutura, dependências, configuração
```

Verbo no presente · minúsculas · sem ponto final · até 72 caracteres.

## Antes de abrir o PR

```bash
npm run doctor                 # ambiente ok?
grep -rn "<<<<<<<" .           # sobrou marcador de conflito?
git status                     # esqueci de adicionar algo?
git log --oneline -5           # minhas mensagens estão no padrão?
```
