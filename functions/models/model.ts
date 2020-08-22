import { Client, Expr, query as q } from 'faunadb';

/**
 * Base model
 */
export abstract class Model<Data> {

  public data: Data;

  /**
   * Constructor
   */
  constructor(data?: Data) {
    this.data = this.initialData();

    if (data) {
      this.applyData(data);
    }
  }
  
  /**
   * Apply data
   */
  applyData(data: Partial<Data>): void {
    this.data = { ...this.data, ...data };
  }

  /**
   * Initial data
   */
  abstract initialData(): Data;

  /**
   * Execute a query transaction
   */
  static query<T>(client: Client, expressions: Expr[]) {
    return client.query<T>(q.Do(...expressions));
  }
}
