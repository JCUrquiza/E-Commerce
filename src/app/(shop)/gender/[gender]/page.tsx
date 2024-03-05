export const revalidate = 60;   // 60 segundos

import React from 'react';
import { notFound, redirect } from 'next/navigation';
import { Pagination, ProductGrid, Title } from '@/components';
import { getPaginatedProductsWithImages } from '@/actions';
import { Gender } from '@prisma/client';

interface Props {
    params: {
        gender: string;
    },
    searchParams: {
        page?: string;
    }
}

export default async function GenderPage({ params, searchParams }: Props) {

    const { gender } = params;
    const page = searchParams.page ? parseInt(searchParams.page) : 1;
    const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ 
        page,
        gender: gender as Gender
    });

    if ( products.length === 0) {
        redirect(`/gender/${gender}`);
    }

    const labels: Record<string, string> = {
        'men': 'para hombres',
        'women': 'para mujeres',
        'kid': 'para niños',
        'unisex': 'para Todos'
    }

    // if ( id === 'kids' ) {
    //     notFound();
    // }    

    return (
        <>
            <Title
                title={`Artículos de ${ labels[gender] }`}
                subtitle={`Productos de ${ gender }`}
                className='mb-2'
            />

            <ProductGrid products={ products } />

            <Pagination totalPages={totalPages} />
        </>
    )
}
