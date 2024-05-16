"use client";

import FileLoader from "@/components/feature/FileLoader";
import { atom, RecoilRoot, useRecoilValue } from "recoil";
import FileDisplay from "@/components/feature/FileDisplay";
import Parser from "@/components/feature/Parser";
import TailwindProperties from "@/styles/TailwindProperties";
import DefaultProps from "@/utils/DefaultProps";
import Instruction from "@/components/feature/Instruction";

const playlistAtom = atom<string[]>({ key: "playlist-atom", default: [] });

function PlaylistRoot() {
  return (
    <RecoilRoot>
      <_PlaylistRoot />
    </RecoilRoot>
  );
}
export default PlaylistRoot;

function _PlaylistRoot({ className }: DefaultProps<number>) {
  let playlist = useRecoilValue<string[]>(playlistAtom);
  const style: TailwindProperties = {
    xl: "h-full w-full  px-40 py-24  flex items-start justify-center gap-4",
    base: "",
  };
  return (
    <section className={`${style.xl} ${style.base} ${className}`}>
      <section className="w-80 h-full  grid  border-2 border-green-900">
        <FileLoader atom={playlistAtom} className="flex-wrap" />
        <FileDisplay playlist={playlist} className="flex-wrap" />
      </section>
      <section className="w-80 h-full  border-green-900 border-2">
        <Parser atom={playlistAtom} />
      </section>
      <section className="w-80 h-full  border-green-900 border-2">
        <Instruction />
      </section>
    </section>
  );
}
