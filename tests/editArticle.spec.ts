import { test, expect } from '../src/fixtures/fixtures';
import { createRandomArticle } from '../src/utils/testData';

test('user can edit an existing article', async ({ page, articleApi, articlePage, editorPage }) => {
  const original = createRandomArticle();
  const updated = createRandomArticle();

  const slug = await test.step('Pre-condition: create article via API', async () => {
    return articleApi.createArticle(original);
  });

  await test.step('Open the article page', async () => {
    await articlePage.open(slug);
    await expect(articlePage.title).toHaveText(original.title);
  });

  await test.step('Click edit and verify the form has current data', async () => {
    await articlePage.clickEdit();
    await expect(page).toHaveURL(new RegExp(`/editor/${slug}`));
    await expect(editorPage.titleInput).toHaveValue(original.title);
    await expect(editorPage.descriptionInput).toHaveValue(original.description);
    await expect(editorPage.bodyInput).toHaveValue(original.body);
  });

  await test.step('Update title, description, body and publish', async () => {
    await editorPage.fillTitle(updated.title);
    await editorPage.fillDescription(updated.description);
    await editorPage.fillBody(updated.body);
    await editorPage.publish();
  });

  await test.step('Verify redirect and updated data is shown', async () => {
    await expect(page).toHaveURL(/\/article\//);
    await expect(articlePage.title).toHaveText(updated.title);
    await expect(articlePage.bodyText(updated.body)).toBeVisible();
    await expect(articlePage.bodyText(original.body)).toBeHidden();
  });

  await test.step('Reload and verify the update is persisted', async () => {
    await page.reload();
    await expect(articlePage.title).toHaveText(updated.title);
    await expect(articlePage.bodyText(updated.body)).toBeVisible();
  });
});

test("user cannot edit another user's article", async ({ page, otherArticleApi, articlePage }) => {
  const article = createRandomArticle();

  const slug = await test.step('Pre-condition: another user creates article via API', async () => {
    return otherArticleApi.createArticle(article);
  });

  await test.step('Open the article and verify edit button is hidden', async () => {
    await articlePage.open(slug);
    await expect(articlePage.title).toHaveText(article.title);
    await expect(articlePage.editButton).toBeHidden();
  });

  await test.step('Open editor URL directly and verify redirect to home', async () => {
    await page.goto(`/editor/${slug}`);
    await expect(page).toHaveURL(`${process.env.BASE_URL}/`);
  });

  await test.step('Verify the article is unchanged via API', async () => {
    const saved = await otherArticleApi.getArticle(slug);
    expect(saved.title).toBe(article.title);
  });
});
