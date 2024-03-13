'use server';

import type { Address } from '@/interfaces';
import prisma from '@/lib/prisma';

export const setUserAddress = async(address: Address, userId: string) => {

    try {

        const newAddress = await createOrReplaceAddress( address, userId );

        return {
            ok: true,
            address: newAddress
        }
        
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'No se pudo grabar la información'
        }
    }

}

const createOrReplaceAddress = async(address: Address, userId: string) => {

    try {

        const storedAddress = await prisma.userAddress.findUnique({
            where: {
                userId: userId
            }
        });

        const addressToSave = {
            userId: userId,
            firstName: address.firstName,
            lasttName: address. lastName,
            address: address.address,
            address2: address.address2,
            postalCode: address.postalCode,
            countryId: address.country,
            phone: address.phone
        }

        if ( !storedAddress ) {
            const newAddress = await prisma.userAddress.create({
                data: addressToSave
            });
            return newAddress;
        }

        const updatedAddress = await prisma.userAddress.update({
            where: {
                userId: userId
            }, 
            data: addressToSave
        });

        return updatedAddress;
        
    } catch (error) {
        console.log(error);
        throw new Error('No se pudo grabar la dirección');
    }

}
