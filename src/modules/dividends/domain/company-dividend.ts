interface CompanyDividend {
  companyName: string;
  netDividendUSD: number;
  netDividendEUR: number;
  withholdingTaxRate: string;
  withholdingTaxAmountUSD: number;
  withholdingTaxAmountEUR: number;
}

export type { CompanyDividend };
