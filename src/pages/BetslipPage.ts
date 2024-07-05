import { Page, expect } from '@playwright/test';

export class BetslipPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async updateStake(stake: number) {
    console.log(`Updating stake to: ${stake}`);
    await this.page.fill('#stake-input', stake.toString());
    console.log(`Stake updated to: ${stake}`);
  }

  async updateOdds(odds: number) {
    console.log(`Updating odds to: ${odds}`);
    await this.page.fill('#odds-input', odds.toString());
    console.log(`Odds updated to: ${odds}`);
  }

  async getLiability() {
    const liability = await this.page.textContent('#liability-amount');
    console.log(`Liability: ${liability}`);
    return liability;
  }

  async getProfit() {
    const profit = await this.page.textContent('.bet-profit');
    console.log(`Profit: ${profit}`);
    return profit;
  }

  async placeBets() {
    console.log('Placing bets');
    await this.page.click('.place-btn');
    console.log('Bets placed');
  }

  async cancelBets() {
    console.log('Cancelling bets');
    await this.page.click('.cancel-btn');
    console.log('Bets cancelled');
  }

  async confirmBetsCheckbox() {
    console.log('Confirming bets checkbox');
    await this.page.check('#confirm-checkbox');
    console.log('Bets checkbox confirmed');
  }

  async handleAlertDialog() {
    console.log('Setting up alert dialog handler');
    this.page.once('dialog', dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });
  }

  async verifyProfit(expectedProfit: string) {
    const profit = await this.getProfit();
    expect(profit).toBe(expectedProfit);
    console.log(`Profit verified: ${expectedProfit}`);
  }

  async verifyLiability(expectedLiability: string) {
    const liability = await this.getLiability();
    expect(liability).toBe(expectedLiability);
    console.log(`Liability verified: ${expectedLiability}`);
  }
}
