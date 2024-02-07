import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { AuthButtonServer } from "@/components/auth-button-server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import PostList from "@/components/posts-list";
import { ComposePost } from "@/components/compose-post";
import { type ReactElement } from "react";

export default async function Home(): Promise<ReactElement> {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Check if isnt logged in redirect to login.
  if (session === null) {
    redirect("/login");
  }

  const { data: posts } = await supabase.from("posts").select("*, users(*)"); // To change object users inside post we can use <CustomName>:users(*)

  return (
    <main className="flex min-h-screen flex-col items-center">
      <section className="max-w-[600px] w-full border-l border-r border-white/80 h-full">
        <ComposePost userAvatarUrl={session?.user?.user_metadata?.avatar_url} />
        <PostList posts={posts} />
      </section>
      <AuthButtonServer />
    </main>
  );
}
