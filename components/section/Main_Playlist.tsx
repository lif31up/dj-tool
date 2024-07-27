"use client";

import TailProperties, { TailClassName } from "@/styles/TailwindProperties";
import { RecoilRoot } from "recoil";
import DefaultProps from "@/utils/DefaultProps";
import HTMLParser from "@/components/feature/HTMLParser";
import IDCollector from "@/components/feature/IDCollector";
import CBLTDownloader from "@/components/feature/CBLTDownloader";
import PlaylistDisplay from "@/components/feature/PlaylistDisplay";
import { atom } from "recoil";
import { CSSProperties } from "react";
import SpareKeys from "@/components/feature/SpareKeys";
import keys from "@/public/keys.json";

export function trackCmp(
  item0: PlaylistElement,
  item1: PlaylistElement
): boolean {
  return item0.title === item1.title && item0.artist === item1.artist;
} // trackCmp
export function snippetGetIndex(videoId: string, data: PlaylistElement): number{
  let get_index: number = 0;
  data.snippets.forEach((snippet, index) => {if (snippet.videoId === videoId) get_index = index})
  return get_index;
} // snippetGetIndex
export type PlaylistElement = {
  title: string;
  artist: string;
  index: number;
  snippets: Snippet[];
}; // PlaylistElement
export type Snippet = {
  name: string;
  videoId: string;
  fail: number;
}; // PlaylistElement
const PlaylistAtom = atom<PlaylistElement[]>({
  key: "playlist",
  default: [],
}); // playlistAtom

function Main_Playlist({ className }: DefaultProps<never>) {
  const tailname: TailProperties = {
    box: "w-fit",
    layout: "flex gap-1",
  }; // tailname
  const paneStyle: CSSProperties = {
    padding: "0.25rem",
    width: "320px",
    height: "fit-content",
    display: "grid",
    gap: "4px",
    border: "solid #14532D 1px",
  }; // style
  return (
    <RecoilRoot>
      <section className={`${TailClassName(tailname)} ${className}`}>
        <div className="w-fit h-fit">
          <div style={paneStyle}>
            <HTMLParser playlistAtom={PlaylistAtom} />
            <IDCollector playlistAtom={PlaylistAtom} />
            <CBLTDownloader playlistAtom={PlaylistAtom} contextAtom={ContextAtom} />
          </div>
          <SpareKeys data={keys} />
        </div>
        <div
          style={{ ...paneStyle, height: "auto" }}
          className="overflow-scroll"
        >
          <PlaylistDisplay playlistAtom={PlaylistAtom} contextAtom={ContextAtom}/>
        </div>
      </section>
    </RecoilRoot>
  );
} // Main_Playlist
export default Main_Playlist;

const ContextAtom = atom<boolean>({
  key: "playlist-atom",
  default: false,
}); // playlistAtom