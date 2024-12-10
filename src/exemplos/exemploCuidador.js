// Importando o serviço de cuidadores
import { servicoCuidador } from '../services/servicoCuidador';

// Exemplos de como usar o serviço de cuidadores

// 1. Criar um novo cuidador
async function exemploCriarCuidador() {
    const novoCuidador = {
        nome: "Maria Silva",
        email: "maria@exemplo.com",
        telefone: "(11) 98765-4321",
        cpf: "123.456.789-00",
        especializacao: "Cuidador de Idosos",
        experiencia: 5,
        disponibilidade: {
            segunda: ["09:00-17:00"],
            terca: ["09:00-17:00"],
            quarta: ["09:00-17:00"],
            quinta: ["09:00-17:00"],
            sexta: ["09:00-17:00"]
        },
        endereco: {
            rua: "Rua Exemplo",
            numero: "123",
            cidade: "São Paulo",
            estado: "SP",
            cep: "01234-567"
        },
        certificacoes: ["Certificado de Cuidador de Idosos"],
        valorHora: 50.00
    };

    try {
        const cuidadorCriado = await servicoCuidador.criarCuidador(novoCuidador);
        console.log("Cuidador criado com sucesso:", cuidadorCriado);
        return cuidadorCriado;
    } catch (erro) {
        console.error("Erro ao criar cuidador:", erro);
    }
}

// 2. Buscar todos os cuidadores
async function exemploListarCuidadores() {
    try {
        const cuidadores = await servicoCuidador.buscarTodosCuidadores();
        console.log("Lista de cuidadores:", cuidadores);
        return cuidadores;
    } catch (erro) {
        console.error("Erro ao listar cuidadores:", erro);
    }
}

// 3. Buscar cuidador por ID
async function exemploBuscarPorId(id) {
    try {
        const cuidador = await servicoCuidador.buscarCuidadorPorId(id);
        console.log("Cuidador encontrado:", cuidador);
        return cuidador;
    } catch (erro) {
        console.error("Erro ao buscar cuidador:", erro);
    }
}

// 4. Buscar por cidade
async function exemploBuscarPorCidade(cidade) {
    try {
        const cuidadores = await servicoCuidador.buscarPorCidade(cidade);
        console.log(`Cuidadores em ${cidade}:`, cuidadores);
        return cuidadores;
    } catch (erro) {
        console.error("Erro ao buscar cuidadores por cidade:", erro);
    }
}

// 5. Buscar por especialização
async function exemploBuscarPorEspecializacao(especializacao) {
    try {
        const cuidadores = await servicoCuidador.buscarPorEspecializacao(especializacao);
        console.log(`Cuidadores com especialização em ${especializacao}:`, cuidadores);
        return cuidadores;
    } catch (erro) {
        console.error("Erro ao buscar cuidadores por especialização:", erro);
    }
}

// 6. Atualizar dados do cuidador
async function exemploAtualizarCuidador(id, dadosAtualizados) {
    try {
        const cuidadorAtualizado = await servicoCuidador.atualizarCuidador(id, dadosAtualizados);
        console.log("Cuidador atualizado:", cuidadorAtualizado);
        return cuidadorAtualizado;
    } catch (erro) {
        console.error("Erro ao atualizar cuidador:", erro);
    }
}

// Exemplo de uso:
// Para usar estas funções, você pode chamá-las assim:

// Criar um novo cuidador
// exemploCriarCuidador();

// Listar todos os cuidadores
// exemploListarCuidadores();

// Buscar por cidade
// exemploBuscarPorCidade("São Paulo");

// Buscar por especialização
// exemploBuscarPorEspecializacao("Cuidador de Idosos");
