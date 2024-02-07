import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import ComponentPostButton from '@/components/compose-post-button'
import ComposePostTextArea from '@/components/compose-post-textarea'

export function ComposePost({userAvatarUrl} : {userAvatarUrl: string } ){

    const addPost = async ( formData : FormData ) =>{
        'use server'

        const content = formData.get('content');

        if (content === null) return

        const supabase = createServerActionClient({ cookies })

        // Check if user is authenticated
        const{data : {user} } = await supabase.auth.getUser()

        if(user===null) return
        await supabase.from('posts').insert({content, user_id:user.id}) 
        revalidatePath('/')
    }

    return(
        <form className="flex flex-row space-x-4 p-4 border-b border-white/20" action={addPost}>
            <img className="rounded-full w-12 h-12 object-contain" src={userAvatarUrl} alt="" />
            <div className="flex flex-1 flex-col gap-y-4">
                <ComposePostTextArea/>
            </div>
            <ComponentPostButton/>
        </form>
    )
}