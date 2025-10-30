import { Fragment } from "react";
import { Link, useNavigate } from "react-router";
import axios from 'axios';
import dayjs from 'dayjs';

export function OrderProducts({ orderProducts, order, loadCart}){
    const navigate = useNavigate();

    const addBackToCart = async()=>{
        await axios.post('/api/cart-items',  {
            productId: orderProducts.productId,
            quantity: orderProducts.quantity
        } 
        );
        await loadCart();
        navigate('/checkout');
    }
    return(
        <Fragment >
            <div className="product-image-container">
                <img src={orderProducts.product.image} />
            </div>

            <div className="product-details">
                <div className="product-name">
                {orderProducts.product.name}
                </div>
                <div className="product-delivery-date">Arriving on: {dayjs(orderProducts.estimatedDeliveryTimeMs).format('MMMM D')}</div>
                <div className="product-quantity">Quantity: {orderProducts.quantity}</div>
                <button className="buy-again-button button-primary"  onClick={addBackToCart}>
                <img
                    className="buy-again-icon"
                    src="images/icons/buy-again.png"
                />
                <span className="buy-again-message" >Add to Cart</span>
                </button>
            </div>

            <div className="product-actions">
                <Link to={`/tracking/${order.id}/${orderProducts.product.id}`}>
                <button className="track-package-button button-secondary">
                    Track package
                </button>
                </Link>
            </div>
        </Fragment>
    )
}