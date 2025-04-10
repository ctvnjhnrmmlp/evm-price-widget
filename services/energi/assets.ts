export default class AssetService {
  private static endpoint = process.env.NEXT_PUBLIC_ENERGISWAP_API_URL;

  static async findAssets(): Promise<
    | {
        address: string;
        name: string;
        symbol: string;
        last_price: number;
      }[]
    | []
  > {
    try {
      const response = await fetch(`${this.endpoint}/assets`);

      if (response.ok) {
        return await response.json();
      }

      throw new Error();
    } catch (error) {
      return [];
    }
  }
}
