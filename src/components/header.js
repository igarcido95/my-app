import { Link } from "gatsby"
import React from "react"
import './Header.css'
import StripeCheckout from 'react-stripe-checkout'

class Header extends React.Component {

  state = {
    hasScrolled: false
  }

  componentDidMount = () => {
    window.addEventListener('scroll', this.handleScroll)
  }

  handleScroll = (event) => {
    const scrollTop = window.pageYOffset

    if (scrollTop > 50) {
      this.setState({ hasScrolled: true })
    } else {
      this.setState({ hasScrolled: false })
    }
  }

  handlePurchase = (token) => {
    const amount = 100
    const description = "My awesome product"

    const bodyObject = {
      tokenId: token.id,
      email: token.email,
      name: token.name,
      description,
      amount
    }

    fetch('http://localhost:9000/stripe-charge', {
      method: 'POST',
      body: JSON.stringify(bodyObject)
    })
  }

  render() {
    return (
      <div className={this.state.hasScrolled ? 'Header HeaderScrolled' : 'Header'}>
        <div className="HeaderGroup">
          <Link to="/"><img src={require('../images/logo-white.png')} width="30" /></Link>
          <Link to="/contact-toni">Courses</Link>
          <Link to="/downloads">Downloads</Link>
          <Link to="/workshops">Workshops</Link>
          <StripeCheckout
            amount={100}
            image="https://cl.ly/8d921210be00/download/Square-logo.png"
            token={this.handlePurchase}
            stripeKey={'pk_test_847PLfBU5ftUhxIg5pHSEfld'}
            >
            <button>Buy</button>
          </StripeCheckout>
        </div>
      </div>
    )
  }
}

export default Header
