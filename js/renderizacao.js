export function criarCartao(tarefa) {
    const cartao = document.createElement("article");

    cartao.className = "cartao";
    cartao.dataset.tarefaId = tarefa.id;

    const titulo = document.createElement("h3");
    titulo.textContent = tarefa.titulo;

    const projeto = document.createElement("p");
    projeto.textContent = "Projeto: " + (tarefa.projeto || "Projeto acadêmico");

    const responsavel = document.createElement("p");
    responsavel.textContent = "Responsável: " + (tarefa.responsavel || "Não informado");

    const prioridade = document.createElement("p");
    prioridade.textContent = "Prioridade: " + tarefa.prioridade;

    const prazo = document.createElement("p");
    prazo.textContent = "Prazo: " + tarefa.prazo;

    const botao = document.createElement("button");
    botao.type = "button";
    botao.dataset.acao = "ver-detalhes";

    const textoBotao = document.createElement("span");
    textoBotao.textContent = "Ver detalhes";

    botao.append(textoBotao);

    cartao.append(
        titulo,
        projeto,
        responsavel,
        prioridade,
        prazo,
        botao
    );

    return cartao;
}


export function renderizarTarefas(tarefas, quadro) {
    const colunas = quadro.querySelectorAll("[data-lista-status]");

    colunas.forEach((lista) => {
        const status = lista.dataset.listaStatus;

        const tarefasDoStatus = tarefas.filter(
            (tarefa) => tarefa.status === status
        );

        const cartoes = tarefasDoStatus.map(criarCartao);

        lista.replaceChildren(...cartoes);

        if (tarefasDoStatus.length === 0) {
            const mensagem = document.createElement("li");
            mensagem.textContent = "Nenhuma tarefa neste status.";

            lista.append(mensagem);
        }
    });
}


export function instalarEventosDoQuadro(quadro, tarefas) {
    quadro.addEventListener("click", (evento) => {
        if (!(evento.target instanceof Element)) {
            return;
        }

        const botao = evento.target.closest(
            'button[data-acao="ver-detalhes"]'
        );

        if (!botao || !quadro.contains(botao)) {
            return;
        }

        const cartao = botao.closest("[data-tarefa-id]");

        if (!cartao) {
            return;
        }

        const tarefa = tarefas.find(
            (item) => item.id === cartao.dataset.tarefaId
        );

        if (!tarefa) {
            return;
        }

        console.log("Detalhes da tarefa:", tarefa);
    });
}