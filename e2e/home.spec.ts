import { test, expect } from "@playwright/test";

test("home page loads", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/SaaS Dashboard|Dashboard/i);
});

test("login page accessible", async ({ page }) => {
  await page.goto("/auth/login");
  await expect(page.getByRole("heading", { name: /sign in|welcome/i })).toBeVisible();
  await expect(page.getByLabel(/email/i)).toBeVisible();
  await expect(page.getByLabel(/password/i)).toBeVisible();
});

test("signup page accessible", async ({ page }) => {
  await page.goto("/auth/signup");
  await expect(page.getByRole("heading", { name: /sign up|create/i })).toBeVisible();
});
