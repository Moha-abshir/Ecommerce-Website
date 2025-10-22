import { formatMoney } from "../../utils/money";

export function PaymentSummery({paymentSummery}){
    return(
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
    )
}