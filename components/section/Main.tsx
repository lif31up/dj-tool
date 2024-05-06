"use client";

import DefaultProps from "@/utils/DefaultProps";
import { atom, RecoilRoot } from "recoil";
import PlaylistLoader from "@/components/feature/PlaylistLoader";
import PlaylistAnalyzer from "@/components/feature/PlaylistAnalyzer";
import { IdStackElement, ResultStackElement } from "@/utils/SongStackElement";

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
  return (
    <div className={`${className}`}>
      <RecoilRoot>
        <PlaylistLoader />
        <PlaylistAnalyzer />
      </RecoilRoot>
    </div>
  );
}
export default Main;
