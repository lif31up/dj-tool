import { PlaylistElement } from "@/utils/PlaylistAtom";
import { wait } from "next/dist/lib/wait";

export default CBLTFetcherAll;

function CBLTFetcherAll(
  playlist: PlaylistElement[],
  thenHandler: (data: string) => void
): Promise<void>[] {
  return playlist.map(
    async (element: PlaylistElement, index: number): Promise<void> => {
      await wait(index * 6000);
      await CBLTFetcher(element.snippets[element.index].videoId).then((data) =>
        thenHandler(data)
      );
    }
  );
} // CBLTFetcherAll

export async function CBLTFetcher(videoId: string): Promise<string> {
  dataWithoutUrl.url = `https://www.youtube.com/watch?v=${videoId}`;
  const option: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    }, // headers
    body: JSON.stringify(dataWithoutUrl),
  }; // option
  return await fetch("https://co.wuk.sh/api/json", option)
    .then((response: Response) => {
      if (!response.ok)
        throw new Error(
          `CBLTFetcher: ${response.status}, ${response.statusText}`
        ); // throw
      return response.json();
    }) // then()
    .then((data: cobaltResponse) => {
      console.log(data);
      return data.url;
    }) // then()
    .catch((error) => {
      console.log(error.message);
      return "";
    }); // fetch()
} // CBLTFetcher()

interface CBLTFetcher {
  url: string;
  vCodec: string;
  vQuality: string;
  aFormat: string;
  filenamePattern: string;
  isAudioOnly: boolean;
  isAudioMuted: boolean;
  dubLang: boolean;
  disableMetadata: boolean;
  twitterGif: boolean;
  vimeoDash: boolean;
} // CBLTFetcher

const dataWithoutUrl: CBLTFetcher = {
  url: "insert_your_url",
  vCodec: "h264",
  vQuality: "720",
  aFormat: "mp3",
  filenamePattern: "basic",
  isAudioOnly: true,
  isAudioMuted: false,
  dubLang: false,
  disableMetadata: false,
  twitterGif: false,
  vimeoDash: false,
}; // dataWithoutUrl

interface cobaltResponse {
  status: string; // 0: not parsed, 1: parsed
  text: string;
  url: string;
  pickerType: string;
  picker: string;
  audio: string;
} // cobaltResponse
