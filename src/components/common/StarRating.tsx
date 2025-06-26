"use client"

import Rating from '@mui/material/Rating';
import {useState} from "react";

export default function StarRating({changable = false, starValue}) {
    const [value, setValue] = useState(starValue);

    if(changable){
        return (
            <div>
                <Rating name="star-rating" value={value} precision={0.1} onChange={(newValue) => {setValue(newValue)}}  sx={{
                    color: 'black',
                    '& .MuiRating-iconEmpty': {
                        color: 'black',
                    }
                }} />
            </div>
        );
    }

    return (
        <>
            <Rating name="star-rating" value={value} precision={0.1} readOnly sx={{
                color: 'black',
                '& .MuiRating-iconEmpty': {
                    color: 'black',
                }
            }} />
        </>
    )
}
