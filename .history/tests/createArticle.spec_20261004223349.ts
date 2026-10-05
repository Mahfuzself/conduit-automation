import { test, expect } from '../src/fixtures/fixtures';
import { createRandomArticle } from '../src/utils/testData';

test('user can create a new article', async ({ page, editorPage, articlePage }) => {
  const article = createRandomArticle();

  await test.step('Fill the editor form and publish the article', async () => {
    await editorPage.createArticle(article);
  });

  await test.step('Verify redirect to the article page', async () => {
    await expect(page).toHaveURL(/\/article\//);
  });

  await test.step('Verify title, body, tags and edit button are shown', async () => {
    await expect(articlePage.title).toHaveText(article.title);
    await expect(articlePage.bodyText(article.body)).toBeVisible();
    for (const tag of article.tags) {
      await expect(articlePage.tag(tag)).toBeVisible();
    }
    await expect(articlePage.editButton).toBeVisible();
  });

  await test.step('Reload and verify the article is persisted', async () => {
    await page.reload();
    await expect(articlePage.title).toHaveText(article.title);
    await expect(articlePage.bodyText(article.body)).toBeVisible();
  });
});

test('user cannot create an article without title', async ({ page, editorPage }) => {
  const article = createRandomArticle();

  await test.step('Open the editor and fill everything except title', async () => {
    await editorPage.open();
    await editorPage.fillDescription(article.description);
    await editorPage.fillBody(article.body);
  });

  await test.step('Click publish', async () => {
    await editorPage.publish();
  });

  await test.step('Verify validation error and no redirect', async () => {
    await expect(editorPage.errorMessages).toContainText("title can't be blank");
    await expect(editorPage.bodyInput).toHaveValue(article.body);
  });
});
