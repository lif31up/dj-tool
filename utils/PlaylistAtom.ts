import { atom } from "recoil";

export function trackCmp(
  item0: PlaylistElement,
  item1: PlaylistElement
): boolean {
  return item0.title === item1.title && item0.artist === item1.artist;
} // trackCmp

export const VIDEOIDS_ERROR = [];

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

export function isPlaylist(playlist: PlaylistElement[]): Boolean {
  return playlist.length !== 0;
} // isPlaylist

export function isValidElement(element: PlaylistElement): boolean {
  return element.snippets.length > 0;
} // isValidElement
export function isValidSnippet(snippet: Snippet): boolean {
  return snippet.videoId.length > 0 || snippet.name.length > 0;
} // isValidSnippet
