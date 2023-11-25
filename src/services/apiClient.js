import axios from "axios";
const apiClient = axios.create({
  baseURL: "https://labor3-d60e.restdb.io/rest/",
  headers: { "x-apikey": "64a2e9bc86d8c525a3ed8f63" },
});

export async function getAllTransactions(userId) {
  return apiClient.get(`/transactions?q={"user_id": "${userId}"}`);
}
export async function newTransaction(transaction) {
  return apiClient.post("/transactions", transaction);
}
export async function deleteTransaction(id) {
  return apiClient.delete(`/transactions/${id}`);
}
export async function updateTransaction(id, update) {
  return apiClient.patch(`/transactions/${id}`, update);
}
