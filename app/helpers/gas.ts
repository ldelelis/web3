const ETHERCHAIN_URL = "https://etherchain.org/api/gasPriceOracle"

export function getGasPrice(): Promise<number> {
  return fetch(ETHERCHAIN_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then(({ fast }) => fast)
}
