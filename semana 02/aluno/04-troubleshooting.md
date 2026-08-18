# Troubleshooting — Semana 2

> Antes de pedir ajuda: releia a história ou o critério em voz alta, confira contra
> o checklist correspondente (INVEST, DoR, DoD) e formule uma hipótese do que falta.

---

## Histórias de usuário e backlog

### "Não conseguimos escrever o 'para que' da história"
**Causa.** Provavelmente a solução foi decidida antes do problema ser entendido — sintoma de pular direto para o bloco 4 (Solução) do Lean Canvas sem fechar o bloco 1 (Problema).
**Solução.** Volte ao Lean Canvas. Se o bloco Problema estiver vago, o "para que" da história também vai estar.

### "Toda história do nosso backlog está virando Must have"
**Causa.** Falta aplicar a pergunta de corte a cada uma.
**Solução.** Para cada Must have, pergunte: "se esta história não existisse, o produto ainda resolveria o problema central da persona?" Se sim, rebaixe para Should have.

### "Não sabemos estimar a história, mesmo pequena"
**Causa.** Frequentemente é sintoma de ambiguidade técnica, não de tamanho — a letra que falha é *Estimable*, não necessariamente *Small*.
**Solução.** Tentem responder: "que decisão técnica falta tomar antes de começar?" Se houver uma decisão de arquitetura pendente, registrem-na e adiem a estimativa até resolvê-la.

### "Escrevemos o critério de aceite, mas ele só repete a história"
**Causa.** O critério não acrescentou nenhum detalhe verificável novo.
**Solução.** Pergunte: que número, prazo, ou condição de borda está faltando? Um bom critério quase sempre tem um valor concreto (tempo, quantidade, estado) que a história em si não define.

---

## GitHub Projects

### O card não aparece no quadro depois de criar a Issue
**Causa.** A Issue foi criada no repositório, mas não foi adicionada ao Project.
**Solução.** No quadro, use "+ Add item" e busque a Issue pelo nome, ou adicione o projeto como destino ao criar a Issue.

### A automação "Issue fechada → Concluído" não está funcionando
**Causa mais comum.** A automação foi criada, mas aplicada ao Project errado, ou a Issue não está de fato vinculada ao Project (mesmo problema do item acima).
**Solução.** Settings do Project → Workflows → confira se a regra está **ativa** (não apenas criada) e testável com uma Issue de teste.

### Não aparece o campo "Papel responsável" ao criar uma Issue
**Causa.** Campos personalizados de um Project não aparecem automaticamente na Issue — eles são preenchidos **dentro do quadro**, não no formulário de criação da Issue.
**Solução.** Crie a Issue normalmente, depois abra-a dentro do Project e preencha os campos ali.

---

## Fluxo Git e conflito de merge

### "O merge deu conflito e não sabemos por onde começar"
**Solução.** Primeiro, respire: conflito é rotina, não erro grave. Abra o arquivo indicado na mensagem `CONFLICT`. Localize os três marcadores. Leia as duas versões antes de decidir. Edite mantendo apenas o conteúdo final desejado — nunca os marcadores.

### Esqueci de apagar um marcador `<<<<<<<` e já fiz commit
**Causa.** Resolução incompleta, sem revisão final do arquivo.
**Solução.** Se ainda não deu push: edite o arquivo, remova o marcador, e `git commit --amend`. Se já deu push (mas ainda sem PR aprovado): edite, commit novo, push normal — não precisa reescrever histórico para isso.
**Prevenção.** Sempre rode `grep -rn "<<<<<<<" .` antes de considerar o conflito resolvido.

### `git merge main` diz "Already up to date", mas devia ter conflito
**Causa provável.** Você está numa branch desatualizada em relação ao que pensa, ou já integrou a `main` antes sem perceber.
**Solução.** Confira com `git log --oneline --graph -10` se a mudança da outra pessoa já está no seu histórico.

### O Pull Request não fechou a Issue automaticamente
**Causa.** A palavra-chave de fechamento (`Closes`, `Fixes`, `Resolves`) não foi usada, ou o número da Issue está incorreto, ou a Issue pertence a outro repositório.
**Solução.** Edite a descrição do PR, confirme o número exato da Issue (não confunda com número de outro PR) e confira se o link ficou destacado automaticamente pelo GitHub — se não ficou azul/clicável, a sintaxe está errada.

---

## Quando nada disso resolve

Abra uma issue com o modelo **Impedimento** (mesmo modelo da Semana 1), descrevendo:
1. o que o time estava tentando fazer;
2. em que ponto do fluxo (Lean Canvas, backlog, quadro, ou Git) travou;
3. o que já foi tentado.
