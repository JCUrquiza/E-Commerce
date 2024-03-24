'use server';

import prisma from '@/lib/prisma';
import { auth } from '@/auth.config';

export const getOrderById = async( id: string ) => {

    const session = await auth();
    if ( !session ) {
        return {
            ok: false,
            message: 'Debe de estar autenticado'
        }
    }

    try {

        const order = await prisma.order.findUnique({
            where: {
                id: id
            },
            include: {
                OrderAddress: true,
                OrderItem: {
                    select: {
                        price: true,
                        quantity: true,
                        size: true,

                        product: {
                            select: {
                                title: true,
                                slug: true,

                                ProductImage: {
                                    select: {
                                        url: true
                                    },
                                    take: 1
                                }
                            }
                        }
                    }
                }
            }
        });

        if ( !order ) throw new Error('Esa orden no existe');

        if ( session.user.role === 'user' ) {
            if ( session.user.id !== order.userId ) {
                // Mostrar un mensaje de error con el idUusario
                throw 'No es el id del usuario'
            }
        }

        return {
            ok: true,
            order: order
        }
        
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'Orden no existe'
        }
    }

}
