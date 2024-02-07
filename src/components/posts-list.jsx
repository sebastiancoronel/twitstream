import PostCard from "./post-card"
export default function PostLists({ posts }) {
    return (
        <>
            {
                posts?.map(post => {

                    const{ id, users, content } = post
        
                const { user_name: userName, name: userFullName, avatar_url: avatarUrl } = users
                
                return (
                        <PostCard
                            content={content}
                            key={id}
                            userName={userName}
                            userFullName={userFullName}
                            avatarUrl={avatarUrl}
                        />
                    )
                })
            }
        </>
    )
}