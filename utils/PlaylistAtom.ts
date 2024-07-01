import { atom } from "recoil";

export function trackCmp(
  item0: PlaylistElement,
  item1: PlaylistElement
): boolean {
  return item0.title === item1.title && item0.artist === item1.artist;
} // trackCmp

export type PlaylistElement = {
  title: string;
  artist: string;
  index: number;
  snippets: Snippet[];
}; // PlaylistElement
export type Snippet = {
  name: string;
  videoId: string;
}; // PlaylistElement

export const PlaylistAtom = atom<PlaylistElement[]>({
  key: "playlist-atom",
  default: [],
}); // playlistAtom
