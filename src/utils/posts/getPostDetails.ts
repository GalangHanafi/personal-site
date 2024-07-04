import type { APIRoute } from 'astro';
import { Client } from '@notionhq/client';
import { NotionToMarkdown } from "notion-to-md";

export const getPostDetails = async (id: string) => {
    const notion = new Client({ auth: import.meta.env.NOTION_API_KEY });

    const response = await notion.pages.retrieve({ page_id: id });


    return response
}