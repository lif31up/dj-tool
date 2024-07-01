"use client";

import TailProperties, { TailClassName } from "@/styles/TailwindProperties";
import DefaultProps from "@/utils/DefaultProps";
import { RecoilState, useRecoilState } from "recoil";
import { PlaylistElement } from "@/utils/PlaylistAtom";
import YTFetcherAll from "@/utils/YTFetcher";
import { useRef, useState } from "react";
import PlaylistDisplay from "@/components/feature/PlaylistDisplay";

export default IDCollector;

interface IDCollectorProps extends DefaultProps<never> {
  playlistAtom: RecoilState<PlaylistElement[]>;
} // IDCollectorProps

function IDCollector({ playlistAtom, className }: IDCollectorProps) {
  const [playlist, setPlaylist] =
    useRecoilState<PlaylistElement[]>(playlistAtom);
  const playlistRef = useRef<PlaylistElement[]>([]);
  const [collected, setCollected] = useState(false);

  const clickHandler = () => {
    const promiseArray: Promise<void>[] = YTFetcherAll(
      playlist, //@ts-ignore
      document.getElementById(inputId)?.value,
      (data: PlaylistElement): void => {
        playlistRef.current.push(data);
      } // thenHandler
    ); // promiseArray
    Promise.all(promiseArray).then((): void => {
      setPlaylist(playlistRef.current);
      setCollected(true);
    }); // Promise.all
  }; // clickHandler

  const inputId: string = "key-input-0";

  const tailname: TailProperties = {
    box: "w-full p-1",
    layout: "grid gap-2",
    bg_border: "bg-green-800",
  }; // tailname

  return (
    <div className={`${TailClassName(tailname)} ${className}`}>
      <div className="flex h-6 gap-2">
        <input
          id={inputId}
          className="w-full h-full  px-2  text-md text-green-300  bg-teal-700  border-teal-800 border"
          type="text"
        />
        <button
          onClick={clickHandler}
          className="w-16 h-full  text-xs font-bold text-teal-100  bg-green-600 border-2 border-teal-100"
        >
          수집
        </button>
      </div>
      <>{collected ? <PlaylistDisplay playlistAtom={playlistAtom} /> : <></>}</>
    </div>
  ); // return
} // IDCollector
