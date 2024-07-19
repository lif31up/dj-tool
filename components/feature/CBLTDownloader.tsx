"use client";

import CBLTFetcherAll from "@/utils/CBLTFetcher";
import DefaultProps from "@/utils/DefaultProps";
import { RecoilState, useRecoilValue } from "recoil";
import { CSSProperties, ReactElement, useEffect, useState } from "react";
import TailProperties, { TailClassName } from "@/styles/TailwindProperties";
import { PlaylistElement } from "@/components/section/Main_Playlist";

export default CBLTDownloader;

interface CBLTDownloaderProps extends DefaultProps<never> {
  playlistAtom: RecoilState<PlaylistElement[]>;
} // CBLTDownloaderProps
function CBLTDownloader({ playlistAtom, className }: CBLTDownloaderProps) {
  const playlist = useRecoilValue<PlaylistElement[]>(playlistAtom);
  const [isUnactive, setIsUnactive] = useState<boolean>(true);
  const [progressIndex, setProgressIndex] = useState<number>(0);

  useEffect(() => {
    if (
      playlist.filter((element: PlaylistElement) => element.snippets.length > 0)
        .length < 1
    )
      setIsUnactive(true);
    else setIsUnactive(false);
  }, [playlist]);

  const clickHandler = (): void => {
    if (isUnactive) return;
    setIsUnactive(true);
    setProgressIndex(0);
    const promiseArray: Promise<void>[] = CBLTFetcherAll(
      playlist,
      (data: string, index: number): void => {
        if (data !== "") window.open(data);
        else console.log(`element of ${index} failed to download.`)
        setProgressIndex(index);
      } // thenHandler
    ); // clickHandler
    Promise.all(promiseArray).then(() => {
      setIsUnactive(false);
      setProgressIndex(0);
    });
  }; // clickHandler

  const tailname: TailProperties = {
    box: "w-full h-fit  p-2",
    layout: "grid gap-1",
    bg_border: "bg-green-900",
    typo: "text-sm font-bold text-teal-100",
  }; // tailname
  const buttonStyle: CSSProperties = {
    width: "100%",
    height: "32px",
  }; // buttonStyle

  return (
    <section className={`${TailClassName(tailname)} ${className}`}>
      <Loader length={playlist.length} progress={progressIndex} />
      <button
        onClick={clickHandler}
        style={buttonStyle}
        className={
          !isUnactive
            ? "flex items-center justify-center font-bold bg-green-400 text-green-900"
            : "flex items-center justify-center font-bold bg-green-400 text-green-900 opacity-10 pointer-events-none"
        } // className
      >
        Download
      </button>
    </section>
  ); // return
} // CBLTDownloader

interface LoaderProps extends DefaultProps<never> {
  length: number;
  progress: number;
} // LoaderProps
function Loader({ length, progress, className }: LoaderProps) {
  const nodeListOfBar: ReactElement[] = [];
  for (let index: number = 0; index < 24; index++) {
    if (length - 1 === progress)
      nodeListOfBar.push(
        <div key={index} className="w-full h-4  bg-green-400" />
      );
    else
      nodeListOfBar.push(
        <div
          key={index}
          className={
            index / 24 > progress / length
              ? "w-full h-4  bg-green-600"
              : "w-full h-4  bg-green-400"
          }
        />
      );
  } // for

  const tailname: TailProperties = {
    box: "w-full h-4",
    layout: "flex items-center justify-center gap-1",
  }; // tailname

  return (
    <div className={`${TailClassName(tailname)} ${className}`}>
      {nodeListOfBar}
    </div>
  ); // return
} // Loader
