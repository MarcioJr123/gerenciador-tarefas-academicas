import { carregarTarefas } from "./api.js";
import { instalarEventosDoQuadro } from "./renderizacao.js";
import { renderizarEstado } from "./estados.js";

async function iniciarAplicacao() {
    const quadro = document.querySelector("[data-quadro]");

    renderizarEstado("carregando");

    try {
        const tarefas = await carregarTarefas();

        instalarEventosDoQuadro(quadro, tarefas);

        if (tarefas.length === 0) {
            renderizarEstado("vazio", tarefas);
            return;
        }

        renderizarEstado("sucesso", tarefas);

    } catch (erro) {

        if (erro.name === "TypeError") {
            renderizarEstado(
                "erro",
                "Não foi possível carregar as tarefas. Verifique sua conexão."
            );
            return;
        }

        if (erro.name === "HTTPError") {
            renderizarEstado(
                "erro",
                "Não foi possível carregar as tarefas. O servidor retornou um erro."
            );
            return;
        }

        if (erro.name === "SyntaxError") {
            renderizarEstado(
                "erro",
                "Não foi possível carregar as tarefas porque o formato dos dados é inválido."
            );
            return;
        }

        renderizarEstado(
            "erro",
            "Não foi possível carregar as tarefas."
        );
    }
}

iniciarAplicacao();