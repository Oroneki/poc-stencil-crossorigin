import { Component, Host, h, State, Prop } from '@stencil/core';

@Component({
  tag: 'trade-in-button',
  styleUrl: 'trade-in-button.css',
  shadow: true,
})
export class TradeInButton {
  @State() selectedValue = 0;
  @State() isOpenModal = false;

  private toggleModal = () => (this.isOpenModal = !this.isOpenModal);

  @Prop({ attribute: 'callback' }) onValueReceived: string;

  handleDone = ev => {
    console.log({ ev });
    this.selectedValue = ev.detail;
    this.isOpenModal = false;
  };

  handleReceiveValue = (value: number) => {
    this.selectedValue = value;
    this.isOpenModal = false;
  };

  connectedCallback() {
    console.log('button:', this.onValueReceived);
    window.addEventListener('__DONE__', this.handleDone);
  }

  render() {
    if (this.selectedValue > 0) {
      return <span class="val">CARRO DE TROCA -{this.selectedValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>;
    }

    if (!this.isOpenModal) {
      return (
        <Host>
          <button onClick={this.toggleModal}>Incluir carro de troca</button>
        </Host>
      );
    }

    return <trade-in-modal callback={this.onValueReceived}></trade-in-modal>;
  }
}
