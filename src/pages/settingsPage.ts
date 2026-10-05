import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

export type Profile = {
  image: string;
  username: string;
  bio: string;
  email: string;
  password: string;
};

export class SettingsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get heading(): Locator {
    return this.page.getByRole('heading', { name: 'Your Settings' });
  }

  get imageInput(): Locator {
    return this.page.getByPlaceholder('URL of profile picture');
  }

  get usernameInput(): Locator {
    return this.page.getByPlaceholder('Username');
  }

  get bioInput(): Locator {
    return this.page.getByPlaceholder('Short bio about you');
  }

  get emailInput(): Locator {
    return this.page.getByPlaceholder('Email');
  }

  get passwordInput(): Locator {
    return this.page.getByPlaceholder('New Password');
  }

  get updateButton(): Locator {
    return this.page.getByRole('button', { name: 'Update Settings' });
  }

  async open(): Promise<void> {
    await this.goto('/settings');
  }

  async updateSettings(profile: Profile): Promise<void> {
    await this.imageInput.fill(profile.image);
    await this.usernameInput.fill(profile.username);
    await this.bioInput.fill(profile.bio);
    await this.emailInput.fill(profile.email);
    await this.passwordInput.fill(profile.password);
    await this.updateButton.click();
  }
}
