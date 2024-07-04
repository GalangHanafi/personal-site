import { Client } from '@notionhq/client';
import type { QueryDatabaseParameters, QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints';

export const getPosts = async (filter?: "project" | "blog"): Promise<QueryDatabaseResponse> => {
    const notion = new Client({ auth: import.meta.env.NOTION_API_KEY });
    const baseQuery: QueryDatabaseParameters = {
        database_id: import.meta.env.NOTION_POSTS_ID,
    };

    if (filter) {
        baseQuery.filter = {
            and: [
                {
                    property: "category",
                    select: {
                        equals: filter
                    }
                }
            ]
        };
    }

    return await notion.databases.query(baseQuery);
};