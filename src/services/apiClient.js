import axios from "axios";
const apiClient = axios.create({
  baseURL: "https://labor3-d60e.restdb.io/rest/",
  headers: { "x-apikey": "64a2e9bc86d8c525a3ed8f63" },
});

export function getAllTransactions(userId) {
  return apiClient.get(`/transactions?q={"user_id": "${userId}"}`);
}
export function getTransactionId(id) {
  return apiClient.get(`/transactions/${id}}`);
}
export function newTransaction(transaction) {
  return apiClient.post("/transactions", transaction);
}
export function deleteTransaction(id) {
  return apiClient.delete(`/transactions/${id}`);
}
export function updateTransaction(id, update) {
  return apiClient.patch(`/transactions/${id}`, update);
}
