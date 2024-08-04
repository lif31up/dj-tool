import { PlaylistElement, Snippet } from "@/components/section/Main_Playlist";

export default YTFetcherAll;

function YTFetcherAll(
  playlist: PlaylistElement[],
  key: string,
  thenHandler: (data: PlaylistElement) => void
): Promise<void>[] {
  return playlist.map(async (element): Promise<void> => {
    await YTFetcher(element, key).then((data) => thenHandler(data));
  });
} // YTFetcherAll()

async function YTFetcher(
  data: PlaylistElement,
  key: string
): Promise<PlaylistElement> {
  const { title, artist }: PlaylistElement = data;
  const address: string = `https://www.googleapis.com/youtube/v3/search?key=${key}&q="${title.replaceAll(
    " ",
    "+"
  )}"+${artist.replaceAll(" ", "+")}+OR+"${title.replaceAll(
  " ",
  "+"
  )}"+${artist.replaceAll(" ", "+")}+"extend"&part=snippet&type=video`;
  console.log(address);
  return await fetch(address)
    .then((response: Response) => {
      if (!response.ok)
        throw new Error(
          `YTFetcher: ${response.status}, ${response.statusText}`
        );
      return response.json();
    }) // then
    .then((data: YoutubeResponseData): PlaylistElement => {
      return {
        title: title,
        artist: artist,
        index: 0,
        snippets: data.items.map((item): Snippet => {
          return { name: item.snippet.title, videoId: item.id.videoId, fail: 0 };
        }), // snippets
      }; // return
    }) // then
    .catch((error): PlaylistElement => {
      console.warn(error.message);
      return { title: title, artist: artist, index: 0, snippets: [] };
    }); // catch
} // YTFetcher

type YoutubeResponseData = {
  etag: string;
  items: {
    etag: string;
    id: { videoId: string };
    kind: string;
    snippet: { publishedAt: string; channelId: string; title: string };
  }[];
  kind: string;
  nextPageToken: string;
  pageInfo: object;
  regionCode: string;
}; // YoutubeResponseData
