import { wait } from "next/dist/lib/wait";
import { isOfType } from "@/utils/DefaultProps";

export interface cobaltRequest {
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
}

export interface cobaltResponse {
  status: string;
  text: string;
  url: string;
  pickerType: string;
  picker: string;
  audio: string;
}

async function CBLTFetcher(data: cobaltRequest): Promise<string | Error> {
  const option: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  }; // option
  return await fetch("https://co.wuk.sh/api/json", option)
    .then((res: Response) => {
      if (!res.ok) throw new Error("CBLTFetcher: res is not ok");
      return res.json();
    })
    .then((data: cobaltResponse) => {
      return data.url;
    })
    .catch((error) => {
      return error;
    }); // fetch()
} // CBLTFetcher()

type CBLTFetcherWithIdsData = {
  videoIds: string[];
  index: number;
};
export async function CBLTFetcherWithIds(
  data: CBLTFetcherWithIdsData,
  iterator: number = 0
): Promise<string | Error> {
  let CBLTUrl: string | Error = new Error("CBLTFetcherWithIds: unknown error.");

  if (!isOfType<CBLTFetcherWithIdsData>(data)) {
    CBLTUrl.message = "CBLTFetcherWithIds: argument's type is wrong.";
    return CBLTUrl;
  } // if

  const { videoIds, index }: CBLTFetcherWithIdsData = data;
  if (iterator >= videoIds.length) return "EOI";
  dataWithoutUrl.url = "https://www.youtube.com/watch?v=" + videoIds[iterator];
  await wait(5500 * index);
  CBLTUrl = await CBLTFetcher(dataWithoutUrl).catch((error) => {
    return CBLTFetcherWithIds(
      { videoIds: videoIds, index: index },
      iterator + 1
    ); // CBLTFetcherWithIds()
  }); // CBLTFetcher()
  if (CBLTUrl === "EOI") {
    return new Error("CBLTFetcherWithIds: can't iterate anymore.");
  } // if
  return CBLTUrl;
} // CBLTFetcherWithIds():

export const dataWithoutUrl: cobaltRequest = {
  url: "insert_your_url",
  vCodec: "h264",
  vQuality: "720",
  aFormat: "mp3",
  filenamePattern: "pretty",
  isAudioOnly: true,
  isAudioMuted: false,
  dubLang: false,
  disableMetadata: false,
  twitterGif: false,
  vimeoDash: false,
};
