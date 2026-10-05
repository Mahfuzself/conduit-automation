import { test, expect } from '../src/fixtures/fixtures';
import { createRandomUser, createRandomProfile } from '../src/utils/testData';

test('user can update settings', async ({ page, userApi, settingsPage }) => {
  const user = createRandomUser();
  const updated = createRandomProfile();

  const token = await test.step('Pre-condition: create own user via API and log in', async () => {
    // own user, so the shared session user is not changed
    await userApi.signup(user);
    const userToken = await userApi.login(user);
    await page.addInitScript((t) => localStorage.setItem('jwtToken', t), userToken);
    return userToken;
  });

  await test.step('Open settings page', async () => {
    await settingsPage.open();
    await expect(settingsPage.heading).toBeVisible();
  });

  await test.step('Update image, username, bio, email and password', async () => {
    await settingsPage.updateSettings(updated);
  });

  await test.step('Verify redirect to profile with new data', async () => {
    await expect(page).toHaveURL(new RegExp(`/profile/${updated.username}`));
    await expect(page.getByRole('heading', { name: updated.username })).toBeVisible();
    await expect(page.getByText(updated.bio)).toBeVisible();
  });

  await test.step('Reload and verify data is persisted in UI', async () => {
    await page.reload();
    await expect(page.getByRole('heading', { name: updated.username })).toBeVisible();
    await expect(page.getByText(updated.bio)).toBeVisible();
  });

  await test.step('Verify data is saved in backend', async () => {
    const savedUser = await userApi.getCurrentUser(token);
    expect(savedUser).toMatchObject({
      username: updated.username,
      email: updated.email,
      bio: updated.bio,
      image: updated.image,
    });
  });

  await test.step('Verify login works with new email and password', async () => {
    await userApi.login({ email: updated.email, password: updated.password });
  });
});

test('user cannot change email to one already taken', async ({ page, userApi, settingsPage }) => {
  const user = createRandomUser();
  const otherUser = createRandomUser();

  const token = await test.step('Pre-condition: create own user and another user via API', async () => {
    await userApi.signup(user);
    const userToken = await userApi.login(user);
    await userApi.signup(otherUser);
    await page.addInitScript((t) => localStorage.setItem('jwtToken', t), userToken);
    return userToken;
  });

  await test.step('Open settings page', async () => {
    await settingsPage.open();
    await expect(settingsPage.heading).toBeVisible();
  });

  await test.step("Set the other user's email and verify server rejects it", async () => {
    await settingsPage.emailInput.fill(otherUser.email);
    await settingsPage.passwordInput.fill(user.password);
    const updateResponse = page.waitForResponse(
      (res) => res.url().includes('/api/user') && res.request().method() === 'PUT',
    );
    await settingsPage.updateButton.click();
    expect((await updateResponse).ok()).toBe(false);
  });

  await test.step('Verify no redirect to profile', async () => {
    await expect(page).toHaveURL(/\/settings$/);
  });

  await test.step('Verify email is not changed in backend', async () => {
    const savedUser = await userApi.getCurrentUser(token);
    expect(savedUser.email).toBe(user.email);
  });
});
