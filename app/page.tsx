"use client";

import HTMLParser from "@/components/feature/HTMLParser";
import IDCollector from "@/components/feature/IDCollector";
import CBLTDownloader from "@/components/feature/CBLTDownloader";
import { RecoilRoot } from "recoil";
import { PlaylistAtom } from "@/utils/PlaylistAtom";

export default function Home() {
  return (
    <main className="w-full h-full  grid justify-center items-center">
      <section
        style={{ width: "320px", height: "fit-content" }}
        className="outline-2 outline-teal-100"
      >
        <RecoilRoot>
          <HTMLParser playlistAtom={PlaylistAtom} />
          <IDCollector playlistAtom={PlaylistAtom} />
          <CBLTDownloader playlistAtom={PlaylistAtom} />
        </RecoilRoot>
      </section>
    </main>
  );
} // Home
