from flask import Flask, render_template, request, jsonify
import json
import os

app = Flask(__name__)

# Caminho para o arquivo JSON
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CLIENTS_FILE = os.path.join(BASE_DIR, "data", "clients.json")

def carregar_clientes():
    """Carrega os clientes do arquivo JSON."""
    if not os.path.exists(CLIENTS_FILE):
        return {}
    with open(CLIENTS_FILE, 'r', encoding='utf-8') as file:
        return json.load(file)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/buscar_cliente', methods=['GET'])
def buscar_cliente():
    cpf = request.args.get('cpf')
    if not cpf:
        return jsonify({"error": "CPF não fornecido!"}), 400

    clientes = carregar_clientes()
    cliente = clientes.get(cpf)
    if cliente:
        return jsonify(cliente)
    else:
        return jsonify({"error": "Cliente não encontrado!"}), 404

@app.route('/cadastrar_cliente', methods=['POST'])
def cadastrar_cliente():
    novo_cliente = request.get_json()
    cpf = novo_cliente.get("cpf")

    if not cpf:
        return jsonify({"message": "CPF é obrigatório"}), 400

    clientes = carregar_clientes()

    if cpf in clientes:
        return jsonify({"message": "Cliente já cadastrado"}), 409

    clientes[cpf] = {
        "Nome": novo_cliente.get("Nome"),
        "DN": novo_cliente.get("DN"),
        "Email": novo_cliente.get("Email"),
        "Phone": novo_cliente.get("Phone"),
    }

    with open(CLIENTS_FILE, "w", encoding="utf-8") as file:
        json.dump(clientes, file, indent=4, ensure_ascii=False)

    return jsonify({"message": "Cliente cadastrado com sucesso!"}), 200

@app.route('/remover_cliente', methods=['DELETE'])
def remover_cliente():
    cpf = request.args.get('cpf')
    if not cpf:
        return jsonify({"error": "CPF não fornecido!"}), 400

    clientes = carregar_clientes()
    
    if cpf in clientes:
        del clientes[cpf]
        
        with open(CLIENTS_FILE, "w", encoding="utf-8") as file:
            json.dump(clientes, file, indent=4, ensure_ascii=False)
        
        return jsonify({"message": "Cliente removido com sucesso!"}), 200
    else:
        return jsonify({"error": "Cliente não encontrado!"}), 404



if __name__ == '__main__':
    app.run(debug=True)
