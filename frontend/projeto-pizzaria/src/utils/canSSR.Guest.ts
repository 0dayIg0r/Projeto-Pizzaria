// Next SSR
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'

// Cookies
import { parseCookies } from 'nookies'

// Verifiy if logged, if logged redirect to dashboard
export function canSSRGuest<P>(fn: GetServerSideProps<P>) {
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {


        const cookies = parseCookies(ctx)

        if (cookies['token']) {
            return {
                redirect: {
                    destination: '/dashboard',
                    permanent: false,
                }
            }
        }
        return await fn(ctx)
    }

}

