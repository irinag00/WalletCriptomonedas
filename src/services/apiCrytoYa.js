import axios from "axios";
const apiCrypto = axios.create({
  baseURL: "https://criptoya.com/api/",
});

const exchangeRipio = "ripio";
const exchangeSatoshi = "satoshitango";

export function getBTC(cripto) {
  return apiCrypto.get(`${exchangeSatoshi}/${cripto}/ars`);
}
export function getDAI(cripto) {
  return apiCrypto.get(`${exchangeSatoshi}/${cripto}/ars`);
}
export function getETH(cripto) {
  return apiCrypto.get(`${exchangeRipio}/${cripto}/ars`);
}
export function getUSDC(cripto) {
  return apiCrypto.get(`${exchangeRipio}/${cripto}/ars`);
}
