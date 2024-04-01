import React from 'react'
import '../usercard.css'
import { useState, useEffect } from 'react';

export default function Usercards() {

    const [user, setuser] = useState([]);
    useEffect(() => {
        fetchapi();
    }, []);
    const fetchapi = async () => {
        try {
            const response = await fetch('http://localhost:4000/salesdashboard/usercard/usercarddata');
            if (!response.ok) {
                throw new Error('failed');
            }
            const data = await response.json();
            setuser(data);
            console.log(user);
        } catch (error) {
            console.log("error")
        }
    };
    const [displayValue, setDisplayValue] = React.useState("");

    const handleButtonClick = (type) => {
        if (type === "profit") {
            var profit = 50;
            setDisplayValue(`${profit}% Profit`);
        } else {
            var loss = 20;
            setDisplayValue(`${loss}% Loss`);
        }
    };
    return (
        <div>
            {
                user.map((item, index) => {
                    return (
                        <div class="card-container">
                            <span class='pro online' >
                                {item.stat}
                            </span>
                            <img className="img" src={item.img}></img>

                            <h4 className='headfour'>Product : {item.product}</h4>
                            <h4 className='headfour'>Status : {item.status}</h4>
                            <h4 className='headfour'> Date : {item.date}</h4>

                            <div className="btn">
                                <button className="bt1" onClick={() => handleButtonClick("profit")} > Profit</button>
                                <button className="bt2" onClick={() => handleButtonClick("loss")} > Losses</button>
                            </div>
                            <div className="input">
                                <input className="value" type="text" value={displayValue} readOnly />
                            </div>

                            <div className="skills">
                                <h6 >Sales details</h6>
                                <ul className='ul' >
                                    <li>Gross Sales {item.sales}</li>
                                    <li>Discount {item.discount}</li>
                                    <li>Cost {item.cost}</li>
                                    <li>Profit {item.profit}</li>
                                </ul>
                            </div>

                        </div>
                    )
                })
            }
        </div>
    )
}
