# Consulta CPF - Aplicativo Flask

## Descrição
Este é um aplicativo para gerenciamento de clientes baseado em Flask. Ele permite buscar, cadastrar e remover clientes utilizando o CPF como identificador único.

## Funcionalidades
- Busca de clientes por CPF.
- Cadastro de novos clientes.
- Remoção de clientes.
- Interface web simples e responsiva.

## Estrutura do Projeto

```
consulta_CPF/
|-- App.py               # Arquivo principal do backend Flask
|-- templates/           # Arquivos HTML para renderização
|   |-- index.html
|-- static/              # Arquivos estáticos (CSS e JS)
|   |-- style.css
|   |-- script.js
|-- data/                # Arquivos de dados
|   |-- clients.json
```

## Requisitos
- Python 3.7 ou superior.
- Flask.

## Configuração do Ambiente

1. Clone o repositório:
   ```bash
   git clone https://github.com/usuario/repo.git
   cd consulta_CPF
   ```

2. Crie um ambiente virtual (opcional, mas recomendado):
   ```bash
   python -m venv venv
   source venv/bin/activate   # Linux/Mac
   venv\Scripts\activate     # Windows
   ```

3. Instale as dependências:
   ```bash
   pip install -r requirements.txt
   ```

4. Execute a aplicação:
   ```bash
   python App.py
   ```

5. Abra o navegador e acesse:
   ```
http://127.0.0.1:5000
```

## Detalhes das Funcionalidades
### Busca de Cliente
- Insira o CPF no campo de busca e clique no botão de lupa.
- Se o cliente for encontrado, os detalhes serão exibidos.

### Cadastro de Cliente
- Clique no botão "Cadastrar".
- Preencha todos os campos obrigatórios e conclua o cadastro.

### Remoção de Cliente
- Insira o CPF do cliente no campo de busca.
- Clique no botão "Remover".

## Melhorias Futuras
- Implementar autenticação de usuários.
- Validar os dados do cliente, como formato do CPF.
- Melhorar a interface usando frameworks como Bootstrap.
- Adicionar testes unitários para as rotas e lógica do aplicativo.

## Contribuição
Contribuições são bem-vindas! Para sugerir melhorias, abra uma issue ou envie um pull request.

## Licença
Este projeto está licenciado sob a MIT License. Veja o arquivo LICENSE para mais detalhes.

