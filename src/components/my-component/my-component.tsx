import { Component, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'stencil-outra-origem',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class StencilOutraOrigem {
  constructor() {
    this.handleMessage = this.handleMessage.bind(this);
    this.send = this.send.bind(this);
  }

  connectedCallback() {
    window.addEventListener('message', this.handleMessage);
  }

  disconnectedCallback() {
    window.removeEventListener('message', this.handleMessage);
  }

  @State() lastOrigin = 'oi';
  @State() bgColor = 'rgb(0, 38, 53)';

  @Prop() callback = () => null;

  private lastWinRef;

  handleMessage(event) {
    this.lastOrigin = event.origin;
    this.lastWinRef = event.source;
    this.bgColor = 'rgb(165, 38, 0)';
    setTimeout(() => (this.bgColor = 'rgb(0, 38, 53)'), 150);
  }

  send() {
    if (!this.lastWinRef) return;
    this.lastWinRef.postMessage({ resposta: 'PONG' }, '*');
  }

  render() {
    return (
      <div class="outer">
        <span class="title">Componente Stencil</span>
        <span class="origin">{window.location.origin}</span>
        <div class="ce" style={{ backgroundColor: this.bgColor }}>
          <div class="button" onClick={this.send}>
            {this.lastOrigin}
          </div>
        </div>
      </div>
    );
  }
}
