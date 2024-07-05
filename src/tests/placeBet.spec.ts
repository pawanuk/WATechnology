import { test, expect } from '@playwright/test';
import { BettingTablePage } from '../pages/BettingTablePage';
import { BetslipPage } from '../pages/BetslipPage';
import { betData } from '../data/betsData';

test.describe('Betslip Automation Tests', () => {
  let bettingTablePage: BettingTablePage;
  let betslipPage: BetslipPage;

  test.beforeEach(async ({ page }) => {
    bettingTablePage = new BettingTablePage(page);
    betslipPage = new BetslipPage(page);
    await page.goto('http://127.0.0.1:5501/bet.html'); // Adjust the path accordingly
  });

  for (const data of betData) {
    test(`should correctly handle bet selection and updates for ${data.selection}`, async ({ page }) => {
      await bettingTablePage.selectBet(data.selection);

      // Initial stake and odds verification
      await betslipPage.updateStake(data.initialStake);
      await betslipPage.updateOdds(data.initialOdds);

      await betslipPage.verifyProfit(data.expectedInitialProfit);
      await betslipPage.verifyLiability(data.expectedInitialLiability);

      // Updated stake and odds verification
      await betslipPage.updateStake(data.updatedStake);
      await betslipPage.updateOdds(data.updatedOdds);

      await betslipPage.verifyProfit(data.expectedUpdatedProfit);
      await betslipPage.verifyLiability(data.expectedUpdatedLiability);

      // Ensure place bet button is visible and clickable
      console.log('Ensuring place bet button is visible and clickable');
      await page.waitForSelector('.place-btn', { state: 'visible' });

      // Handle alert dialog
      await betslipPage.handleAlertDialog();
      await betslipPage.placeBets();

      // Validate alert dialog message
      await betslipPage.handleAlertDialog();

      await betslipPage.cancelBets();
      await betslipPage.verifyLiability('£0.00');
    });
  }

  // Add a separate test case for placing bets with confirmation
  test('Place bets with confirmation and verify alert', async ({ page }) => {
    const data = betData[0]; // Use first data entry for this test
    await bettingTablePage.selectBet(data.selection);
    await betslipPage.updateStake(data.initialStake);
    await betslipPage.updateOdds(data.initialOdds);
    await betslipPage.confirmBetsCheckbox();

    // Ensure place bet button is visible and clickable
    console.log('Ensuring place bet button is visible and clickable');
    await page.waitForSelector('.place-btn', { state: 'visible' });

    // Handle alert dialog
    await betslipPage.handleAlertDialog();
    await betslipPage.placeBets();

    // Validate alert dialog message
    await betslipPage.handleAlertDialog();

    await betslipPage.cancelBets();
    await betslipPage.verifyLiability('£0.00');
  });
});
