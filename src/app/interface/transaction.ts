export interface ITransaction{
    id: number,
    date: Date,
    customerId: number,
    productId: number,
    transactionType: string,
    quantity: number,
    parentTransactionId: number
}