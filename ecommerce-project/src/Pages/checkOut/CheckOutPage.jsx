import { Link } from "react-router-dom";
import dayjs from 'dayjs';
import axios from "axios";
import { useState, useEffect } from "react";
import { formatMoney } from "../../utils/money";
import "./checkout-header.css";
import "./CheckOutPage.css";

export function CheckOutPage({cart}) {
  const [deliveryOptions, setDeliveryOptions]= useState([]);
  const [paymentSummery, setPaymentSummery] = useState(null)

  useEffect(()=>{
    axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
    .then(res => setDeliveryOptions(res.data));

    axios.get('/api/payment-summary')
    .then((res)=>{setPaymentSummery(res.data)})
  } ,[]);
  return (
    <>
      <title>Checkout</title>
      <div className="checkout-header">
        <div className="header-content">
          <div className="checkout-header-left-section">
            <Link to="/">
              <img className="logo" src="images/logo.png" />
              <img className="mobile-logo" src="images/mobile-logo.png" />
            </Link>
          </div>

          <div className="checkout-header-middle-section">
            Checkout (
            <Link className="return-to-home-link" to="/">
              3 items
            </Link>
            )
          </div>

          <div className="checkout-header-right-section">
            <img src="images/icons/checkout-lock-icon.png" />
          </div>
        </div>
      </div>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <div className="order-summary">
            {deliveryOptions.length> 0 && cart.map((cartItem)=>{
              const selectedDeliveryOption = deliveryOptions.find((deliveryOption)=>{
                return deliveryOption.id === cartItem.deliveryOptionId
              });
              return(
                
                <div className="cart-item-container" key={cartItem.productId}>
                  <div className="delivery-date">
                    Delivery date: {dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                  </div>

                  <div className="cart-item-details-grid">
                    <img
                      className="product-image"
                      src={cartItem.product.image}
                    />

                    <div className="cart-item-details">
                      <div className="product-name">
                        {cartItem.product.name}
                      </div>
                      <div className="product-price">{formatMoney(cartItem.product.priceCents)}</div>
                      <div className="product-quantity">
                        <span>
                          Quantity: <span className="quantity-label">{cartItem.quantity}</span>
                        </span>
                        <span className="update-quantity-link link-primary">
                          Update
                        </span>
                        <span className="delete-quantity-link link-primary">
                          Delete
                        </span>
                      </div>
                    </div>

                    <div className="delivery-options">
                      <div className="delivery-options-title">
                        Choose a delivery option:
                      </div>


                      {deliveryOptions.map((deliveryOption)=>{
                        let priceString = 'FREE Shipping';

                        if (deliveryOption.priceCents > 0){
                          priceString = `${formatMoney(deliveryOption.priceCents)} - Shipping`
                        }

                        return(
                          <div className="delivery-option" key={deliveryOption.id}>
                            <input
                              type="radio"
                              checked={deliveryOption.id === cartItem.deliveryOptionId}
                              className="delivery-option-input"
                              name={`delivery-option-${cartItem.productId}`}
                            />
                            <div>
                              <div className="delivery-option-date">
                                {dayjs(deliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
                                
                              </div>
                              <div className="delivery-option-price">{priceString}</div>
                            </div>
                          </div>
                        );
                      })}

                    </div>
                  </div>
                </div>
              )
            })}

          </div>

          <div className="payment-summary">
            <div className="payment-summary-title">Payment Summary</div>

            {paymentSummery && (

              <>
                <div className="payment-summary-row">
                  <div>Items ({paymentSummery.totalItems}):</div>
                  <div className="payment-summary-money">{formatMoney(paymentSummery.productCostCents)}</div>
                </div>

                <div className="payment-summary-row">
                  <div>Shipping &amp; handling:</div>
                  <div className="payment-summary-money">{formatMoney(paymentSummery.shippingCostCents)}</div>
                </div>

                <div className="payment-summary-row subtotal-row">
                  <div>Total before tax:</div>
                  <div className="payment-summary-money">{formatMoney(paymentSummery.totalCostBeforeTaxCents)}</div>
                </div>

                <div className="payment-summary-row">
                  <div>Estimated tax (10%):</div>
                  <div className="payment-summary-money">{formatMoney(paymentSummery.taxCents)}</div>
                </div>

                <div className="payment-summary-row total-row">
                  <div>Order total:</div>
                  <div className="payment-summary-money">{formatMoney(paymentSummery.totalCostCents)}</div>
                </div>

                <button className="place-order-button button-primary">
                  Place your order
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
