import { wait } from "next/dist/lib/wait";
import {PlaylistElement, snippetGetIndex} from "@/components/section/Main_Playlist";

export default CBLTFetcherAll;

function CBLTFetcherAll(
  playlist: PlaylistElement[],
  thenHandler: (data: string | PlaylistElement, index: number) => void
): Promise<void>[] {
  return playlist.map(
    async (element: PlaylistElement, index: number): Promise<void> => {
      await wait(index * 6000);
      await CBLTFetcher(element.snippets[element.index].videoId, element).then((data: string | PlaylistElement) =>
        thenHandler(data, index)
      );
    }
  );
} // CBLTFetcherAll

const ERROR = "";
export async function CBLTFetcher(videoId: string, origin: PlaylistElement): Promise<string | PlaylistElement> {
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
      console.assert(error.message)
      const failedIndex = snippetGetIndex(videoId, origin)
      const newSnippets = [... origin.snippets]
      newSnippets[failedIndex].fail = 1
      return {...origin, snippets: newSnippets}
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
