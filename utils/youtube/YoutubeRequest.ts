import { isOfType } from "@/utils/DefaultProps";

type YTFetcherData = {
  pattern: string;
  key: string;
};

async function YTFetcher(data: YTFetcherData): Promise<string[] | Error> {
  let videoIds: string[] | Error = new Error("ytFetcher: unkonwn error");
  if (!isOfType<YTFetcherData>(data)) {
    videoIds.message = "YTFetcher: data is not YtFetcherData type.";
  } // if
  else {
    const { pattern, key }: YTFetcherData = data;

    const address: string = `https://www.googleapis.com/youtube/v3/search?key=${key}&q=${pattern}&part=snippet&type=video`;
    videoIds = await fetch(address)
      .then((response: Response) => {
        if (!response.ok) throw new Error("youtuberFetcher: res is not ok.");
        return response.json();
      })
      .then((data: JSON) => {
        console.log(data);
        //@ts-ignore
        return data.items.map((item) => item.id.videoId);
      })
      .catch((error) => {
        return error;
      });
  } // else
  return videoIds;
}
export default YTFetcher;
