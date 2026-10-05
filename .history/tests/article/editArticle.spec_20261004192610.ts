import { test, expect } from '../../src/fixtures/fixtures';
import { createRandomArticle } from '../../src/utils/testData';

test('user can edit an existing article', async ({ page, articleApi, articlePage, editorPage }) => {
  // pre-condition: article created via API
  const original = createRandomArticle();
  const slug = await articleApi.createArticle(original);
  const updated = createRandomArticle();

  await articlePage.open(slug);
  await expect(articlePage.title).toHaveText(original.title);

  await articlePage.clickEdit();
  await expect(page).toHaveURL(new RegExp(`/editor/${slug}`));

  // form e ager data load hoyeche
  await expect(editorPage.titleInput).toHaveValue(original.title);
  await expect(editorPage.descriptionInput).toHaveValue(original.description);
  await expect(editorPage.bodyInput).toHaveValue(original.body);

  await editorPage.fillTitle(updated.title);
  await editorPage.fillDescription(updated.description);
  await editorPage.fillBody(updated.body);
  await editorPage.publish();

  // redirect + updated data
  await expect(page).toHaveURL(/\/article\//);
  await expect(articlePage.title).toHaveText(updated.title);
  await expect(articlePage.bodyText(updated.body)).toBeVisible();
  await expect(articlePage.bodyText(original.body)).toBeHidden();

  // data persist
  await page.reload();
  await expect(articlePage.title).toHaveText(updated.title);
  await expect(articlePage.bodyText(updated.body)).toBeVisible();
});
