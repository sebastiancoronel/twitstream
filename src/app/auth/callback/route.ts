import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse} from 'next/server'

// Option of NextJS to avoid static caching of the route and allways executing on the server.
export const dynamic = 'force-dynamic'

export async function GET (request: NextRequest){
    // Access  to url
    const requestUrl = new URL(request.url)
    // Read the code from url
    const code = requestUrl.searchParams.get('code')

    // If code exsits
    if(code){
        const supabase = createRouteHandlerClient({cookies})

        // Using the code url it return the user session
        await supabase.auth.exchangeCodeForSession(code)
    }

    // Return the user to the page where they were before login
    return NextResponse.redirect(requestUrl.origin)
    

}