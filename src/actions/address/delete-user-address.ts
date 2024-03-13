'use server';

import React from 'react';
import prisma from '@/lib/prisma';

export const deleteUserAddress = async(userId: string) => {

    try {

        const deleted = await prisma.userAddress.delete({
            where: {
                userId: userId
            }
        });

        return {
            ok: true,
            message: 'Dirección eliminada con éxito'
        }
        
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'No fue posible eliminar la dirección'
        }
    }

}
