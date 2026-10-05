import { test, expect } from '../../src/fixtures/fixtures';
import { createRandomArticle } from '../../src/utils/testData';

test('user can delete an existing article', async ({ page, articleApi, articlePage }) => {
  // pre-condition: article created via API
  const article = createRandomArticle();
  const slug = await articleApi.createArticle(article);

  await articlePage.open(slug);
  await expect(articlePage.title).toHaveText(article.title);
  await expect(articlePage.deleteButton).toBeVisible();

  await articlePage.clickDelete();

  // redirect to home
  await expect(page).toHaveURL(`${process.env.BASE_URL}/`);
  await expect(page.getByText(article.title)).toBeHidden();
});
