"use client";

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
    box: "w-full h-10",
    layout: "",
    bg_border: "bg-green-900 hover:bg-green-700",
    typo: "text-sm font-bold text-teal-100",
  }; // tailname
  const downloading_tailname: string = "pointer-events-none opacity-50";

  return (
    <button
      className={`${TailClassName(tailname)} ${
        downloading || playlist.length < 1 ? downloading_tailname : ""
      }`}
      onClick={clickHandler}
    >
      DOWNLOAD
    </button>
  ); // return
} // CBLTDownloader
