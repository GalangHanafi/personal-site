import type { APIRoute } from 'astro';
import { Client } from '@notionhq/client';
import { NotionToMarkdown } from "notion-to-md";

export const GET: APIRoute = async ({ params, request }) => {
    const id = params.id as string;
    const notion = new Client({ auth: import.meta.env.NOTION_API_KEY });

    const blockId = id;
    // const notionBlocks = await notion.blocks.children.list({
    //     block_id: blockId,
    //     page_size: 100,
    // });

    const n2m = new NotionToMarkdown({ notionClient: notion });

    const mdblocks = await n2m.pageToMarkdown(id);
    const mdString = n2m.toMarkdownString(mdblocks);

    return new Response(JSON.stringify(mdString.parent));
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