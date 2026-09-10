import { carregarTarefas } from "./api.js";

import {
    instalarEventosDoQuadro
} from "./renderizacao.js";

import {
    renderizarEstado
} from "./estados.js";


const estado = {
    tarefas: [],
    busca: "",
    status: "todos",
    prioridade: "todas",
    ordenacao: "nenhuma",
    carregamento: "carregando",
    erro: null
};


function derivarTarefas(estado) {

    const busca = estado.busca.trim().toLowerCase();

    let tarefasVisiveis = estado.tarefas.filter((tarefa) => {

        const correspondeBusca =
            tarefa.titulo.toLowerCase().includes(busca);

        const correspondeStatus =
            estado.status === "todos" ||
            tarefa.status === estado.status;

        const correspondePrioridade =
            estado.prioridade === "todas" ||
            tarefa.prioridade === estado.prioridade;

        return (
            correspondeBusca &&
            correspondeStatus &&
            correspondePrioridade
        );
    });


    if (estado.ordenacao === "prazo-crescente") {

        tarefasVisiveis = [...tarefasVisiveis].sort(
            (a, b) => a.prazo.localeCompare(b.prazo)
        );

    }


    if (estado.ordenacao === "prazo-decrescente") {

        tarefasVisiveis = [...tarefasVisiveis].sort(
            (a, b) => b.prazo.localeCompare(a.prazo)
        );

    }


    return tarefasVisiveis;
}


function atualizarTela() {

    const tarefasVisiveis = derivarTarefas(estado);

    renderizarEstado(
        estado,
        tarefasVisiveis
    );
}


function instalarEventosDosFiltros() {

    const busca = document.querySelector("#busca");

    const filtrosStatus =
        document.querySelectorAll('input[name="status"]');

    const filtrosPrioridade =
        document.querySelectorAll('input[name="prioridade"]');

    const ordenacao =
        document.querySelector("#ordenacao");

    const limparFiltros =
        document.querySelector("#limpar-filtros");


    busca.addEventListener("input", () => {

        estado.busca = busca.value;

        atualizarTela();

    });


    filtrosStatus.forEach((filtro) => {

        filtro.addEventListener("change", () => {

            estado.status = filtro.value;

            atualizarTela();

        });

    });


    filtrosPrioridade.forEach((filtro) => {

        filtro.addEventListener("change", () => {

            estado.prioridade = filtro.value;

            atualizarTela();

        });

    });


    ordenacao.addEventListener("change", () => {

        estado.ordenacao = ordenacao.value;

        atualizarTela();

    });


    limparFiltros.addEventListener("click", () => {

        estado.busca = "";
        estado.status = "todos";
        estado.prioridade = "todas";
        estado.ordenacao = "nenhuma";

        atualizarTela();

    });

}


async function iniciarAplicacao() {

    const quadro =
        document.querySelector("[data-quadro]");


    instalarEventosDosFiltros();

    instalarEventosDoQuadro(
        quadro,
        () => estado.tarefas
    );


    atualizarTela();


    try {

        const tarefas =
            await carregarTarefas();


        estado.tarefas = tarefas;

        estado.erro = null;


        if (tarefas.length === 0) {

            estado.carregamento = "vazio";

        } else {

            estado.carregamento = "sucesso";

        }


        atualizarTela();


    } catch (erro) {

        estado.carregamento = "erro";


        if (erro.name === "TypeError") {

            estado.erro =
                "Não foi possível carregar as tarefas. Verifique sua conexão.";

        } else if (erro.name === "HTTPError") {

            estado.erro =
                "Não foi possível carregar as tarefas. O servidor retornou um erro.";

        } else if (erro.name === "SyntaxError") {

            estado.erro =
                "Não foi possível carregar as tarefas porque o formato dos dados é inválido.";

        } else {

            estado.erro =
                "Não foi possível carregar as tarefas.";

        }


        atualizarTela();

    }

}


iniciarAplicacao();
