import { Component, Host, h, State, Prop } from '@stencil/core';

@Component({
  tag: 'trade-in-modal',
  styleUrl: 'trade-in-modal.css',
  shadow: true,
})
export class TradeInModal {
  @Prop() callback: string;

  connectedCallback() {
    console.log('OPEN');
    const div = document.createElement('div');
    div.setAttribute('id', 'modal');
    div.setAttribute(
      'style',
      `
    z-index: 999;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #0000007b;
    display: flex;
    justify-content: center;
    align-items: center;    
    `,
    );
    const modalForm = document.createElement('modal-form');
    console.log('callback', this.callback);
    modalForm.setAttribute('callback', this.callback);
    div.appendChild(modalForm);
    document.body.appendChild(div);
  }

  disconnectedCallback() {
    document.querySelector('#modal')?.remove();
  }

  render() {
    // if (this.selectedValue > 0) {
    //   return <span class="val">{this.selectedValue}</span>;
    // }

    return null;
  }
}
