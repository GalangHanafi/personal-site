import type { APIRoute } from 'astro';
import { Client } from '@notionhq/client';

export const GET: APIRoute = async ({ params, request }) => {
    const id = params.id as string;
    const notion = new Client({ auth: import.meta.env.NOTION_API_KEY });

    const blockId = id;
    const response = await notion.blocks.children.list({
        block_id: blockId,
        page_size: 100,
    });

    return new Response(JSON.stringify(response));
}

export async function getStaticPaths() {
    const url = `${import.meta.env.APP_URL}/api/posts.json`;
    const response = await fetch(url);
    const posts = await response.json();

    // Map posts to parameters
    const params: { params: { id: string } }[] = [];
    posts.results.forEach((post) => {
        params.push({ params: { id: post.id } })
    })
    return params;
}