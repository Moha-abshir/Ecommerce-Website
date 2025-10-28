import{ it, expect, describe, vi } from 'vitest';
import { render, screen } from '@testing-library/react';//The screen object gives us methods to 'look at' the virtual web page created by render
import userEvent from '@testing-library/user-event';//It is used to simulate how a real user interacts with your application in a browser
import axios from 'axios';
import { Product } from './Product';

vi.mock('axios'); //When you are running a unit test for a component, you want to test only that component's logic in isolation. If your component makes a real API call during the test, it creates several major problems.

describe('Product Component', ()=>{
    it('displayes the product details correctly', ()=>{
        const product = {
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
            rating: {
                stars: 4.5,
                count: 87
            },
            priceCents: 1090,
            keywords: ["socks", "sports", "apparel"]
        }

        const loadCart = vi.fn() //Creates a fake function that doesn't do anything(mock). Using it, provides a harmless placeholder function to satisfy the components requirement without bringing in all the cart logic.
        //It keeps the test focused and isolated.
        
        //Since the original component has to run the two props, during the test, we also have to check if the two props has successfully been ran.
        render(<Product product={product} loadCart={loadCart}/>)

        //This searches the fake webpage for any HTML element with the exact text like the way the name of the porduct is specified below
        expect(
            screen.getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')
        ).toBeInTheDocument();

        expect(
            screen.getByText('$10.90')
        ).toBeInTheDocument();

        expect(
            screen.getByTestId('product-image')
        ).toHaveAttribute('src', 'images/products/athletic-cotton-socks-6-pairs.jpg')

        expect(
            screen.getByTestId('rating-image')
        ).toHaveAttribute('src', 'images/ratings/rating-45.png')

        expect(
            screen.getByText('87')
        ).toBeInTheDocument()
    })

    it('adds a product to the cart', async ()=>{
        const product =  {
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
            rating: {
                stars: 4.5,
                count: 87
            },
            priceCents: 1090,
            keywords: ["socks", "sports", "apparel"]
        }

        const loadCart = vi.fn()

        render(<Product product={product} loadCart={loadCart}/>);

        const user = userEvent.setup();
        const addToCartButton= screen.getByTestId('addToCartButton')

        //since user.click takes sometime to finish, it means it an asyncronous code. (it returns a promise)
        await user.click(addToCartButton);

        expect(axios.post).toHaveBeenCalledWith(
            '/api/cart-items',
            {
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1
            }
        );

        expect(loadCart).toHaveBeenCalled();
    })
})