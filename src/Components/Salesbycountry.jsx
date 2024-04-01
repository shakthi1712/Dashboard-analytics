import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

export default function Salesbycountry() {
    const [product, setproduct] = useState([]);
    const [totalSales, setTotalSales] = useState(0);
    const [totalPercentage, setTotalPercentage] = useState(0);

    useEffect(()=>{
      fetchapi();
  },[]);
    const fetchapi= async()=>{
      try{
        const response =await fetch('http://localhost:4000/salesdashboard/countrysales/data');
        if(!response.ok){
          throw new Error('failed');
        }
        const data=await response.json();
        setproduct(data);
        console.log(product);
      } catch (error){
                 console.log("error")
      }
  };

    const calculateTotal = () => {
        const salesTotal = product.reduce((acc, { sales }) => acc + sales, 0);
        const percentageTotal = product.reduce((acc, { percentage }) => acc + Number(percentage), 0);
        setTotalSales(salesTotal);
        setTotalPercentage(percentageTotal);
    };
    useEffect(()=>{
        calculateTotal();
    },[product])
  return (
    <div>
  <div className="sales-by-countries-container widget-size">
  <table className="sales-by-countries-table widget-table">
      <thead className="sales-by-countries-thead">
        <tr className='heading--sales'>
          <th>COUNTRY</th>
          <th>SALES($)</th>
          <th>PERCENTAGE</th>
        </tr>
      </thead>
      <tbody className="sales-by-countries-tbody">
        {product.map((item,index) => (
          <tr key={index}>
            <td className='img-td'> <img className='country-flag' src={item.url} alt="" /> {item.country}</td>
            <td style={{ color: item.sales > 100000 ? 'green' : 'red' }} >{item?item.sales.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','):23443}</td>
            <td style={{ color: item.percentage > 10 ? 'green' : 'red' }}>{item.percentage}%</td>
          </tr>
        ))}
        <tr>
          <td>Total</td>
          <td>{totalSales.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} $</td>
          <td>{totalPercentage}%</td>
        </tr>
      </tbody>
    </table>
    </div>
    </div>
  )
}
