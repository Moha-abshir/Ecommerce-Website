import dayjs from 'dayjs';
import { DeliveryOptions } from './DeliveryOptions';
import { CartItemDetails } from './CartItemDetails';
export function OrderSummery({deliveryOptions, cart, loadCart}){
    return(
      <div className="order-summary">
        {deliveryOptions.length> 0 && cart.map((cartItem)=>{
          const selectedDeliveryOption = deliveryOptions.find((deliveryOption)=>{
            return deliveryOption.id === cartItem.deliveryOptionId});


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
                <CartItemDetails cartItem={cartItem} loadCart={loadCart}/>


                <DeliveryOptions deliveryOptions={deliveryOptions} cartItem={cartItem} loadCart={loadCart}/>
              </div>
            </div>
          )
        })}

        </div>
    )
}