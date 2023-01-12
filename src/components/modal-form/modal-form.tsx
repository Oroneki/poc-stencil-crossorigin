import { Component, Host, h, State, Prop, EventEmitter, Event } from '@stencil/core';

type Fase = 'TELA_BUSCA_PLACA' | 'LOADING' | 'TELA_CONFIRMA_PREÇO';

@Component({
  tag: 'modal-form',
  styleUrl: 'modal-form.css',
  shadow: true,
})
export class ModalForm {
  // @Prop onDone: (v: number)

  @Prop() callback: string;

  @State() fase: Fase = 'TELA_BUSCA_PLACA';
  @State() placa = '';
  @State() valor = 0;

  @Event({
    eventName: '__DONE__',
    bubbles: true,
  })
  ender: EventEmitter<number>;

  handlePlacaInput = ev => {
    console.log({ ev }, ev.path[0], ev.path[0].value);
    this.placa = ev.path[0].value;
  };

  handleBusca = () => {
    this.fase = 'LOADING';
    this.valor = 30000 + Math.floor(Math.random() * 100) * 100;
    setTimeout(() => (this.fase = 'TELA_CONFIRMA_PREÇO'), 500);
  };

  handleEnd = () => {
    if (this.callback) {
      let fnName = this.callback.replace('()', '');
      if (typeof window[fnName] === 'function') {
        window[fnName](this.valor);
        console.log('callback ok...', this.ender);
        this.ender.emit(this.valor);
      }
    }
  };

  render() {
    switch (this.fase) {
      case 'TELA_BUSCA_PLACA':
        return (
          <Host>
            <h3>Buscar placa</h3>
            <input type="text" maxLength={7} value={this.placa} onInput={this.handlePlacaInput}></input>
            <button disabled={this.placa.length !== 7} onClick={this.handleBusca}>
              Avaliar
            </button>
          </Host>
        );

      case 'TELA_CONFIRMA_PREÇO':
        return (
          <Host>
            <h3>Maior lance obtido!</h3>

            <span class="valor">{this.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>

            <button onClick={this.handleEnd}>Aceitar</button>
          </Host>
        );

      default:
        return (
          <Host>
            <progress />
          </Host>
        );
    }
  }
}
