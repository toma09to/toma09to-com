// SDK利用準備
import type { MicroCMSQueries } from "microcms-js-sdk";
import { createClient } from "microcms-js-sdk";

const client = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.MICROCMS_API_KEY,
});

// 型定義
export type Category = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  name: string;
};
export type Blog = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  content: string;
  category: Category;
};
export type CategoryResponse = {
  totalCount: number;
  offset: number;
  limit: number;
  contents: Category[];
};
export type BlogResponse = {
  totalCount: number;
  offset: number;
  limit: number;
  contents: Blog[];
};

// APIの呼び出し
export const getCategories = async (queries?: MicroCMSQueries) => {
  return await client.get<CategoryResponse>({ endpoint: "categories", queries });
}
export const getBlogs = async (queries?: MicroCMSQueries) => {
  return await client.get<BlogResponse>({ endpoint: "blogs", queries });
};
export const getCategoryDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  return await client.getListDetail<Category>({
    endpoint: "categories",
    contentId,
    queries,
  });
};
export const getBlogDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  return await client.getListDetail<Blog>({
    endpoint: "blogs",
    contentId,
    queries,
  });
};