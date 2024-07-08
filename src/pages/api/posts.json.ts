export const prerender = false

import { getPosts } from "@utils/posts/getPosts";
export async function GET({ params }) {
    const posts = await getPosts();

    if (!posts) {
        return new Response(null, {
            status: 404,
            statusText: 'Not found'
        });
    }

    return new Response(
        JSON.stringify(posts), {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    }
    );
}