import DefaultProps, { isOfType } from "@/utils/DefaultProps";
import TailwindProperties from "@/styles/TailwindProperties";
import React, { useEffect, useState } from "react";
import YTFetcher from "@/utils/youtube/YoutubeRequest";
import { CBLTFetcherWithIds } from "@/utils/cobalt/CobaltRequest";

interface FileDisplayProps extends DefaultProps<never> {
  playlist: string[];
  APIKey?: string | null;
}
function FileDisplay({ className, playlist }: FileDisplayProps) {
  const elements: React.ReactNode[] = [];
  playlist?.forEach((title: string, index: number) => {
    elements.push(<Element title={title} index={index} key={index} />);
  });
  const style: TailwindProperties = {
    xl: "w-full h-fit  p-1  text-xs",
    base: "grid gap-1",
  };
  return (
    <div className="w-full h-full overflow-scroll">
      <div className={`${style.xl} ${style.base} ${className}`}>{elements}</div>
    </div>
  );
}
export default FileDisplay;

interface ElementProps extends DefaultProps<never> {
  title: string;
  APIKey?: string | null;
  index: number;
}
function Element({ title, APIKey, index }: ElementProps) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [videoIds, setVideoIds] = useState<string[]>([]);
  useEffect(() => {
    if (!APIKey) return;
    YTFetcher({ pattern: title, key: APIKey })
      .then((data: string[] | Error) => {
        if (!isOfType<string[]>(data)) return;
        setVideoIds(data);
        setIsLoaded(true);
      })
      .catch((error) => {});
  }, [APIKey]);
  const clickHandler = () => {
    if (!isOfType<string[]>(videoIds)) return;
    CBLTFetcherWithIds({ videoIds: videoIds, index: index }, 0)
      .then((data: string | Error) => {
        if (!isOfType<string>(data)) return;
        window.open(data);
      })
      .catch((error) => {});
  }; // clickHandler
  const style: TailwindProperties = {
    xl: "h-8 w-full  px-2",
    base: "flex items-center  bg-green-800  text-green-200",
  };
  return (
    <button
      className={`${style.xl} ${style.base} ${
        isLoaded ? "" : "opacity-50 pointer-events-none"
      }`}
      onClick={clickHandler}
    >
      <h1>{title.replace("\n", " - ")}</h1>
    </button>
  );
}
