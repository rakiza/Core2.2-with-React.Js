import React from 'react';
import { ICar } from './demo';

interface IProps{
    car:ICar
}
const CarItem: React.FC<IProps>=({car})=>{
    return(
        <li>{car.color}</li>
    );
}
export default CarItem;