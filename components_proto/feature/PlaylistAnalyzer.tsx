"use client";

import DefaultProps from "@/utils/DefaultProps";
import TailwindProperties from "@/styles/TailwindProperties";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { songStackAtom } from "@/components_proto/section/Main";
import DownloadRequest from "@/utils/Request";

function PlaylistAnalyzer({ className }: DefaultProps<never>) {
  const key: string = "AIzaSyBKolzhFf8t25Eeu0qL_U3P62p1IO97qZ8";
  const songStack = useRecoilValue(songStackAtom);
  if (!songStack) return <></>;
  const style: TailwindProperties = {
    xl: "",
    base: "",
  };
  return (
    <div className={`${style.xl} ${style.base} ${className}`}>
      <button className="text-red-600">Download All</button>
      <div className="w-full h-full">
        {songStack.map((title: string, index: number) => (
          <PlaylistAnalyzerElement data={{ title, key, index }} key={index} />
        ))}
      </div>
    </div>
  );
}
export default PlaylistAnalyzer;

interface PlaylistAnalyzerElementData {
  title: string;
  key: string;
  index: number;
}
function PlaylistAnalyzerElement({
  data,
  className,
}: DefaultProps<PlaylistAnalyzerElementData>) {
  const [url, setUrl] = useState<string>("");
  useEffect(() => {
    DownloadRequest(title, key, index).then((validUrl: string | null) => {
      setUrl(!validUrl ? "" : validUrl);
    });
  }, []);
  if (!data) return;
  const { title, key, index }: PlaylistAnalyzerElementData = data;
  return (
    <div
      className={`py-2 ${className} ${
        url === "" ? "pointer-events-none opacity-50" : ""
      }`}
    >
      <h1>{title}</h1>
      <a className="text-blue-600" href={url}>
        <h2>Download</h2>
      </a>
    </div>
  );
}
