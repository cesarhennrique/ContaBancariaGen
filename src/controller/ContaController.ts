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

    procurarPorNumero(numero: number): void {}

    atualizar(conta: Conta): void {}

    deletar(numero: number): void {}
    
    sacar(numero: number, valor: number): void {}

    depositar(numero: number, valor: number): void {}   

    transferir(numeroOrigem: number, numeroDestino: number, valor: number): void {}


    public gerarNumero(): number {
        return ++ this.numero;
    }


}
