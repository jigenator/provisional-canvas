import { test, expect } from "@playwright/test";

test("page loads with correct title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Provisional Canvas");
});

test("heading is visible", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /provisional canvas/i })).toBeVisible();
});
