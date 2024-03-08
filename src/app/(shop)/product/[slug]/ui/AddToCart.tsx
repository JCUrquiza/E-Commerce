'use client';

import React, { useState } from 'react';
import { QuantitySelector, SizeSelector } from '@/components';
import { Product, Size } from '@/interfaces';

interface Props {
    product: Product;
}

export const AddToCart = ({ product }: Props) => {

    const [size, setSize] = useState<Size | undefined>();

    return (
        <>
            {/* Selector de Tallas */}
            <SizeSelector selectedSize={ size } availableSizes={ product.sizes } onSizeChanged={ size => setSize(size)} />

            {/* Selector de Cantidad */}
            <QuantitySelector quantity={2} />

            {/* Botón */}
            <button className='btn-primary my-5'>
                Agregar al carrito
            </button>
        </>
    )

}
