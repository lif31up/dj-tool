interface YTResponse {
  items: {
    id: { videoId: string };
  }[];
}

type YTFetcherData = {
  pattern: string;
  key: string;
};
async function YTFetcher(data: YTFetcherData): Promise<string[]> {
  const { pattern, key }: YTFetcherData = data;

  const address: string = `https://www.googleapis.com/youtube/v3/search?key=${key}&q=${pattern}&part=snippet&type=video`;
  return await fetch(address)
    .then((response: Response) => {
      if (!response.ok)
        throw new Error(
          `YTFetcher: ${response.status}, ${response.statusText}`
        );
      return response.json();
    })
    .then((data: YTResponse) => {
      return data.items.map((item) => item.id.videoId);
    })
    .catch((error) => {
      console.log(error.message);
      return ["error"];
    });
}
export default YTFetcher;
