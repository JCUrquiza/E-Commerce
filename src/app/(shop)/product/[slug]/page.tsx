import React from 'react';
import { notFound } from 'next/navigation';
import { initialData } from '@/seed/seed';
import { titleFont } from '@/config/fonts';
import { ProductMovileSlideshow, ProductSlideshow, QuantitySelector, SizeSelector } from '@/components';

interface Props {
    params: {
        slug: string;
    }
}

export default function ProductsBySlugPage({ params }: Props) {

    const { slug } = params;
    const product = initialData.products.find(product => product.slug === slug);
    
    if (!product) {
        notFound();
    }

    return (
        <div className='mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3'>


            {/* Desktop */}
            <div className='col-span-1 md:col-span-2'>

                {/* Slideshow */}
                <ProductSlideshow className='hidden md:block' images={ product.images } title={ product.title } />

                {/* Movile Slideshow */}
                <ProductMovileSlideshow className='block md:hidden' images={ product.images } title={ product.title } />

            </div>

            {/* Detalles */}
            <div className='col-span-1 px-5'>
                
                <h1 className={`${ titleFont.className } antialiased font-bold text-xl`}>
                    { product.title }
                </h1>
                <p className='text-lg mb-5'>${ product.price.toFixed(2) }</p>

                {/* Selector de Tallas */}
                <SizeSelector selectedSize={ product.sizes[0] } availableSizes={ product.sizes } />

                {/* Selector de Cantidad */}
                <QuantitySelector quantity={2} />

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
