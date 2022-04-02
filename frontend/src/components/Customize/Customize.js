import React, { useEffect, useState } from 'react'

import { useLocation } from "react-router-dom";
// import Navbar from '../Navbar/Navbar'
// import './Customize.css'
import styled from 'styled-components';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ButtonToggle from '@mui/material/ToggleButton'
import TextField from '@mui/material/TextField';

import Tshirt from '../Three/Tshirt'
import Tshirt2 from '../Three/Tshirt2';
import Hoodie from '../Three/Hoodie';
import Picker from '../Three/Picker';



const Customize = () => {


    const search = useLocation().search;
    const name = new URLSearchParams(search).get('brand');

    const tname = 'Half Sleeve'


    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    }

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    }

    const [text, setText] = useState("Add to Cart");

    const cartText = () => {
        setText("Added to cart")
    }

    const [size, setSize] = useState()

    //to set on localStorage

    const getLocalItems = () => {
        let order = localStorage.getItem('Orders')


        if (order) {
            return JSON.parse(localStorage.getItem('Orders'));
        }
        else {
            return [];
        }
    }

    const [items, setItems] = useState(getLocalItems())

    const addItems = () => {
        setItems([...items, [tname, size, quantity]])
    }

    //Adding data to local storage

    useEffect(() => {
        localStorage.setItem('Orders', JSON.stringify(items))
    }, [items]);


    const renderSwitch = (name) => {
        switch (name) {
            case 'T-Shirt':
                return <Tshirt />;
            case 'Sleeve':
                return <Tshirt2 />;
            default:
                return <Hoodie />;
        }
    }


    return (
        <>
            <br />
            <section className='container' >
                <div className="d-flex row " >
                    <div className="sections__left col-md-3"  >
                        <h4 style={{ fontWeight: 'bold' }}>
                            Customize it Yourself
                        </h4>
                        <h1 style={{ fontWeight: 'bold' }}>
                            T-Shirt
                        </h1>
                        <p style={{ fontWeight: 'bold' }}>Please select the appropriate size and color you want in your T-shirt</p>

                    </div>
                    <div className="sections__middle col-md-6" >
                        <div className="customize__product" style={{
                            height: '100%',
                            width: '100%',
                        }}>
                            {renderSwitch(name)}
                        </div>
                    </div>
                    <div className="sections__right col-md-3" >
                        <div className="customize__sizes " >
                            <h3 style={{ fontWeight: 'bold' }}>Sizes</h3>
                            <ButtonGroup variant="text" aria-label="text button group">
                                <Button onClick={() => setSize('XS')}>XS</Button>
                                <Button onClick={() => setSize('S')}>S</Button>
                                <Button onClick={() => setSize('M')}>M</Button>
                                <Button onClick={() => setSize('L')}>L</Button>
                                <Button onClick={() => setSize('XL')}>XL</Button>
                                <Button onClick={() => setSize('XXL')}>XXL</Button>
                            </ButtonGroup>
                            <h5 style={{ color: 'red' }}>{size}</h5>
                        </div>

                        <div className="customize__quantity">
                            <h3 style={{ fontWeight: 'bold' }}>Quantity</h3>

                            <div className="sizeButton">
                                <ButtonGroup variant="text" aria-label="text button group">
                                    <Button onClick={decreaseQuantity} style={{ fontWeight: 'bold', color: 'black' }}>-</Button>
                                    <Button onClick={increaseQuantity} style={{ fontWeight: 'bold', color: 'black' }}>+</Button>
                                </ButtonGroup>
                                <p style={{ fontWeight: 'bold', fontSize: '20px' }}>{quantity}</p>
                            </div>
                            <button className='btn btn-outline-primary addButton' /*onClick={cartText}*/ onClick={addItems} style={{ fontWeight: 'bold', color: 'black' }}> {text} </button>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}


export default Customize
