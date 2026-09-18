export async function carregarTarefas() {
    const resposta = await fetch("./dados.json");

    if (!resposta.ok) {
        const erro = new Error(`Erro HTTP: ${resposta.status}`);
        erro.name = "HTTPError";
        throw erro;
    }

    const dados = await resposta.json();

    if (!dados || !Array.isArray(dados.tarefas)) {
        throw new SyntaxError("Formato inválido dos dados.");
    }

    return dados.tarefas;
}