"use client";

import FileLoader from "@/components/feature/FileLoader";
import { atom, RecoilRoot, useRecoilValue } from "recoil";
import FileDisplay from "@/components/feature/FileDisplay";
import Parser from "@/components/feature/Parser";

const playlistAtom = atom<string[]>({ key: "playlist-atom", default: [] });

function PlaylistRoot() {
  return (
    <RecoilRoot>
      <_PlaylistRoot />
    </RecoilRoot>
  );
}
export default PlaylistRoot;

function _PlaylistRoot() {
  let playlist = useRecoilValue<string[]>(playlistAtom);
  return (
    <>
      <div className="w-full h-full flex justify-center items-center gap-4">
        <section
          title="File Loader"
          className="w-80 h-3/4 flex-col gap-4 border-green-900 border-2"
        >
          <FileLoader atom={playlistAtom} />
          <FileDisplay playlist={playlist} />
        </section>
        <section
          title="File Loader"
          className="w-80 h-3/4 flex-col gap-4 border-green-900 border-2"
        >
          <Parser atom={playlistAtom} />
        </section>
        <section
          title="File Loader"
          className="w-80 h-3/4 flex-col gap-4 border-green-900 border-2 p-2"
        >
          <h1 className="text-sm font-bold text-green-400 pb-2">Spare Keys</h1>
          <p className="text-xs text-green-600">
            AIzaSyDfWSttr3rL8OvRwULWnkXROgtlo3l8F-U
            <br />
            AIzaSyCWKq-OlOZgyEoffRIRLCtgY2-_Ab0LEGo
            <br />
            AIzaSyBVtr8dyY5BDPCMBrw0ix-l5BKekS5h8tU
            <br />
            AIzaSyBJ8gkqLXzBCtlfhQykBOuirlY9JXkV0y8
            <br />
            AIzaSyBKolzhFf8t25Eeu0qL_U3P62p1IO97qZ8
          </p>
        </section>
      </div>
    </>
  );
}
