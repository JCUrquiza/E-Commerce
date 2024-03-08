'use client';

import React, { useEffect, useState } from 'react';
import { titleFont } from '@/config/fonts';
import { getStockBySlug } from '@/actions';

interface Props {
    slug: string;
}

export const StockLabel = ({ slug }: Props) => {

    const [stock, setStock] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getStock();
    }, []);
    
    const getStock = async() => {
        const inStock = await getStockBySlug(slug);
        setStock(inStock);
        setIsLoading(false);
    }

    return (
        <>
            {
                isLoading ? (
                    <h1 className={`${ titleFont.className } antialiased font-bold text-lg bg-gray-200 animate-pulse`}>
                        &nbsp;
                    </h1>
                ) : (
                    <h1 className={`${ titleFont.className } antialiased font-bold text-lg`}>
                        Stock: { stock }
                    </h1>
                )
            }
        </>
    )
}
