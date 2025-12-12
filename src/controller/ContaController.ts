import { Conta } from "../model/Conta";
import { ContaRepository } from "../repository/ContaRepository";
import { colors } from "../util/Colors";

export class ContaController implements ContaRepository {

    private listaContas: Array<Conta> = new Array<Conta>();
    numero: number = 0;


    listarTodas(): void {
        for (let conta of this.listaContas) {
            conta.visualizar();
        }
    }
    cadastrar(conta: Conta): void {
        this.listaContas.push(conta);
        console.log(colors.fg.green, `\nConta Numero: ${conta.numero} foi criada com sucesso!\n`, colors.reset);
    }

    procurarPorNumero(numero: number): void {
        let buscaConta = this.buscarNoArray(numero);

        if (buscaConta != null) {
            buscaConta.visualizar();
        } else {
            console.log(colors.fg.red, `\nConta Numero: ${numero} nao encontrada!\n`, colors.reset);
        }
    }

    atualizar(conta: Conta): void {
        let buscaConta = this.buscarNoArray(conta.numero);

        if (buscaConta != null) {
            this.listaContas[this.listaContas.indexOf(buscaConta)] = conta;
            console.log(colors.fg.green, `\nConta Numero: ${conta.numero} foi atualizada com sucesso!\n`, colors.reset);

        } else {
            console.log(colors.fg.red, `\nConta Numero: ${conta.numero} nao encontrada!\n`, colors.reset);
        }

    }

    deletar(numero: number): void {
        let buscaConta = this.buscarNoArray(numero);

        if (buscaConta != null) {
            this.listaContas.splice(this.listaContas.indexOf(buscaConta), 1);
            console.log(colors.fg.green, `\nConta Numero: ${numero} foi deletada com sucesso!\n`, colors.reset);
        } else {
            console.log(colors.fg.red, `\nConta Numero: ${numero} nao encontrada!\n`, colors.reset);
        }
    }

    sacar(numero: number, valor: number): void {
        let conta = this.buscarNoArray(numero);

        if (conta != null) {
            if (conta.sacar(valor) == true)
                console.log(colors.fg.green, `\nO saque na conta corrente: ${numero} no valor de R$ ${valor.toFixed(2)} foi realizado com sucesso!\n`, colors.reset);

        } else {
            console.log(colors.fg.red, `\nConta Numero: ${numero} nao encontrada!\n`, colors.reset);
        }
    }

    depositar(numero: number, valor: number): void {
        let conta = this.buscarNoArray(numero);

        if (conta != null) {
            conta.depositar(valor);
            console.log(colors.fg.green, `\nO deposito na conta numero: ${numero} no valor de R$ ${valor.toFixed(2)} foi realizado com sucesso!\n`, colors.reset);
        } else {
            console.log(colors.fg.red, `\nConta Numero: ${numero} nao encontrada!\n`, colors.reset);
        }
    }

    transferir(numeroOrigem: number, numeroDestino: number, valor: number): void {
        let contaOrigem = this.buscarNoArray(numeroOrigem);
        let contaDestino = this.buscarNoArray(numeroDestino);

        if (contaOrigem != null && contaDestino != null) {
            if (contaOrigem.sacar(valor) == true) {
                contaDestino.depositar(valor);
                console.log(colors.fg.green, `\nA transferencia da conta numero: ${numeroOrigem} para a conta numero: ${numeroDestino} no valor de R$ ${valor.toFixed(2)} foi realizada com sucesso!\n`, colors.reset);
            }
        } else {
            console.log(colors.fg.red, `\nConta Numero: ${numeroOrigem} ou Conta Numero: ${numeroDestino} nao encontrada!\n`, colors.reset);
        }
    }


    public gerarNumero(): number {
        return ++this.numero;
    }

    public buscarNoArray(numero: number): Conta | null {

        for (let conta of this.listaContas) {
            if (conta.numero === numero)
                return conta;
        }

        return null;
    }

}