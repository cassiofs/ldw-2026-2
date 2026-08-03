# Troubleshooting — Semana 1

> Antes de pedir ajuda: leia a mensagem **inteira**, procure a **última linha** do erro,
> formule **uma hipótese** e teste. Depurar é competência avaliada na rubrica.
>
> Este arquivo é vivo: encontrou um caso novo? Abra um PR acrescentando a linha.

---

## Ambiente e Node

### `nvm: command not found`
**Causa.** O terminal não recarregou o perfil depois da instalação.
**Solução.** Feche e reabra o terminal. Se persistir: `source ~/.bashrc` (ou `~/.zshrc` no macOS).
**Se ainda assim falhar.** Confirme que o instalador acrescentou o bloco do nvm ao final do arquivo de perfil: `tail -5 ~/.bashrc`.

### `nvm use` funciona, mas ao abrir outro terminal volta a versão antiga
**Causa.** Não é defeito: `nvm use` vale só para a sessão atual.
**Solução.** Para mudar o padrão: `nvm alias default lts/*`. Para o projeto: `.nvmrc` + `nvm use` ao entrar na pasta.

### `SyntaxError: Cannot use import statement outside a module`
**Causa.** O `package.json` não declara `"type": "module"`.
**Solução.** `npm pkg set type=module` — ou renomeie o arquivo para `.mjs`.

### `EACCES: permission denied` ao instalar pacote
**Causa.** O npm está tentando escrever em diretório do sistema.
**Solução.** **Não use `sudo`.** Com nvm, o Node vive no seu perfil. Se você já usou `sudo` antes, corrija o dono: `sudo chown -R $(whoami) ~/.npm ~/.nvm`.

### `node: command not found` só dentro do VS Code
**Causa.** O terminal integrado abriu com outro perfil de shell, sem o nvm carregado.
**Solução.** No Windows, use o perfil `Ubuntu (WSL)`. Em geral, feche e reabra o VS Code **a partir do terminal** já configurado: `code .`.

---

## Git e GitHub

### `Permission denied (publickey)`
**Causa.** Chave SSH ausente, não cadastrada ou diferente da usada pelo repositório.
**Solução.** Teste com `ssh -T git@github.com`. Se falhar, confira se `~/.ssh/id_ed25519.pub` existe e se o conteúdo **completo** está em GitHub → Settings → SSH and GPG keys.

### `fatal: not a git repository`
**Causa.** Você está fora da pasta do projeto.
**Solução.** `cd` para o diretório clonado. Confirme com `git status`.

### `Updates were rejected (non-fast-forward)`
**Causa.** A branch remota avançou desde o seu último `pull`.
**Solução.** `git pull` e resolva o eventual conflito localmente; depois `git push`.
**Nunca** resolva com `git push --force` em branch compartilhada: isso apaga o trabalho de outra pessoa.

### `Author identity unknown`
**Causa.** `user.name` e `user.email` não configurados.
**Solução.** `git config --global user.name "Seu Nome"` e `git config --global user.email "voce@fatec.sp.gov.br"`.

### Commitei com o e-mail errado
**Causa.** Configuração feita depois dos primeiros commits.
**Solução.** Corrija a configuração e, apenas para o **último commit ainda não enviado**: `git commit --amend --reset-author --no-edit`. Commits já enviados ficam como estão — reescrever histórico compartilhado causa mais dano que o erro.

### O merge deixou `<<<<<<<` no arquivo
**Causa.** Conflito resolvido pela metade: os marcadores não foram apagados.
**Solução.** Abra o arquivo, apague `<<<<<<<`, `=======` e `>>>>>>>`, deixe o conteúdo final correto, `git add` e `git commit`.
**Prevenção.** `grep -rn "<<<<<<<" .` antes de commitar.

### Não consigo dar merge no meu próprio PR
**Causa.** Não é defeito: a branch `main` está protegida e exige uma aprovação.
**Solução.** Peça revisão a um colega. Regra do semestre: ninguém aprova o próprio PR.

---

## Docker

### `Cannot connect to the Docker daemon`
**Causa.** Serviço parado, ou seu usuário fora do grupo `docker`.
**Solução.** Windows/macOS: abra o Docker Desktop e espere ficar verde. Linux: `sudo systemctl start docker` e `sudo usermod -aG docker $USER`, depois **encerre a sessão e entre de novo**.

### `port is already allocated`
**Causa.** Outro processo já ocupa a porta publicada.
**Solução.** Publique em outra porta (`-p 5433:5432`) ou encerre o processo anterior (`docker ps` → `docker stop <nome>`).

### O contêiner sobe e cai imediatamente
**Causa.** O processo principal terminou — quase sempre por variável de ambiente obrigatória ausente.
**Solução.** `docker logs <nome>` mostra o motivo. No caso do PostgreSQL, falta `POSTGRES_PASSWORD`.

### Perdi os dados do banco ao reiniciar o contêiner
**Causa.** Sem volume, a camada de escrita do contêiner é descartada.
**Solução.** Declare um volume nomeado (faremos isso no `docker-compose.yml` da Sprint 1). Para o exercício da Semana 1, o comportamento é o esperado.

### WSL2 não instala no Windows
**Causa mais frequente.** Virtualização desabilitada na BIOS/UEFI.
**Solução.** Habilite `Intel VT-x` ou `AMD-V` na BIOS. Confirme no Gerenciador de Tarefas → Desempenho → CPU → "Virtualização: Habilitada".

---

## npm

### `npm ERR! code ELIFECYCLE` ao rodar um script
**Causa.** O comando dentro do script terminou com código diferente de zero.
**Solução.** Leia as linhas **acima** do erro do npm: a causa real está lá. O npm apenas repassa a falha.

### `npm audit` acusa vulnerabilidades e `npm audit fix` não resolve
**Causa.** A correção exige mudança de versão maior de alguma dependência.
**Solução.** Avalie caso a caso. `npm audit fix --force` pode quebrar o projeto — registre a decisão em ADR antes de usar.

---

## Quando nada disso resolve

Abra uma issue no repositório da turma usando o modelo **Impedimento**, com:

1. o que você estava tentando fazer;
2. a mensagem de erro **completa**, colada como texto (não como imagem);
3. o que já tentou;
4. a saída de `npm run doctor`.

Um relato assim costuma ser respondido em minutos. "Não funciona" não é relato.
