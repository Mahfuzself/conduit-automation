import { test as base } from '@playwright/test';
import { EditorPage } from '../pages/editorPage';
import { ArticlePage } from '../pages/articlePage';
import { HomePage } from '../pages/homePage';
import { SettingsPage } from '../pages/settingsPage';
import { ArticleApi } from '../api/articleApi';
import { UserApi } from '../api/userApi';
import { getToken } from '../utils/token';
import { createRandomUser } from '../utils/testData';

type Fixtures = {
  editorPage: EditorPage;
  articlePage: ArticlePage;
  homePage: HomePage;
  settingsPage: SettingsPage;
  articleApi: ArticleApi;
  userApi: UserApi;
  otherArticleApi: ArticleApi;
};

export const test = base.extend<Fixtures>({
  editorPage: async ({ page }, use) => {
    await use(new EditorPage(page));
  },
  articlePage: async ({ page }, use) => {
    await use(new ArticlePage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  settingsPage: async ({ page }, use) => {
    await use(new SettingsPage(page));
  },
  articleApi: async ({ request }, use) => {
    await use(new ArticleApi(request, getToken()));
  },
  userApi: async ({ request }, use) => {
    await use(new UserApi(request));
  },
  // ArticleApi of a second, freshly created user (not the logged-in user)
  otherArticleApi: async ({ request }, use) => {
    const body = await new UserApi(request).signup(createRandomUser());
    await use(new ArticleApi(request, body.user.token));
  },
});

export { expect } from '@playwright/test';
