import axios from "axios";
const apiCrypto = axios.create({
  baseURL: "https://criptoya.com/api/",
});

const exchangeRipio = "ripio";
const exchangeSatoshi = "satoshitango";

export async function getBTC(cripto) {
  return apiCrypto.get(`${exchangeSatoshi}/${cripto}/ars`);
}
export async function getDAI(cripto) {
  return apiCrypto.get(`${exchangeSatoshi}/${cripto}/ars`);
}
export async function getETH(cripto) {
  return apiCrypto.get(`${exchangeRipio}/${cripto}/ars`);
}
export async function getUSDC(cripto) {
  return apiCrypto.get(`${exchangeRipio}/${cripto}/ars`);
}
