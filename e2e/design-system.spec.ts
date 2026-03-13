import { test, expect } from '@playwright/test';

// Helper — contenedor del demo en desktop (dentro del iPhone frame)
const DEMO = '.app-content';

test.describe('Citi Design System', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173');
    });

    // ─── Overview ───────────────────────────────────────
    test('loads dashboard and shows overview', async ({ page }) => {
        await expect(page.locator('.dashboard-topbar')).toBeVisible();
        await expect(page.locator('.dashboard-topbar__text')).toHaveText('citi');
        await expect(page.locator('.sidebar')).toBeVisible();
    });

    // ─── Navigation ─────────────────────────────────────
    test('navigates to Buttons section', async ({ page }) => {
        await page.getByRole('button', { name: /botones/i }).click();
        await expect(page.locator('#buttons')).toBeVisible();
    });

    test('navigates to Colors section', async ({ page }) => {
        await page.getByRole('button', { name: /colores/i }).click();
        await expect(page.locator('.dashboard-main')).toBeVisible();
    });

    // ─── Dark Mode ──────────────────────────────────────
    test('toggles dark mode', async ({ page }) => {
        const html = page.locator('html');
        await expect(html).not.toHaveAttribute('data-theme', 'dark');
        await page.locator('[aria-label*="oscuro"]').click();
        await expect(html).toHaveAttribute('data-theme', 'dark');
        await page.locator('[aria-label*="claro"]').click();
        await expect(html).not.toHaveAttribute('data-theme', 'dark');
    });

    // ─── i18n ────────────────────────────────────────────
    test('toggles language ES/EN', async ({ page }) => {
        await expect(page.locator('.lang-label')).toHaveText('ES');
        await page.locator('[aria-label="Cambiar idioma"]').click();
        await expect(page.locator('.lang-label')).toHaveText('EN');
    });

    // ─── Demo App ────────────────────────────────────────
    test('opens demo app', async ({ page }) => {
        await page.locator('.dashboard-topbar__demo').click();
        await expect(page.locator('.demo-viewer--desktop')).toBeVisible();
        await expect(page.locator(`${DEMO} .citi-demo`)).toBeVisible();
    });

    test('demo app — navigates to transfer screen', async ({ page }) => {
        await page.locator('.dashboard-topbar__demo').click();
        await expect(page.locator('.demo-viewer--desktop')).toBeVisible();

        await page.locator(`${DEMO} .demo-nav__item`)
            .filter({ hasText: /transferir/i })
            .click();

        await expect(
            page.locator(`${DEMO} .screen-title`)
        ).toHaveText('Transferir');
    });

    test('demo app — completes transfer flow', async ({ page }) => {
        await page.locator('.dashboard-topbar__demo').click();
        await expect(page.locator('.demo-viewer--desktop')).toBeVisible();

        // Ir a Transfer
        await page.locator(`${DEMO} .demo-nav__item`)
            .filter({ hasText: /transferir/i })
            .click();

        // Step 1 — seleccionar cuenta
        await page.locator(`${DEMO} .account-item`).first().click();
        await page.locator(`${DEMO}`)
            .getByRole('button', { name: /continuar/i })
            .click();

        // Step 2 — llenar CLABE
        await page.locator(`${DEMO} input`).first().fill('012345678901234567');
        await page.locator(`${DEMO}`)
            .getByRole('button', { name: /continuar/i })
            .click();

        // Step 3 — confirmar
        await expect(
            page.locator(`${DEMO} .confirmation-details`)
        ).toBeVisible();
        await page.locator(`${DEMO}`)
            .getByRole('button', { name: /confirmar/i })
            .click();

        // Success modal — usar role="dialog"
        await expect(
            page.getByRole('dialog')
        ).toBeVisible({ timeout: 8000 });
    });

    test('modal opens and closes', async ({ page }) => {
        await page.getByRole('button', { name: /^modal$/i }).click();
        await page.waitForTimeout(300);
        await page.locator('#modal').getByRole('button', { name: 'Default' }).click();
        // Modal usa role="dialog"
        await expect(page.getByRole('dialog')).toBeVisible();
        await page.keyboard.press('Escape');
        await expect(page.getByRole('dialog')).not.toBeVisible();
    });

    test('demo app — navigates to payments screen', async ({ page }) => {
        await page.locator('.dashboard-topbar__demo').click();
        await expect(page.locator('.demo-viewer--desktop')).toBeVisible();

        await page.locator(`${DEMO} .demo-nav__item`)
            .filter({ hasText: /pagos/i })
            .click();

        await expect(
            page.locator(`${DEMO} .payments-grid`)
        ).toBeVisible();
    });

    test('demo app — closes on X button', async ({ page }) => {
        await page.locator('.dashboard-topbar__demo').click();
        await expect(page.locator('.demo-viewer--desktop')).toBeVisible();
        await page.locator('.demo-viewer__close').click();
        await expect(page.locator('.demo-viewer--desktop')).not.toBeVisible();
    });

    test('select opens dropdown', async ({ page }) => {
        await page.getByRole('button', { name: /^select$/i }).click();
        await page.waitForTimeout(300);
        await page.locator('#select .citi-select__trigger').first().click();
        await expect(page.locator('.citi-select__dropdown')).toBeVisible();
    });
});