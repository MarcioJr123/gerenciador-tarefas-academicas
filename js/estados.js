import {
    renderizarTarefas
} from "./renderizacao.js";


export function renderizarEstado(
    estado,
    tarefasVisiveis
) {

    const status =
        document.querySelector("#status");

    const quadro =
        document.querySelector("[data-quadro]");

    const busca =
        document.querySelector("#busca");

    const filtrosStatus =
        document.querySelectorAll('input[name="status"]');

    const filtrosPrioridade =
        document.querySelectorAll('input[name="prioridade"]');

    const ordenacao =
        document.querySelector("#ordenacao");


    busca.value = estado.busca;

    filtrosStatus.forEach((filtro) => {

        filtro.checked =
            filtro.value === estado.status;

    });


    filtrosPrioridade.forEach((filtro) => {

        filtro.checked =
            filtro.value === estado.prioridade;

    });


    ordenacao.value =
        estado.ordenacao;


    if (estado.carregamento === "carregando") {

        status.textContent =
            "Carregando tarefas...";

        return;
    }


    if (estado.carregamento === "erro") {

        status.textContent =
            estado.erro;

        return;
    }


    if (estado.carregamento === "vazio") {

        renderizarTarefas(
            [],
            quadro
        );

        status.textContent =
            "Não há tarefas cadastradas.";

        return;
    }


    renderizarTarefas(
        tarefasVisiveis,
        quadro
    );


    if (tarefasVisiveis.length === 0) {

        status.textContent =
            "Nenhuma tarefa encontrada para os critérios selecionados.";

        return;
    }


    status.textContent =
        `${tarefasVisiveis.length} de ${estado.tarefas.length} tarefas.`;
}
