// Next SSR
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { redirect } from 'next/dist/server/api-utils'

// Cookies
import { parseCookies, destroyCookie } from 'nookies'
import { parse } from 'path'
import { AuthTokenError } from '../../styles/services/errors/AuthTokenError'

// Only logged can access
export function canSSRAuth<P>(fn: GetServerSideProps<P>) {
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {

        const cookies = parseCookies(ctx)

        const token = cookies['token']

        if (!token) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false
                }
            }
        }

        try {
            return await fn(ctx)
        } catch (e) {
            if (e instanceof AuthTokenError)
                destroyCookie(ctx, 'token')

            return {
                redirect: {
                    destination: '/',
                    permanent: false
                }
            }
        }
    }
}