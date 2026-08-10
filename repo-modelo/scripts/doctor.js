/**
 * doctor.js - Verificador de ambiente (VERSAO BASE - Atividade Pratica 3, Semana 1)
 *
 * Objetivo: responder em um comando se esta maquina esta pronta para o projeto.
 * Rode com: npm run doctor
 *
 * Esta e a versao que voce digita em aula. A versao com os desafios de extensao
 * resolvidos esta em scripts/doctor-solucao-completa.js - NAO abra antes de tentar.
 */

import { execSync } from "node:child_process";

// Cada item descreve UMA ferramenta: como se chama e qual comando revela a versao.
const checks = [
  { nome: "Node", cmd: "node -v", min: "v20" },
  { nome: "npm", cmd: "npm -v", min: "10" },
  { nome: "Git", cmd: "git --version", min: "2" },
  { nome: "Docker", cmd: "docker --version", min: "2" },
];

let falhas = 0;

for (const c of checks) {
  try {
    // execSync roda o comando e devolve um Buffer com a saida padrao.
    // Se o comando nao existir ou terminar com erro, ele LANCA uma excecao -
    // e e exatamente esse comportamento que usamos como teste.
    const saida = execSync(c.cmd, { stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
    console.log(`OK    ${c.nome.padEnd(8)} ${saida}`);
  } catch {
    console.log(`FALHA ${c.nome.padEnd(8)} nao encontrado`);
    falhas++;
  }
}

// Codigo de saida: 0 = sucesso, qualquer outro = falha.
// E assim que a pipeline de integracao continua (Sprint 4) sabera se passou.
process.exit(falhas > 0 ? 1 : 0);
