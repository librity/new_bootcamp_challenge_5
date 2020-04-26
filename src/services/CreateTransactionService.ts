import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: CreateTransactionDTO): Transaction {
    const { total } = this.transactionsRepository.getBalance();

    if (type === 'outcome' && value > total)
      throw Error('Transação excede o valor disponível.');

    const newTransaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return newTransaction;
  }
}

export default CreateTransactionService;
