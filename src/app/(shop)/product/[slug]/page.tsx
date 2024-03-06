export const revalidate = 604800; // 7 días

import React from 'react';
import { notFound } from 'next/navigation';
import { titleFont } from '@/config/fonts';
import { ProductMovileSlideshow, ProductSlideshow, QuantitySelector, SizeSelector, StockLabel } from '@/components';
import { getProductBySlug } from '@/actions';
// import { getProductBySlug } from '@/actions/product/get-product-by-slug';

interface Props {
    params: {
        slug: string;
    }
}

export default async function ProductsBySlugPage({ params }: Props) {

    const { slug } = params;
    // const product = initialData.products.find(product => product.slug === slug);
    const product = await getProductBySlug(slug);
    
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
                
                <StockLabel slug={ product.slug } />
                
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
