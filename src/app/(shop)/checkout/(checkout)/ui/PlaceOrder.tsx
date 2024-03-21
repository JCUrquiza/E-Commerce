'use client';

import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { placeOrder } from '@/actions';
import { useAddressStore, useCartStore } from '@/store';
import { currencyFormat } from '@/utils';

export const PlaceOrder = () => {

    const [loaded, setLoaded] = useState(false);
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);

    const address = useAddressStore( state => state.address );
    const { subTotal, tax, total, itemsInCart } = useCartStore( state => state.getSummaryInformation() );

    const cart = useCartStore( state => state.cart );

    useEffect(() => {
        setLoaded(true);
    }, []);

    const onPlaceOrder = async() => {
        setIsPlacingOrder(true);

        const productToOrder = cart.map( product => ({
            productId: product.id,
            quantity: product.quantity,
            size: product.size
        }));

        console.log({ address, productToOrder });
        const resp = await placeOrder(productToOrder, address);
        console.log(resp);
        

        setIsPlacingOrder(false);
    }



    if ( !loaded ) {
        return <p>Cargando...</p>
    }
    
    return (
        <div className='bg-white rounded-xl shadow-xl p-7'>

            {/* Dirección de entrega */}
            <h2 className='text-2xl mb-2'>Dirección de entrega</h2>
            <div className='mb-10'>
                <p className='text-xl'>{ address.firstName } { address.lastName }</p>
                <p>{ address.address }</p>
                <p>{ address.address2 }</p>
                <p>{ address.postalCode }</p>
                <p>{ address.city }, { address.country }</p>
                <p>{ address.phone }</p>
            </div>

            {/* Divider */}
            <div className='w-full h-0.5 rounded bg-gray-200 mb-10' />

            {/* Resumen de la órden */}
            <h2 className='text-2xl mb-2'>Resumen de órden</h2>
            <div className='grid grid-cols-2'>
                <span>No. Productos</span>
                <span className='text-right'>{ itemsInCart === 1 ? '1 artículo' : `${ itemsInCart } articulos` }</span>

                <span>Subtotal</span>
                <span className='text-right'>{ currencyFormat(subTotal) }</span>

                <span>Impuestos (15%)</span>
                <span className='text-right'>{ currencyFormat(tax) }</span>

                <span className='mt-5 text-2xl'>Total</span>
                <span className='mt-5 text-2xl text-right'>{ currencyFormat(total) }</span>
            </div>

            <div className='mt-5 mb-2 w-full'>
                <p className='mb-5'>
                    <span className='text-xs'>
                        Al hacer click en `&quot;`Colocar Orden`&quot;`, aceptas nuestos
                        <a href='#' className='underline'> términos y condiciones</a> y
                        <a href='#' className='underline'> política de privacidad</a>
                    </span>
                </p>

                {/* <p className='text-red-500'>Error de creación</p> */}

                <button
                    className={
                        clsx({
                            'btn-primary': !isPlacingOrder,
                            'btn-disabled': isPlacingOrder,
                        })
                    }
                    onClick={onPlaceOrder}
                >
                    Colocar Orden
                </button>
            </div>

        </div>
    )
}
