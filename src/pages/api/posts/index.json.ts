import type { APIRoute } from "astro"
import { Client } from '@notionhq/client';


export const GET: APIRoute = async ({ params, request }) => {
    const notion = new Client({ auth: import.meta.env.NOTION_API_KEY });

    const response = await notion.databases.query({
        database_id: import.meta.env.NOTION_POSTS_ID,
    });

    return new Response(JSON.stringify(response));
}
