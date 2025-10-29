import{ it, expect, describe, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';//The screen object gives us methods to 'look at' the virtual web page created by render
import { MemoryRouter } from 'react-router-dom'; //Specifically used for TESTING
import axios from 'axios';
import { HomePage } from './HomePage';

vi.mock('axios')

describe('HomePage component',()=>{
    let loadCart;

    beforeEach(()=>{
        loadCart = vi.fn();

        //MOCK IMPLEMENTATION = make the mock do whatever we want i.e: axios.get() to get some data
        axios.get.mockImplementation(async (urlPath)=>{
            //whenever we use axios.get, we are going to run this funciton thus does what we want i.e return some data
            if(urlPath==='/api/products'){
                return{
                    data:[{
                            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
                            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
                            rating: {
                                stars: 4.5,
                                count: 87
                            },
                            priceCents: 1090,
                            keywords: ["socks", "sports", "apparel"]
                        },
                        {
                            id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                            image: "images/products/intermediate-composite-basketball.jpg",
                            name: "Intermediate Size Basketball",
                            rating: {
                                stars: 4,
                                count: 127
                            },
                            priceCents: 2095,
                            keywords: ["sports", "basketballs"]
                        }
                    ]
                }
            }
        })
    })

    it('displayes the products correctlty',async()=>{
        render(
            <MemoryRouter>
                <HomePage cart={[]} loadCart={loadCart}/>
            </MemoryRouter>
        )

        //since the homepage starts with the cart being empty and then later on gets the item from the item, we need to wait fir the data to be fetched. Thats why we use findAllByTestId so that we can find after the items have been rendered
        const porductContainers = await screen.findAllByTestId('product-container');

        expect(porductContainers.length).toBe(2);

        expect(
            within (porductContainers[0]).getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')
        ).toBeInTheDocument()

        expect(
            within (porductContainers[1]).getByText('Intermediate Size Basketball')
        ).toBeInTheDocument()
    })
})