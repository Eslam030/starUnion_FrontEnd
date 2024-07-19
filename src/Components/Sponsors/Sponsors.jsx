import React, { useEffect, useState } from 'react'
import './Sponsors.css'
import dotpy_sub from '../../assets/dotpyi 1.png'
import { Get_Sponsors } from '../../Api/Endpoints/AppEndPoints'; 
import { DOMAIN } from '../../Api/config'; 

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
            {sponsorsData.map((item) => (
                <img src={`${DOMAIN}/main/getImage?path=${item.fields.logo}`} alt="Sponsors Image" />
            ))}
        </div>
    )
}

export default Sponsors