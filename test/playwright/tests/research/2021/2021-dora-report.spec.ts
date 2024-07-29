import { test, expect } from '@playwright/test';
import { sidebarLinks } from '../sidebarLinks';

const languageToUrlMap = {
  'English': '2021-dora-accelerate-state-of-devops-report.pdf',
  'Français': '2021-dora-accelerate-state-of-devops-report-fr.pdf',
  'Italiano': '2021-dora-accelerate-state-of-devops-report-it.pdf',
  'Polski': '2021-dora-accelerate-state-of-devops-report-pl.pdf',
  '繁體中文': '2021-dora-accelerate-state-of-devops-report-zh-tw.pdf',
  '日本語': '2021-dora-accelerate-state-of-devops-report-ja.pdf',
  '한국어': '2021-dora-accelerate-state-of-devops-report-ko.pdf'
};

test.beforeEach(async ({ page }) => {
  await page.goto('/research/2021/dora-report/');
});

test('2021 DORA report page has the correct title.', async ({ page }) => {
  await expect(page).toHaveTitle('DORA | Accelerate State of DevOps Report 2021');
});

test('2021 DORA report page has the correct header.', async ({ page }) => {
  await expect(page.locator('h1')).toContainText('DORA Research: 2021');
});

test('2021 DORA report page has the correct language.', async ({ page }) => {
  const languageOptions = await page.locator('item ul li').count();
  await expect(languageOptions).toBe(7);

  for (const language in languageToUrlMap) {
    const url = languageToUrlMap[language];
    const languageLink = page.getByRole('link', { name: language, exact: true });
    await expect(languageLink).toHaveAttribute('href', url);
  }
});

test('2021 DORA report page has the correct sidebar.', async ({ page }) => {
  for (const sidebarLink of sidebarLinks) {
    await expect(page.getByRole('link', { name: sidebarLink, exact: true })).toBeVisible();
  }
});
