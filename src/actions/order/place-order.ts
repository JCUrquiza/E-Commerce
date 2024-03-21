'use server';

import { auth } from '@/auth.config';
import type { Address, Size } from '@/interfaces';
import prisma from '@/lib/prisma';

interface ProductToOrder {
    productId: string;
    quantity: number;
    size: Size
}

export const placeOrder = async( productIds: ProductToOrder[], address: Address ) => {

    const session = await auth();
    const userId = session?.user.id;

    if ( !userId ) {
        return {
            ok: false,
            message: 'No hay sesión de usuario'
        }
    }

    // Obtener la información de los productos
    // Nota: Se puede llevar +2 productos con el mismo ID
    const products = await prisma.product.findMany({
        where: {
            id: {
                in: productIds.map( p => p.productId)
            }
        }
    });

    // Calcular los montos
    const itemsInOrder = productIds.reduce( (count, p) => count + p.quantity, 0 );

    // Los totales de tax, subTotal y total
    const { subTotal, tax, total } = productIds.reduce( (totals, item) => {

        const productQuantity = item.quantity;

        const product = products.find( product => product.id === item.productId );
        if ( !product ) throw new Error('Este producto no existe');

        const subTotal = product.price * productQuantity;

        totals.subTotal += subTotal;
        totals.tax += subTotal * 0.15;
        totals.total += subTotal * 1.15;

        return totals;
    }, { subTotal: 0, tax: 0, total: 0 })

    // Crear la transacción de bbdd
    const prismaTx = await prisma.$transaction( async(tx) => {

        // 1.- Actualizar el stock de los productos

        // 2.- Crear la orden - encabezado - detalles
        const order = await tx.order.create({
            data: {
                userId : userId,
                itemsInOrder: itemsInOrder,
                subTotal: subTotal,
                tax: tax,
                total: total,

                OrderItem: {
                    createMany: {
                        data: productIds.map( p => ({
                            quantity: p.quantity,
                            size: p.size,
                            productId: p.productId,
                            price: products.find( product => product.id === p.productId)?.price ?? 0
                        })),
                    }
                }
            }
        })

        // 3.- Crear la dirección de la orden
        const { country, ...restAddress } = address;
        const orderAddress = await tx.orderAddress.create({
            data: {
                ...restAddress,
                countryId: country,
                orderId: order.id
            }
        })
        
        return {
            updatedProducts: [],
            orden: order,
            orderAddress: orderAddress
        }
    });

    console.log({subTotal, tax, total});

}
