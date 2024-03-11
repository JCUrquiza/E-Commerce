import React from 'react';
import { redirect } from 'next/navigation';
import { auth } from '@/auth.config';
import { Title } from '@/components';

export default async function ProfilePage() {

    const session = await auth();
    if (!session) {
        redirect('/')
    }

    return (
        <div>

            <Title title='Perfil' />

            <pre>
                {
                    JSON.stringify(session, null, 2)
                }
            </pre>

        </div>
    )
}
