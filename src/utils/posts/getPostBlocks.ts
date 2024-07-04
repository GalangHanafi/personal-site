import type { APIRoute } from 'astro';
import { Client } from '@notionhq/client';
import { NotionToMarkdown } from "notion-to-md";

export const getPostBlocks = async (id: string) => {
    const notion = new Client({ auth: import.meta.env.NOTION_API_KEY });

    const n2m = new NotionToMarkdown({ notionClient: notion });

    const mdblocks = await n2m.pageToMarkdown(id);
    const mdString = n2m.toMarkdownString(mdblocks);

    return mdString;
}