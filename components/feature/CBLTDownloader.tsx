import CBLTFetcherAll from "@/utils/CBLTFetcher";
import DefaultProps from "@/utils/DefaultProps";
import { RecoilState, useRecoilValue } from "recoil";
import { PlaylistElement } from "@/utils/PlaylistAtom";
import { useState } from "react";
import TailProperties, { TailClassName } from "@/styles/TailwindProperties";

export default CBLTDownloader;

interface CBLTDownloaderProps extends DefaultProps<never> {
  playlistAtom: RecoilState<PlaylistElement[]>;
} // CBLTDownloaderProps
function CBLTDownloader({ playlistAtom, className }: CBLTDownloaderProps) {
  const playlist = useRecoilValue<PlaylistElement[]>(playlistAtom);
  const [downloading, setDownloading] = useState<boolean>(false);

  const clickHandler = (): void => {
    if (downloading) return;
    setDownloading(true);
    const promiseArray: Promise<void>[] = CBLTFetcherAll(
      playlist,
      (data: string): void => {
        window.open(data);
      } // thenHandler
    ); // clickHandler
    Promise.all(promiseArray).then(() => setDownloading(false));
  }; // clickHandler

  const tailname: TailProperties = {
    box: "",
    layout: "",
  }; // tailname
  const downloading_tailname: string = "";

  return (
    <div
      className={`${TailClassName(tailname)} ${className} ${
        downloading ? downloading_tailname : ""
      }`}
    >
      <button className="p-2 bg-gray-800" onClick={clickHandler}>
        내려받기
      </button>
    </div>
  ); // return
} // CBLTDownloader
