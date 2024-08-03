"use client";

import { RecoilState, useRecoilState, useRecoilValue } from "recoil";
import DefaultProps from "@/utils/DefaultProps";
import { ReactElement } from "react";
import TailProperties, { TailClassName } from "@/styles/TailwindProperties";
import { PlaylistElement, trackCmp } from "@/components/section/Main_Playlist";

export default PlaylistDisplay;

interface PlaylistDisplayProps extends DefaultProps<never> {
  playlistAtom: RecoilState<PlaylistElement[]>;
  contextAtom: RecoilState<boolean>;
} // PlaylistDisplayProps
function PlaylistDisplay({ playlistAtom, contextAtom, className }: PlaylistDisplayProps) {
  const context = useRecoilValue(contextAtom);
  const playlist = useRecoilValue<PlaylistElement[]>(playlistAtom);

  const nodeListOfTrack: ReactElement[] = playlist.map(
    (element: PlaylistElement, index: number) => (
      <Track data={element} key={index} playlistAtom={playlistAtom} />
    ) // map
  ); // nodeListOfTrack

  const tailname: TailProperties = {
    box: "w-full h-fit p-1",
    layout: "grid justify-items-start gap-1",
  }; // tailname

  return (
    <div className={`${TailClassName(tailname)} ${className} ${context ? "select-none opacity-50" : ""}`}>
      {nodeListOfTrack}
    </div>
  ); // return
} // PlaylistDisplay

interface TrackProps extends DefaultProps<PlaylistElement> {
  playlistAtom: RecoilState<PlaylistElement[]>;
} // TrackProps
function Track({ data, className, playlistAtom }: TrackProps) {
  const [playlist, setPlaylist] =
    useRecoilState<PlaylistElement[]>(playlistAtom);

  if (!data) return <></>;
  const indexHandler = (newItem: PlaylistElement): void => {
    setPlaylist(
      playlist.map(
        (item: PlaylistElement): PlaylistElement =>
          trackCmp(item, newItem) ? newItem : item
      ) // map
    ); // setPlaylist
  }; // updateElement
  const removeHandler = (): void => {
    setPlaylist(
      playlist.filter((item: PlaylistElement) => !trackCmp(item, data))
    ); // setPlaylist
  }; // removeHandler

  const tailname: TailProperties = {
    box: "w-full h-fit px-2 py-1",
    layout: "grid gap-1",
    bg_border: "bg-green-900",
  }; // tailname

  if (!data?.snippets) return <></>;
  return (
    <div className={`${TailClassName(tailname)} ${className}`}>
      <h1 className="text-sm font-light text-teal-50 line-clamp-1">
        {data.title + " - " + data.artist}
      </h1>
      <h2 className="text-xs font-medium text-teal-100 line-clamp-1">
        {data.snippets.length > 0
          ? data.snippets[data.index].name
          : "not collected..."}
      </h2>
      <div className="flex gap-1">
        {data.snippets.length > 0 ? (
          <>
            <IndexButton index={0} indexHandler={indexHandler} data={data} />
            <IndexButton index={1} indexHandler={indexHandler} data={data} />
            <IndexButton index={2} indexHandler={indexHandler} data={data} />
            <IndexButton index={3} indexHandler={indexHandler} data={data} />
            <IndexButton index={4} indexHandler={indexHandler} data={data} />
          </>
        ) : (
          <></>
        )}
        <button
          onClick={removeHandler}
          className="w-4 h-4  text-xs font-bold text-red-200 bg-red-800"
        >
          X
        </button>
      </div>
    </div>
  ); // return
} // Track

interface IndexButtonProps extends DefaultProps<PlaylistElement> {
  index: number;
  indexHandler: (data: PlaylistElement) => void;
}
function IndexButton({ data, index, indexHandler }: IndexButtonProps) {
  const tailname: TailProperties = {
    box: "w-4 h-4",
    typo: "text-xs font-bold text-teal-200",
    bg_border: "bg-teal-800",
  }; // tailname
  if (!data || !data.snippets[index]) return <></>;
  const sate: boolean = !!data.snippets[index]?.fail;
  return (
    <button
      className={`${TailClassName(tailname)} ${sate ? "bg-red-400" : ""}`}
      onClick={() => {
        indexHandler({
          ...data, //@ts-ignore
          index: index,
        }); // indexHandler
      }} // onClick
    >
      {index}
    </button>
  ); // return
} // IndexButton
