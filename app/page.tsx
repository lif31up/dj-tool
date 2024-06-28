"use client";

import HTMLParser from "@/components/feature/HTMLParser";
import IDCollector from "@/components/feature/IDCollector";
import CBLTDownloader from "@/components/feature/CBLTDownloader";
import { RecoilRoot } from "recoil";
import { PlaylistAtom } from "@/utils/PlaylistAtom";

export default function Home() {
  return (
    <main>
      <div className="w-96">
        <RecoilRoot>
          <HTMLParser playlistAtom={PlaylistAtom} />
          <IDCollector playlistAtom={PlaylistAtom} />
          <CBLTDownloader playlistAtom={PlaylistAtom} />
        </RecoilRoot>
      </div>
    </main>
  );
} // Home
