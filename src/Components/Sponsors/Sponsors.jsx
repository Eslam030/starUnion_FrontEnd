import React, { useEffect, useState } from 'react'
import './Sponsors.css'
import { Get_Sponsors } from '../../Api/Endpoints/AppEndPoints'; 
import ImageEncode from "../ImageComponents/ImageEncode";

const Sponsors = () => {
    const [sponsorsData, setSponsorsData] = useState([]);

    useEffect(() => {
        Get_Sponsors(
            (response) => {
                setSponsorsData(response.data);
            },
            (error) => {
                console.log(error)
            }
        )
    },[])

    return (
        <div className='Sponsors'>
            <h1>Sponsors & Partners</h1>
            {sponsorsData.map((item, index) => (
                <ImageEncode key={index} imageUrl={item.fields.logo}  />
            ))}
        </div>
    )
}

export default Sponsors