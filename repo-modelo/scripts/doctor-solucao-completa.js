/**
 * doctor-solucao-completa.js
 *
 * RESOLUCAO COMENTADA dos quatro desafios de extensao da Atividade Pratica 3.
 *
 *   a) Comparar a versao obtida com o minimo exigido e falhar se for menor
 *   b) Verificar se o .nvmrc existe e se bate com a versao de Node em uso
 *   c) Testar se a porta 5432 esta livre antes de subir o banco
 *   d) Colorir a saida: verde para OK, vermelho para FALHA
 *
 * Leia DEPOIS de tentar. O valor do exercicio esta na tentativa, nao na leitura.
 * Rode com: npm run doctor:completo
 */

import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { createServer } from "node:net";

/* ------------------------------------------------------------------ *
 * DESAFIO (d) - Cores no terminal
 *
 * Nao precisamos de biblioteca. Terminais entendem "codigos de escape ANSI":
 * a sequencia ESC[32m liga o verde, ESC[0m desliga tudo. Em JavaScript,
 * ESC se escreve como \u001b (ou \x1b).
 *
 * Encapsulamos em funcoes para nao espalhar codigo magico pelo arquivo.
 * O `process.stdout.isTTY` evita sujar a saida quando o script roda dentro
 * de uma pipeline de CI, que nao interpreta cor - detalhe que separa um
 * script de aula de um script de producao.
 * ------------------------------------------------------------------ */
const usarCor = process.stdout.isTTY;
const pintar = (codigo, texto) => (usarCor ? `\u001b[${codigo}m${texto}\u001b[0m` : texto);
const verde = (t) => pintar(32, t);
const vermelho = (t) => pintar(31, t);
const amarelo = (t) => pintar(33, t);
const cinza = (t) => pintar(90, t);

/* ------------------------------------------------------------------ *
 * DESAFIO (a) - Comparar versoes de verdade
 *
 * Armadilha classica: comparar versao como texto. "v9.0.0" > "v10.0.0"
 * e VERDADEIRO na comparacao alfabetica, porque "9" vem depois de "1".
 * Por isso extraimos os numeros e comparamos parte por parte.
 *
 * extrairVersao pega o primeiro padrao NUMERO.NUMERO.NUMERO da saida.
 * Isso resolve o fato de cada ferramenta imprimir num formato diferente:
 *   node -v        -> "v22.14.0"
 *   npm -v         -> "10.9.2"
 *   git --version  -> "git version 2.43.0"
 *   docker --version -> "Docker version 27.3.1, build ce12230"
 * ------------------------------------------------------------------ */
function extrairVersao(texto) {
  const m = texto.match(/(\d+)\.(\d+)\.(\d+)/);
  if (!m) return null;
  return [Number(m[1]), Number(m[2]), Number(m[3])];
}

/**
 * Devolve true se `atual` for maior ou igual a `minima`.
 * Compara major, depois minor, depois patch - a ordem do versionamento semantico.
 */
function versaoAtende(atual, minima) {
  for (let i = 0; i < 3; i++) {
    if (atual[i] > minima[i]) return true;   // ja ganhou nesta posicao
    if (atual[i] < minima[i]) return false;  // ja perdeu nesta posicao
    // empate nesta posicao: continua para a proxima
  }
  return true; // identicas
}

const checks = [
  { nome: "Node", cmd: "node -v", min: [20, 0, 0] },
  { nome: "npm", cmd: "npm -v", min: [10, 0, 0] },
  { nome: "Git", cmd: "git --version", min: [2, 30, 0] },
  { nome: "Docker", cmd: "docker --version", min: [24, 0, 0] },
];

let falhas = 0;
let avisos = 0;

console.log(cinza("\nVerificacao de ambiente - ISW-033\n"));

for (const c of checks) {
  try {
    const saida = execSync(c.cmd, { stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
    const versao = extrairVersao(saida);

    if (!versao) {
      // A ferramenta respondeu, mas nao no formato esperado.
      // Nao e falha: e incerteza. Tratamos como aviso para nao bloquear ninguem.
      console.log(`${amarelo("AVISO")} ${c.nome.padEnd(8)} ${saida} ${cinza("(nao consegui ler a versao)")}`);
      avisos++;
    } else if (!versaoAtende(versao, c.min)) {
      console.log(
        `${vermelho("FALHA")} ${c.nome.padEnd(8)} ${saida} ${cinza(`(minimo ${c.min.join(".")})`)}`
      );
      falhas++;
    } else {
      console.log(`${verde("OK   ")} ${c.nome.padEnd(8)} ${saida}`);
    }
  } catch {
    console.log(`${vermelho("FALHA")} ${c.nome.padEnd(8)} nao encontrado`);
    falhas++;
  }
}

/* ------------------------------------------------------------------ *
 * DESAFIO (b) - .nvmrc coerente com a versao em uso
 *
 * O .nvmrc so cumpre sua funcao se as pessoas realmente rodarem `nvm use`.
 * Aqui o script cobra isso: le o arquivo, compara com o major do Node ativo
 * e avisa quando divergem.
 *
 * Comparamos apenas o MAJOR de proposito: o .nvmrc costuma conter "22",
 * e exigir "22.14.0" exato criaria falso alarme a cada atualizacao de patch.
 * ------------------------------------------------------------------ */
if (!existsSync(".nvmrc")) {
  console.log(`${amarelo("AVISO")} ${".nvmrc".padEnd(8)} arquivo ausente - o time nao fixou a versao do Node`);
  avisos++;
} else {
  const desejada = readFileSync(".nvmrc", "utf8").trim().replace(/^v/, "");
  const majorDesejado = Number(desejada.split(".")[0]);
  const majorAtual = Number(process.versions.node.split(".")[0]);

  if (majorDesejado === majorAtual) {
    console.log(`${verde("OK   ")} ${".nvmrc".padEnd(8)} Node ${majorAtual} conforme o arquivo`);
  } else {
    console.log(
      `${vermelho("FALHA")} ${".nvmrc".padEnd(8)} projeto pede ${majorDesejado}, voce esta em ${majorAtual} ` +
        cinza("-> rode: nvm use")
    );
    falhas++;
  }
}

/* ------------------------------------------------------------------ *
 * DESAFIO (c) - A porta 5432 esta livre?
 *
 * A forma mais confiavel de descobrir se uma porta esta livre e TENTAR
 * ocupa-la. Nao existe consulta portavel entre Windows, macOS e Linux;
 * `lsof` e `netstat` mudam de sintaxe e nem sempre estao instalados.
 *
 * Entao: abrimos um servidor TCP na porta, e o resultado nos responde.
 *   - erro EADDRINUSE -> porta ocupada
 *   - abriu           -> porta livre (e fechamos imediatamente)
 *
 * Como a API de rede do Node e assincrona, envolvemos em uma Promise e
 * usamos await. Este e o primeiro contato do time com o modelo de execucao
 * que estudamos no slide de event loop.
 * ------------------------------------------------------------------ */
function portaLivre(porta) {
  return new Promise((resolve) => {
    const servidor = createServer();
    servidor.once("error", (err) => resolve(err.code !== "EADDRINUSE"));
    servidor.once("listening", () => servidor.close(() => resolve(true)));
    servidor.listen(porta, "127.0.0.1");
  });
}

const PORTAS = [
  { numero: 5432, uso: "PostgreSQL" },
  { numero: 3000, uso: "API (back-end)" },
  { numero: 5173, uso: "Front-end (Vite)" },
];

for (const p of PORTAS) {
  const livre = await portaLivre(p.numero);
  if (livre) {
    console.log(`${verde("OK   ")} ${String(p.numero).padEnd(8)} livre ${cinza(`(${p.uso})`)}`);
  } else {
    // Porta ocupada e AVISO, nao falha: pode ser o proprio projeto ja rodando.
    console.log(`${amarelo("AVISO")} ${String(p.numero).padEnd(8)} ocupada ${cinza(`(${p.uso})`)}`);
    avisos++;
  }
}

/* ------------------------------------------------------------------ *
 * Resumo e codigo de saida
 *
 * Regra de decisao: aviso nao derruba o ambiente, falha derruba.
 * Isso importa porque este mesmo script sera chamado pela pipeline na
 * Sprint 4 - e uma pipeline que falha por motivo irrelevante e ignorada
 * pelo time em duas semanas.
 * ------------------------------------------------------------------ */
console.log("");
if (falhas === 0 && avisos === 0) {
  console.log(verde("Ambiente pronto. Bom trabalho."));
} else if (falhas === 0) {
  console.log(amarelo(`Ambiente utilizavel, com ${avisos} aviso(s).`));
} else {
  console.log(vermelho(`${falhas} falha(s) e ${avisos} aviso(s). Resolva as falhas antes de seguir.`));
  console.log(cinza("Consulte aluno/04-troubleshooting.md"));
}
console.log("");

process.exit(falhas > 0 ? 1 : 0);
