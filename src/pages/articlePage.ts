import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class ArticlePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get title(): Locator {
    return this.page.getByRole('heading', { level: 1 });
  }

  get editButton(): Locator {
    return this.page.getByRole('link', { name: 'Edit Article' }).first();
  }

  get deleteButton(): Locator {
    return this.page.getByRole('button', { name: 'Delete Article' }).first();
  }

  authorLink(username: string): Locator {
    return this.page.getByRole('link', { name: username }).first();
  }

  tag(tagName: string): Locator {
    return this.page.getByRole('listitem').filter({ hasText: tagName });
  }

  bodyText(text: string): Locator {
    return this.page.getByText(text);
  }

  async open(slug: string): Promise<void> {
    await this.goto(`/article/${slug}`);
  }

  async clickEdit(): Promise<void> {
    await this.editButton.click();
  }

  async clickDelete(): Promise<void> {
    await this.deleteButton.click();
  }
}
