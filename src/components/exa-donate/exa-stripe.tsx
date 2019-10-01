import { Component, State, h } from '@stencil/core';

@Component({
  tag: 'exa-stripe',
  styleUrl: 'exa-stripe.scss',
})
export class ExaStripe {
  @State() amount : number
  @State() isCheckout: Boolean

  private checkout;
  private kiosk;

  async setAmount(number) {
    this.amount = number
    this.isCheckout = true
  }

  // Static pieces: 
  renderHeader() {
    return [<div class="header"> 
      <h3>Donate</h3>
      <p>Support student journalism @ UW</p>
    </div>,<span class="charm">💙📰</span>]
  }

  renderNav() {

  }

  renderDisclaimer() {
    return [<div class="disclaimer">
      <p>The Badger Herald is a 501c(3). All donations tax deductable. EIN 39-1129947. See 990s here.</p>
      <p>Payments processed by Stripe.</p>
      </div>
    ]
  }

  // Content pieces: 
  renderKiosk() {
    if(this.isCheckout) {
      return
    }

    this.kiosk = <exa-donate-amount onAmountChanged={ev => {this.setAmount(ev.detail)}} />

    return this.kiosk
  }

  renderCheckout() {
    if(!this.isCheckout) {
      return;
    }

    this.checkout = <exa-donate-checkout amount={this.amount} onChangeAmount={_ => this.isCheckout = false} />
    this.checkout.amount = this.amount
    return this.checkout
  }

  render() {
    return (
      <div class="donate-form">
        {
          [
            this.renderHeader(),
            this.renderNav(),
            this.renderKiosk(),
            this.renderCheckout(),
            this.renderDisclaimer()
          ]
        }
      </div>
    )
  }
}
