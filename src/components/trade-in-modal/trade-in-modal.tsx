import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'trade-in-modal',
  styleUrl: 'trade-in-modal.css',
  shadow: true,
})
export class TradeInModal {
  @Prop() callback: string;

  connectedCallback() {
    const div = document.createElement('div');
    div.setAttribute('id', 'modal');
    div.setAttribute(
      'style',
      `z-index: 999;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #00000068;
    display: flex;
    justify-content: center;
    align-items: center;`,
    );
    const modalForm = document.createElement('modal-form');
    modalForm.setAttribute('callback', this.callback);
    div.appendChild(modalForm);
    document.body.appendChild(div);
  }

  disconnectedCallback() {
    document.querySelector('#modal')?.remove();
  }

  render() {
    return null;
  }
}
