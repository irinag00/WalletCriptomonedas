import axios from "axios";
const apiClient = axios.create({
  baseURL: "https://laboratorio-36cf.restdb.io/rest/",
  headers: { "x-apikey": "64a5ccf686d8c5d256ed8fce" },
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
