async function buscarCliente() {
    const cpfInput = document.getElementById("cpfInput").value;

    if (!cpfInput) {
        alert("Por favor, insira um CPF.");
        return;
    }

    try {
        // Fazendo a requisição ao backend
        const response = await fetch(`/buscar_cliente?cpf=${cpfInput}`);
        const result = await response.json();

        const resultadoContainer = document.getElementById("resultado");
        const notFoundMessage = document.getElementById("notFoundMessage");

        // Verificando a resposta
        if (response.ok) {
            resultadoContainer.innerHTML = `
                <div id="dataContainer">
                    <p id="cpfSuccess">
                        Cliente encontrado:
                    </p>
                    <p>
                        <strong>Nome:</strong> ${result.Nome}
                    </p>
                    <p>
                        <strong>DN:</strong> ${result.DN}
                    </p>
                    <p>
                        <strong>Email:</strong> ${result.Email}
                    </p>
                    <p>
                        <strong>Phone:</strong> ${result.Phone}
                    </p>
                </div>
            `;
            // Esconde a mensagem "Cliente não encontrado!" se estiver visível
            notFoundMessage.classList.add('hidden');
        } else {
            // Exibe a mensagem "Cliente não encontrado!" temporariamente
            notFoundMessage.classList.remove('hidden');
            setTimeout(() => {
                notFoundMessage.classList.add('hidden');
            }, 3000); 

            resultadoContainer.innerHTML = ""; // Limpa qualquer resultado anterior
        }
    } catch (error) {
        console.error("Erro ao buscar cliente:", error);
        document.getElementById("resultado").innerHTML = `
            <p style="color: red;">Erro ao conectar ao servidor.</p>
        `;
    }
}


function cadastrarCliente() {
    // Esconde o contêiner principal e exibe o de cadastro
    document.getElementById("containerForms").classList.add("hidden");
    document.getElementById("registerContainer").classList.remove("hidden");
}

function voltarContainerPrincipal() {
    // Volta ao contêiner principal
    document.getElementById("registerContainer").classList.add("hidden");
    document.getElementById("containerForms").classList.remove("hidden");
}

async function concluirCadastro() {
    const cpf = document.getElementById("registerCpf").value.trim();
    const Nome = document.getElementById("registerName").value.trim();
    const DN = document.getElementById("registerBirthDate").value.trim();
    const Email = document.getElementById("registerEmail").value.trim();
    const Phone = document.getElementById("registerPhone").value.trim();

    if (!cpf || !Nome || !DN || !Email || !Phone) {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    const novoCliente = { cpf, Nome, DN, Email, Phone};

    try {
        const response = await fetch("/cadastrar_cliente", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(novoCliente)
        });

        if (response.ok) {
            alert("Cliente cadastrado com sucesso!");
            voltarContainerPrincipal();
        } else {
            const error = await response.json();
            alert(`Erro ao cadastrar cliente: ${error.message}`);
        }
    } catch (error) {
        console.error("Erro ao cadastrar cliente:", error);
        alert("Erro ao conectar ao servidor.");
    }
}

async function removerCliente() {
    const cpfInput = document.getElementById("cpfInput").value;

    if (!cpfInput) {
        alert("Por favor, insira um CPF.");
        return;
    }

    try {
        // Fazendo a requisição ao backend para remover o cliente
        const response = await fetch(`/remover_cliente?cpf=${cpfInput}`, {
            method: "DELETE"
        });
        
        const result = await response.json();
        
        if (response.ok) {
            alert("Cliente removido com sucesso!");
            document.getElementById("cpfInput").value = '';  // Limpar o campo
        } else {
            alert(`Erro ao remover cliente: ${result.error}`);
        }
    } catch (error) {
        console.error("Erro ao remover cliente:", error);
        alert("Erro ao conectar ao servidor.");
    }
}
