import { Component, Host, h, State, Prop, EventEmitter, Event } from '@stencil/core';
import { placaValidator } from '../../utils/utils';

type Fase = 'TELA_BUSCA_PLACA' | 'LOADING' | 'TELA_CONFIRMA_PREÇO';

@Component({
  tag: 'modal-form',
  styleUrl: 'modal-form.css',
  shadow: true,
  assetsDirs: ['fotos'],
})
export class ModalForm {
  @Prop() callback: string;

  @State() fase: Fase = 'TELA_BUSCA_PLACA';
  @State() placa = '';
  @State() valor = 0;
  @State() errorMessage = '';

  @Event({
    eventName: '__DONE__',
    bubbles: true,
  })
  ender: EventEmitter<number>;

  handlePlacaInput = ev => {
    const placa = ev.target?.value ?? ev.path?.[0]?.value;
    this.placa = placa.toUpperCase?.();
    placaValidator
      .validate(this.placa)
      .then(p => (this.errorMessage = ''))
      .catch(err => {
        this.errorMessage = err.message;
      });
  };

  handleBusca = () => {
    this.fase = 'LOADING';
    this.valor = 30000 + Math.floor(Math.random() * 100) * 100;
    setTimeout(() => (this.fase = 'TELA_CONFIRMA_PREÇO'), 1000);
  };

  handleEnd = () => {
    if (this.callback) {
      let fnName = this.callback.replace('()', '');
      if (typeof window[fnName] === 'function') {
        window[fnName](this.valor);
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
            {this.errorMessage?.length > 0 && <span class="error">{this.errorMessage}</span>}
            <button disabled={this.placa.length !== 7 && this.errorMessage.length !== 0} onClick={this.handleBusca}>
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
