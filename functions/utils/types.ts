/**
 * Fauna document
 */
export type FaunaDocument<Data> = {
  data: Data,
  ref: any,
  ts: number,
}
