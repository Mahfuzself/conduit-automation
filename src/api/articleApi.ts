import { APIRequestContext, expect } from '@playwright/test';

export type Article = {
  title: string;
  description: string;
  body: string;
  tags: string[];
};

export class ArticleApi {
  constructor(private request: APIRequestContext, private token: string) {}

  async createArticle(article: Article): Promise<string> {
    const response = await this.request.post(`${process.env.API_URL}articles`, {
      headers: { Authorization: `Token ${this.token}` },
      data: {
        article: {
          title: article.title,
          description: article.description,
          body: article.body,
          tagList: article.tags,
        },
      },
    });
    expect(response.status(), await response.text()).toBe(201);
    const body = await response.json();
    return body.article.slug as string;
  }

  async getArticleStatus(slug: string): Promise<number> {
    const response = await this.request.get(`${process.env.API_URL}articles/${slug}`, {
      headers: { Authorization: `Token ${this.token}` },
    });
    return response.status();
  }

  async getArticle(slug: string) {
    const response = await this.request.get(`${process.env.API_URL}articles/${slug}`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    return body.article;
  }

  async deleteArticle(slug: string): Promise<number> {
    const response = await this.request.delete(`${process.env.API_URL}articles/${slug}`, {
      headers: { Authorization: `Token ${this.token}` },
    });
    return response.status();
  }
}
