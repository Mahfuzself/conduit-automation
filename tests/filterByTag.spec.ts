import { test, expect } from '../src/fixtures/fixtures';
import { createRandomArticle } from '../src/utils/testData';

test('user can filter articles by tag', async ({ homePage, articleApi }) => {
  const tag = await test.step('Open home page and pick the first popular tag', async () => {
    await homePage.open();
    await expect(homePage.popularTags.first()).toBeVisible();
    return homePage.getFirstPopularTag();
  });

  const article = { ...createRandomArticle(), tags: [tag] };

  await test.step('Pre-condition: create article with this tag via API', async () => {
    await articleApi.createArticle(article);
  });

  await test.step('Click the tag and verify tag tab is active', async () => {
    await homePage.filterByTag(tag);
    await expect(homePage.activeTagTab(tag)).toBeVisible();
  });

  await test.step('Verify our article is in the filtered list', async () => {
    await expect(homePage.articlePreview(article.title)).toBeVisible();
  });

  await test.step('Verify every article in the list has the selected tag', async () => {
    const previews = await homePage.articlePreviews.all();
    expect(previews.length).toBeGreaterThan(0);
    for (const preview of previews) {
      await expect(homePage.previewTag(preview, tag)).toBeVisible();
    }
  });
});

test('filter by tag does not show articles with other tags', async ({ homePage, articleApi }) => {
  const article = { ...createRandomArticle(), tags: [`uniq${Date.now()}`] };

  await test.step('Pre-condition: create article with a unique tag via API', async () => {
    await articleApi.createArticle(article);
  });

  const tag = await test.step('Open home page and pick the first popular tag', async () => {
    await homePage.open();
    await expect(homePage.popularTags.first()).toBeVisible();
    return homePage.getFirstPopularTag();
  });

  await test.step('Click the tag and verify the list is filtered', async () => {
    await homePage.filterByTag(tag);
    await expect(homePage.activeTagTab(tag)).toBeVisible();
    await expect(homePage.previewTag(homePage.articlePreviews.first(), tag)).toBeVisible();
  });

  await test.step('Verify our article with another tag is not in the list', async () => {
    await expect(homePage.articlePreview(article.title)).toHaveCount(0);
  });
});
