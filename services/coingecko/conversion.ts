export default class ConversionService {
  private static endpoint = process.env.NEXT_PUBLIC_COINGECKO_API_URl;

  static async findEthUsdPrice(): Promise<number> {
    try {
      const response = await fetch(
        `${this.endpoint}/simple/price?ids=ethereum&vs_currencies=usd`
      );

      if (response.ok) {
        const data = await response.json();
        return data.ethereum.usd as number;
      }

      throw new Error();
    } catch (error) {
      return 0;
    }
  }
}
