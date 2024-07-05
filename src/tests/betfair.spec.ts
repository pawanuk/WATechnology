import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.betfair.com/exchange/plus/politics/market/1.225749946');
  await page.locator('.onetrust-pc-dark-filter').click();
  await page.locator('.onetrust-pc-dark-filter').click();
  await page.getByRole('button', { name: 'Allow all cookies' }).click();
  await page.getByPlaceholder('email/username').click();
  await page.getByPlaceholder('email/username').fill('pawanuk');
  await page.getByPlaceholder('password').click();
  await page.getByPlaceholder('password').fill('Pawankumar12');
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.getByRole('button', { name: '280 £' }).click();
  await page.locator('betslip-size-input').getByRole('textbox').click();
  await page.locator('betslip-size-input').getByRole('textbox').fill('100');
  await page.locator('betslip-price-ladder').getByRole('textbox').click();
  await page.locator('betslip-price-ladder').getByRole('textbox').fill('390');
  await page.getByRole('button', { name: 'Place bets' }).click();
  await page.getByRole('button', { name: 'Edit bets' }).click();
  await page.locator('betslip-price-ladder').getByRole('textbox').fill('500');
  await page.locator('betslip-size-input').getByRole('textbox').click();
  await page.locator('betslip-size-input').getByRole('textbox').fill('1000');
  await page.getByRole('button', { name: 'Place bets' }).click();
  await page.getByRole('button', { name: 'Confirm bets' }).click();
  await page.getByRole('button', { name: 'View place bets' }).click();
  await page.getByRole('button', { name: 'Cancel all selections' }).click();
});