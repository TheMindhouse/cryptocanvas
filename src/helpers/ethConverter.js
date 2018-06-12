export const ethConverter = {
  eth2wei: (eth: number) => eth * 1000000000000000000,
  wei2eth: (wei: number) => wei / 1000000000000000000,
}