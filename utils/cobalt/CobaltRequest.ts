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

async function cobaltFetcher(
  data: cobaltRequest
): Promise<cobaltResponse | null> {
  const option: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  };
  return await fetch("https://co.wuk.sh/api/json", option)
    .then((res: Response) => {
      if (!res.ok) throw new Error("res is not ok");
      return res.json();
    })
    .then((data: cobaltResponse) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.assert("request failed");
      return null;
    });
}

export default async function cobaltFetchWithUrl(
  id: string
): Promise<cobaltResponse | null> {
  dataWithoutUrl.url = `${id}`;
  return await cobaltFetcher(dataWithoutUrl);
}

export async function cobaltFetchWithIds(
  ids: Array<string>
): Promise<cobaltResponse | null> {
  dataWithoutUrl.url = "https://www.youtube.com/watch?v=" + ids[0];
  return await cobaltFetcher(dataWithoutUrl);
}

export const dataWithoutUrl: cobaltRequest = {
  url: "null",
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
