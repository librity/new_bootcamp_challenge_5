import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    if (this.transactions.length === 0) {
      return {
        income: 0,
        outcome: 0,
        total: 0,
      };
    }

    const totalIncome = this.calulateIncome();
    const totalOutcome = this.calulateOutcome();

    return {
      income: totalIncome,
      outcome: totalOutcome,
      total: totalIncome - totalOutcome,
    };
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }

  private calulateIncome(): number {
    const incomeTransactions = this.transactions.filter(
      transaction => transaction.type === 'income',
    );

    if (incomeTransactions.length === 0) return 0;

    const incomeArray = incomeTransactions.map(
      transaction => transaction.value,
    );

    return incomeArray.reduce((income, sum) => sum + income);
  }

  private calulateOutcome(): number {
    const outcomeTransactions = this.transactions.filter(
      transaction => transaction.type === 'outcome',
    );

    if (outcomeTransactions.length === 0) return 0;

    const outcomeArray = outcomeTransactions.map(
      transaction => transaction.value,
    );

    return outcomeArray.reduce((outcome, sum) => sum + outcome);
  }
}

export default TransactionsRepository;
