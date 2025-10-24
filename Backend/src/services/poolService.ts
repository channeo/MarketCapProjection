import { ethers } from 'ethers';

const POOL_ABI = [
  'function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)'
];

let cachedReserves: { [pair: string]: { reserveToken: number; reserveETH: number } } = {};

export async function getPoolReserves(pairAddress: string): Promise<{ reserveToken: number; reserveETH: number }> {
  if (cachedReserves[pairAddress]) {
    console.log(`Using cached reserves for ${pairAddress}`);
    return cachedReserves[pairAddress];
  }
  try {
    console.log('ALCHEMY_API_KEY:', process.env.ALCHEMY_API_KEY ? '**** (hidden)' : 'undefined');
    console.log('Constructing provider with URL: https://eth-mainnet.g.alchemy.com/v2/<key>');
    console.log('Fetching reserves for pair:', pairAddress);
    const provider = new ethers.AlchemyProvider('mainnet', process.env.ALCHEMY_API_KEY);
    console.log('Provider initialized');
    const pool = new ethers.Contract(pairAddress, POOL_ABI, provider);
    console.log('Contract created for pair:', pairAddress);
    const [reserve0, reserve1] = await pool.getReserves();
    console.log('Reserves fetched:', { reserve0: Number(reserve0), reserve1: Number(reserve1) });
    cachedReserves[pairAddress] = { reserveToken: Number(reserve0), reserveETH: Number(reserve1) };
    return cachedReserves[pairAddress];
  } catch (error: any) {
    console.error('Error fetching reserves for pair', pairAddress, ':', error.message, error);
    throw new Error('Failed to fetch pool reserves');
  }
}