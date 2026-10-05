import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class EditorPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get titleInput(): Locator {
    return this.page.getByPlaceholder('Article Title');
  }

  get descriptionInput(): Locator {
    return this.page.getByPlaceholder("What's this article about?");
  }

  get bodyInput(): Locator {
    return this.page.getByPlaceholder('Write your article (in markdown)');
  }

  get tagInput(): Locator {
    return this.page.getByPlaceholder('Enter tags');
  }

  get publishButton(): Locator {
    return this.page.getByRole('button', { name: 'Publish Article' });
  }

  get errorMessages(): Locator {
    return this.page.locator('.error-messages');
  }

  async open(): Promise<void> {
    await this.goto('/editor');
  }

  async fillTitle(title: string): Promise<void> {
    await this.titleInput.fill(title);
  }

  async fillDescription(description: string): Promise<void> {
    await this.descriptionInput.fill(description);
  }

  async fillBody(body: string): Promise<void> {
    await this.bodyInput.fill(body);
  }

  async addTags(tags: string[]): Promise<void> {
    for (const tag of tags) {
      await this.tagInput.fill(tag);
      await this.tagInput.press('Enter');
    }
  }

  async publish(): Promise<void> {
    await this.publishButton.click();
  }

  async createArticle(article: { title: string; description: string; body: string; tags: string[] }): Promise<void> {
    await this.open();
    await this.fillTitle(article.title);
    await this.fillDescription(article.description);
    await this.fillBody(article.body);
    await this.addTags(article.tags);
    await this.publish();
  }
}
