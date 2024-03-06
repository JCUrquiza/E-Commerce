'use server';

import prisma from '@/lib/prisma';

export const getStockBySlug = async(slug: string): Promise<number> => {

    try {

        const stock = await prisma.product.findFirst({
            where: { slug },
            select: { inStock: true }
        });
        console.log(stock);

        return stock?.inStock ?? 0;
        
    } catch (error) {
        console.log(error);
        return 0;
        // throw new Error('No se pudo obtener la info');
    }

}