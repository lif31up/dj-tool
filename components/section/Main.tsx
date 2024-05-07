"use client";

import DefaultProps from "@/utils/DefaultProps";
import { atom, RecoilRoot } from "recoil";
import PlaylistLoader from "@/components/feature/PlaylistLoader";
import PlaylistAnalyzer from "@/components/feature/PlaylistAnalyzer";
import { IdStackElement, ResultStackElement } from "@/utils/SongStackElement";
import TailwindProperties from "@/styles/TailwindProperties";
import { useEffect, useState } from "react";

export const songStackAtom = atom<null | Array<string>>({
  key: "song-stack",
  default: null,
});

export const idStackAtom = atom<null | Array<IdStackElement>>({
  key: "id-stack",
  default: null,
});

export const resultStackAtom = atom<Array<ResultStackElement> | null>({
  key: "result-stack",
  default: null,
});

function Main({ className }: DefaultProps<never>) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (window.innerWidth < 1000) setIsMobile(true);
  }, []);
  if (isMobile) return <h1>모바일은 안 된다.</h1>;
  const style: TailwindProperties = {
    xl: "",
    base: "w-screen flex flex-wrap h-fit",
  };
  return (
    <div className={`${style.xl} ${style.base} ${className}`}>
      <RecoilRoot>
        <PlaylistLoader className="flex-col w-1/2 bg-neutral-200 overflow-hidden min-h-screen" />
        <PlaylistAnalyzer className="flex-col bg-neutral-100 w-1/2 overflow-hidden min-h-screen" />
      </RecoilRoot>
    </div>
  );
}
export default Main;
