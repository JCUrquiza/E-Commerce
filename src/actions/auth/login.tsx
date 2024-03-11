'use server';

import { signIn } from '@/auth.config';
import { sleep } from '@/utils';

export async function authenticate(
    prevState: string | undefined,
    formData: FormData
) {

    try {

        // await sleep(2);
        
        console.log( Object.fromEntries(formData) );
        await signIn('credentials', Object.fromEntries(formData));

    } catch (error) {

        return 'CredentialSignIn'
        
    }

}
