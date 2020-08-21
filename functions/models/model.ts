import { Expr } from 'faunadb';

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
   * Create
   */
  abstract create(): Expr;

  /**
   * Initial data
   */
  abstract initialData(): Data;
}
