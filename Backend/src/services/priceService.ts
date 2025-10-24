import axios from 'axios';

export async function getTokenPrice(tokenAddress: string): Promise<number> {
  try {
    const response = await axios.get(`${process.env.DEXSCREENER_API}${tokenAddress}`);
    return response.data.pairs[0]?.priceUsd || 0;
  } catch (error) {
    throw new Error('Failed to fetch token price');
  }
}

export async function getETHPrice(): Promise<number> {
  try {
    const response = await axios.get(process.env.COINGECKO_API!);
    return response.data.ethereum.usd;
  } catch (error) {
    throw new Error('Failed to fetch ETH price');
  }
}