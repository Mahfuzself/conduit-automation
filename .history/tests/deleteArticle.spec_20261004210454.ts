import { test, expect } from '../src/fixtures/fixtures';
import { createRandomArticle } from '../src/utils/testData';

test('user can delete an existing article', async ({ page, articleApi, articlePage }) => {
  const article = createRandomArticle();

  const slug = await test.step('Pre-condition: create article via API', async () => {
    return articleApi.createArticle(article);
  });

  await test.step('Open the article and verify delete button is shown', async () => {
    await articlePage.open(slug);
    await expect(articlePage.title).toHaveText(article.title);
    await expect(articlePage.deleteButton).toBeVisible();
  });

  await test.step('Click delete', async () => {
    await articlePage.clickDelete();
  });

  await test.step('Verify redirect to home and article is gone', async () => {
    await expect(page).toHaveURL(`${process.env.BASE_URL}/`);
    await expect(page.getByText(article.title)).toBeHidden();
  });
});

test("user cannot delete another user's article", async ({ articleApi, otherArticleApi, articlePage }) => {
  const article = createRandomArticle();

  const slug = await test.step('Pre-condition: another user creates article via API', async () => {
    return otherArticleApi.createArticle(article);
  });

  await test.step('Open the article and verify delete button is hidden', async () => {
    await articlePage.open(slug);
    await expect(articlePage.title).toHaveText(article.title);
    await expect(articlePage.deleteButton).toBeHidden();
  });

  await test.step('Try delete via API with logged-in user and verify 403', async () => {
    expect(await articleApi.deleteArticle(slug)).toBe(403);
  });

  await test.step('Verify the article still exists', async () => {
    expect(await otherArticleApi.getArticleStatus(slug)).toBe(200);
  });
});
