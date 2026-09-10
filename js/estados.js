import { renderizarTarefas } from "./renderizacao.js";

export function renderizarEstado(estado, dados) {
    const status = document.querySelector("#status");

    if (estado === "carregando") {
        status.textContent = "Carregando tarefas...";
        return;
    }

    if (estado === "sucesso") {
        const quadro = document.querySelector("[data-quadro]");

        renderizarTarefas(dados, quadro);

        status.textContent = `${dados.length} tarefas carregadas.`;
        return;
    }

    if (estado === "vazio") {
        const quadro = document.querySelector("[data-quadro]");

        renderizarTarefas([], quadro);

        status.textContent = "Não há tarefas cadastradas.";
        return;
    }

    if (estado === "erro") {
        status.textContent = dados;
    }
}