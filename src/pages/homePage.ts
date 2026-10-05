import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get popularTags(): Locator {
    return this.page.locator('.sidebar .tag-list').getByText(/\S/);
  }

  get articlePreviews(): Locator {
    return this.page.locator('app-article-preview');
  }

  popularTag(tagName: string): Locator {
    return this.page.locator('.sidebar .tag-list').getByText(tagName, { exact: true });
  }

  activeTagTab(tagName: string): Locator {
    return this.page.locator('.feed-toggle').getByText(tagName, { exact: true });
  }

  previewTag(preview: Locator, tagName: string): Locator {
    return preview.getByRole('listitem').getByText(tagName, { exact: true });
  }

  articlePreview(title: string): Locator {
    return this.articlePreviews.filter({ has: this.page.getByRole('heading', { name: title }) });
  }

  async open(): Promise<void> {
    // sidebar renders only after /api/tags returns
    const tagsResponse = this.page.waitForResponse((res) => res.url().includes('/api/tags') && res.ok());
    await this.goto('/');
    await tagsResponse;
  }

  async getFirstPopularTag(): Promise<string> {
    const tag = await this.popularTags.first().textContent();
    return (tag ?? '').trim();
  }

  async filterByTag(tagName: string): Promise<void> {
    await this.popularTag(tagName).click();
  }
}
