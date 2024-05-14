export interface CBLTRequest {
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

type CBLTFetcherData = {
  url: string;
};
async function CBLTFetcher(data: CBLTFetcherData): Promise<string> {
  dataWithoutUrl.url = data.url;
  const option: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(dataWithoutUrl),
  }; // option
  return await fetch("https://co.wuk.sh/api/json", option)
    .then((response: Response) => {
      if (!response.ok)
        throw new Error(
          `CBLTFetcher: ${response.status}, ${response.statusText}`
        );
      return response.json();
    }) // then()
    .then((data: cobaltResponse) => {
      return data.url;
    }) // then()
    .catch((error) => {
      console.log(error.message);
      return "error";
    }); // fetch()
} // CBLTFetcher()
export default CBLTFetcher;

type CBLTFetchWithIdsData = {
  ids: string[];
};
export async function CBLTFetchWithIds(data: CBLTFetchWithIdsData) {
  const { ids }: CBLTFetchWithIdsData = data;
}

export const dataWithoutUrl: CBLTRequest = {
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
