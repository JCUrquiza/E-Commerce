import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { initialData } from '@/seed/seed';
import { Title } from '@/components';

const productsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
];

export default function () {
    return (
        <div className='flex justify-center items-center mb-72 px-10 sm:px-0'>

            <div className='flex flex-col w-[1000px]'>

                <Title title='Verificar órden' />

                <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>

                    {/* Carrito */}
                    <div className='flex flex-col mt-5'>

                        <span className='text-xl'>Editar carrito</span>
                        <Link href='/cart' className='underline mb-5'>Editar carrito</Link>


                        {/* Items */}
                        {
                            productsInCart.map( product => (
                                <div className='flex mb-5' key={ product.slug }>
                                    <Image
                                        src={`/products/${ product.images[0] }`}
                                        width={100}
                                        height={100}
                                        style={{
                                            width: '100px',
                                            height: '100px'
                                        }}
                                        alt={product.title}
                                        className='mr-5 rounded'
                                    />
                                    <div>
                                        <p>{ product.title }</p>
                                        <p>${ product.price * 3}</p>
                                        <p className='font-bold'>Subtotal: ${ product.price * 3 }</p>
                                    </div>
                                </div>
                            ))
                        }

                    </div>

                    {/* Checkout - Resumen de órden */}
                    <div className='bg-white rounded-xl shadow-xl p-7'>

                        {/* Dirección de entrega */}
                        <h2 className='text-2xl mb-2'>Dirección de entrega</h2>
                        <div className='mb-10'>
                            <p className='text-xl'>Juan Gonzalez</p>
                            <p>Av. Siempre viva</p>
                            <p>Col. Centro</p>
                            <p>Alcaldía Cuauhtemoc</p>
                            <p>CDMX</p>
                            <p>CP. 09283</p>
                            <p>Tel. 23423409283</p>
                        </div>

                        {/* Divider */}
                        <div className='w-full h-0.5 rounded bg-gray-200 mb-10' />

                        {/* Resumen de la órden */}
                        <h2 className='text-2xl mb-2'>Resumen de órden</h2>
                        <div className='grid grid-cols-2'>
                            <span>No. Productos</span>
                            <span className='text-right'>3 artículos</span>

                            <span>Subtotal</span>
                            <span className='text-right'>$ 100.00</span>

                            <span>Impuestos (15%)</span>
                            <span className='text-right'>$ 100.00</span>

                            <span className='mt-5 text-2xl'>Total</span>
                            <span className='mt-5 text-2xl text-right'>$ 100.00</span>
                        </div>

                        <div className='mt-5 mb-2 w-full'>
                            <p className='mb-5'>
                                <span className='text-xs'>
                                    Al hacer click en "Colocar Orden", aceptas nuestos
                                    <a href='#' className='underline'> términos y condiciones</a> y
                                    <a href='#' className='underline'> política de privacidad</a>
                                </span>
                            </p>

                            <Link className='flex btn-primary justify-center' href='/orders/123'>
                                Colocar Orden
                            </Link>
                        </div>

                    </div>


                </div>

            </div>

        </div>
    )
}
