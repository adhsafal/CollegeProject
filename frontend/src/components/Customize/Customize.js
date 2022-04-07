import React, { useEffect, useState } from 'react'

import { useLocation } from "react-router-dom";
// import Navbar from '../Navbar/Navbar'
import './Customize.css'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import Tshirt from '../Three/Tshirt'
import Tshirt2 from '../Three/Tshirt2';
import Hoodie from '../Three/Hoodie';
import { HexColorPicker } from 'react-colorful';
import { proxy, useSnapshot } from 'valtio';
import { useSelector } from 'react-redux';
import { fontSize } from '@mui/system';



const halfshirt = proxy({
    current: null,
    items: {
        Shirt: "#6076e0",
        Collar: "#dcd96c",
        Sleeve: "#8dda60",
    },
})

const fullshirt = proxy({
    current: null,
    items: {
        body: "#fd4a5c",
        lowerSleeve: "#0008d6",
        upperSleeve: "#e6de85",
        belt: "#d1dc7d",
        collar: "#a0e287",
        bottomBase: "#72aee1",
        bottoms: "#231642",
    },
})

let state = proxy({
    current: null,
    items: {
        front: "#86df6d",
        back: "#569bd2",
        hood: "#ef4047",
    },
})

const hoodieColors = proxy({
    current: null,
    items: {
        front: "#86df6d",
        back: "#569bd2",
        hood: "#ef4047",
    },
})

const Customize = () => {


    const productDetails = useSelector((state) => state.productDetails);
    const { product, loading, error } = productDetails;
    console.log(product)

    const snap = useSnapshot(state)
    const [col, setCol] = useState([])

    const handleColorPicker = (color) => {
        state.items[snap.current] = color;
        console.log([snap.current], color)
        setCol(prev => ({ ...prev, [snap.current]: color }))
        console.log(snap)
    }
    console.log('name', col)

    const search = useLocation().search;
    const name = new URLSearchParams(search).get('brand');



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

    const [size, setSize] = useState()


    const [background, setBackground] = useState('#fff')

    const handleChangeComplete = (color, event) => {
        console.log(event)
        console.log(color)
        setBackground(color);

    };


    const items = [{
        'product': product._id,
        "name": product.name,
        'image': product.image,
        'size': size,
        'qty': quantity,
        'colors': [col],
        'price': product.price
    }]
    const previousItems = JSON.parse(localStorage.getItem('Orders')) ?? [];
    const c = [...items, ...previousItems]

    const addItems = () => {
        setText("Added to cart")
        console.log(product.name, size, quantity, col)

        localStorage.setItem('Orders', JSON.stringify(c))

    }

    const renderSwitch = (name) => {

        switch (name) {
            case 'T-Shirt':
                state = halfshirt
                return <Tshirt state={halfshirt} />;
            case 'Sleeve':
                state = fullshirt
                return <Tshirt2 state={fullshirt} />;
            default:
                state = hoodieColors
                return <Hoodie state={hoodieColors} />;
        }
    }




    return (
        <>
            <br />
            <section className='container' >
                <div className="d-flex row " >
                    <div className="sections__left col-md-3"  >
                        <h4 style={{ fontWeight: 'bold', marginTop: '160px' }}>
                            Customize it Yourself
                        </h4>
                        <h1 style={{ fontWeight: 'bold' }}>
                            {product.name}
                        </h1>
                        <p style={{ fontWeight: 'bold', fontSize: '18px' }}>Please select the appropriate size and color you want in your T-shirt</p>

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
                        <>
                            <div style={{
                                display: snap.current ? "block" : "block",
                                position: 'absolute',
                                top: '255px',
                                right: '210px'
                            }}>
                                <HexColorPicker className="picker" color={snap.items[snap.current]} onChange={(color) => handleColorPicker(color)} />
                                {/* <h5 style={{
                                    color: '#000',
                                    textTransform: 'capitalize',
                                    marginTop: '10px',
                                    color: 'black',
                                    width: 'fit-content',
                                    padding: '5px',
                                    borderRadius: '4px'
                                }}>{snap.current} {(state.items[snap.current])} </h5> */}
                            </div>
                        </>
                        <div className="customize__quantity">
                            <h3 style={{ fontWeight: 'bold' }}>Quantity</h3>
                            <div className="sizeButton">
                                <ButtonGroup variant="text" aria-label="text button group">
                                    <Button onClick={decreaseQuantity} style={{ fontWeight: 'bold', color: 'black' }}>-</Button>
                                    <Button onClick={increaseQuantity} style={{ fontWeight: 'bold', color: 'black' }}>+</Button>
                                </ButtonGroup>
                                <p style={{ fontWeight: 'bold', fontSize: '20px' }}>{quantity}</p>
                            </div>
                            <button className='btn btn-outline-primary addButton' onClick={addItems} style={{ fontWeight: 'bold', color: 'black' }}> {text} </button>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}


export default Customize
