import React from 'react';
import { notFound } from 'next/navigation';
import { initialData } from '@/seed/seed';
import { titleFont } from '@/config/fonts';
import { SizeSelector } from '@/components';

interface Props {
    params: {
        slug: string;
    }
}

export default function ({ params }: Props) {

    const { slug } = params;
    const product = initialData.products.find(product => product.slug === slug);
    console.log(product);

    if (!product) {
        notFound();
    }

    return (
        <div className='mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3'>

            {/* Slideshow */}
            <div className='col-span-1 md:col-span-2 bg-red-300'>
                Hola
            </div>

            {/* Detalles */}
            <div className='col-span-1 px-5 bg-blue-300'>
                
                <h1 className={`${ titleFont.className } antialiased font-bold text-xl`}>
                    { product.title }
                </h1>
                <p className='text-lg mb-5'>${ product.price.toFixed(2) }</p>

                {/* Selector de Tallas */}
                <SizeSelector selectedSize={ product.sizes[0] } availableSizes={ product.sizes } />

                {/* Selector de Cantidad */}

                {/* Botón */}
                <button className='btn-primary my-5'>
                    Agregar al carrito
                </button>

                {/* Descripción */}
                <h3 className='font-bold text-sm'>Descripción</h3>
                <p className='font-light'>{ product.description }</p>

            </div>

        </div>
    )
}
