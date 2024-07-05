import { Page } from '@playwright/test';

export class BettingTablePage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async selectBet(selection: string) {
    console.log(`Selecting bet: ${selection}`);
    await this.page.click(`tr[data-name="${selection}"] button`);
    console.log(`Bet selected: ${selection}`);
  }
}
