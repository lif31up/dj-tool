"use client";

import TailProperties, { TailClassName } from "@/styles/TailwindProperties";
import DefaultProps from "@/utils/DefaultProps";
import { RecoilState, useRecoilState } from "recoil";
import YTFetcherAll from "@/utils/YTFetcher";
import { useRef } from "react";
import { PlaylistElement } from "@/components/section/Main_Playlist";

export default IDCollector;

interface IDCollectorProps extends DefaultProps<never> {
  playlistAtom: RecoilState<PlaylistElement[]>;
} // IDCollectorProps

function IDCollector({ playlistAtom, className }: IDCollectorProps) {
  const [playlist, setPlaylist] =
    useRecoilState<PlaylistElement[]>(playlistAtom);
  const playlistRef = useRef<PlaylistElement[]>([]);

  const clickHandler = () => {
    playlistRef.current = [];
    const promiseArray: Promise<void>[] = YTFetcherAll(
      playlist, //@ts-ignore
      document.getElementById(inputId)?.value,
      (data: PlaylistElement): void => {
        playlistRef.current.push(data);
      } // thenHandler
    ); // promiseArray
    Promise.all(promiseArray).then((): void => {
      setPlaylist(playlistRef.current);
      console.log(playlist);
    }); // Promise.all
  }; // clickHandler

  const inputId: string = "key-input-0";

  const tailname: TailProperties = {
    box: "p-1 w-full h-fit",
    layout: "grid gap-1 items-center justify-left",
    bg_border: "bg-green-900",
    typo: "text-teal-200 font-medium text-xs",
  }; // tailname


  const collectedPlaylist: PlaylistElement[] = playlist.filter(
    (element: PlaylistElement): boolean => element.snippets.length > 0
  ); // filter
  const secs: number = collectedPlaylist.length * 6;
  const date: string = `${Math.round(secs / 60)}m ${secs % 60}s`

  return (
    <div className={`${TailClassName(tailname)} ${className}`}>
      <div title="input" className="flex h-6 gap-1">
        <button
          onClick={clickHandler}
          className="w-16 h-full  text-xs font-bold text-teal-100  bg-green-600 border-1 border-teal-100"
        >
          Collect
        </button>
        <input
          id={inputId}
          className="w-full h-full  px-2  text-md text-green-300  bg-green-700  border-teal-800 border"
          type="text"
        />
      </div>
      <div className="w-full h-fit  p-2">
        <h2>collected element: {collectedPlaylist.length}</h2>
        <h2>total estimate time: {date}</h2>
      </div>
    </div>
  ); // return
} // IDCollector
