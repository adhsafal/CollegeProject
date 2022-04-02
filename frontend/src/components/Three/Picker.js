import { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useSnapshot } from "valtio";

const Picker = ({ state, tshirtname }) => {
    const snap = useSnapshot(state)
    const [col, setCol] = useState()

    const handleColorPicker = (color) => {
        state.items[snap.current] = color;
        console.log([snap.current], color)
        setCol(prev => ({ ...prev, [snap.current]: color }))
    }
    console.log(col)


    const getLocalItems = () => {
        let tcolor = localStorage.getItem('Colors')


        if (tcolor) {
            return JSON.parse(localStorage.getItem('Colors'));
        }
        else {
            return [];
        }
    }

    const [tshirtColors, setTshirtColors] = useState(getLocalItems())

    // let element = {
    //     tname: { tshirtname },
    //     col


    // }

    // const addColors = () => {
    //     setTshirtColors([...tshirtColors, element])
    // }

    //Adding data to local storage

    // useEffect(() => {
    //     localStorage.setItem('Colors', JSON.stringify(tshirtColors))
    // }, [tshirtColors]);



    return (
        <>
            <div style={{
                display: snap.current ? "block" : "block",
                position: 'absolute',
                top: '230px',
                right: '185px'
            }}>
                {/* <HexColorPicker className="picker" color={snap.items[snap.current]} onChange={(color) => handleColorPicker(color)} onClick={addColors} /> */}

                <h5 style={{
                    color: '#000',
                    textTransform: 'capitalize'
                }}>{snap.current} {(state.items[snap.current])} </h5>
            </div>
        </>
    )
}

export default Picker
