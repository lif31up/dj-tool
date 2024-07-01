import { RecoilState, useRecoilState, useRecoilValue } from "recoil";
import { PlaylistElement, trackCmp } from "@/utils/PlaylistAtom";
import DefaultProps from "@/utils/DefaultProps";
import { ReactElement } from "react";
import TailProperties, { TailClassName } from "@/styles/TailwindProperties";

export default PlaylistDisplay;

interface PlaylistDisplayProps extends DefaultProps<never> {
  playlistAtom: RecoilState<PlaylistElement[]>;
} // PlaylistDisplayProps
function PlaylistDisplay({ playlistAtom, className }: PlaylistDisplayProps) {
  const playlist = useRecoilValue<PlaylistElement[]>(playlistAtom);

  const nodeListOfTrack: ReactElement[] = playlist.map(
    (element: PlaylistElement, index: number) => (
      <Track data={element} key={index} playlistAtom={playlistAtom} />
    ) // map
  ); // nodeListOfTrack

  const tailname: TailProperties = {
    box: "",
    layout: "grid gap-2n",
  }; // tailname

  return (
    <div className={`${TailClassName(tailname)} ${className}`}>
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

  const indexHandler = (newItem: PlaylistElement): void => {
    setPlaylist(
      playlist.map(
        (item: PlaylistElement): PlaylistElement =>
          trackCmp(item, newItem) ? newItem : item
      ) // map
    ); // setPlaylist
  }; // updateElement

  const tailname: TailProperties = {
    box: "",
    layout: "",
  }; // tailname

  if (!data?.snippets) return <></>;
  return (
    <div className={`${TailClassName(tailname)} ${className}`}>
      <h1 className="text-md">{data.title}</h1>
      <h2 className="text-sm">{data.artist}</h2>
      {data.snippets.length > 1 ? (
        <p className="text-xs text-teal-400">
          name: {data.snippets[data.index].name}
        </p>
      ) : (
        <></>
      )}
      <div className="flex gap-2 text-xs">
        <IndexButton index={0} indexHandler={indexHandler} data={data} />
        <IndexButton index={1} indexHandler={indexHandler} data={data} />
        <IndexButton index={2} indexHandler={indexHandler} data={data} />
        <IndexButton index={3} indexHandler={indexHandler} data={data} />
        <IndexButton index={4} indexHandler={indexHandler} data={data} />
      </div>
    </div>
  ); // return
} // Track

interface IndexButtonProps extends DefaultProps<PlaylistElement> {
  index: number;
  indexHandler: (data: PlaylistElement) => void;
}
function IndexButton({ data, index, indexHandler }: IndexButtonProps) {
  if (!data) return <></>;
  return (
    <button
      onClick={() => {
        indexHandler({
          ...data, //@ts-ignore
          index: index,
        });
      }}
    >
      {index}
    </button>
  );
}
