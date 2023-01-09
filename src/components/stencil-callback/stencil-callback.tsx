import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'stencil-callback',
  styleUrl: 'stencil-callback.css',
  shadow: true,
})
export class StencilCallback {
  render() {
    return (
      <Host>
        <button>click</button>
      </Host>
    );
  }
}
