"use client";

import DefaultProps from "@/utils/DefaultProps";
import TailwindProperties from "@/styles/TailwindProperties";
import { useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  idStackAtom,
  resultStackAtom,
  songStackAtom,
} from "@/components/section/Main";
import { IdStackElement, ResultStackElement } from "@/utils/SongStackElement";
import youtubeFetcher from "@/utils/youtube/YoutubeRequest";
import {
  cobaltFetchWithIds,
  cobaltResponse,
} from "@/utils/cobalt/CobaltRequest";

function PlaylistAnalyzer({ className }: DefaultProps<never>) {
  const songStack = useRecoilValue(songStackAtom);
  const idStackRef = useRef<Array<IdStackElement>>([]);
  const resultStackRef = useRef<Array<ResultStackElement>>([]);
  const [resultStack, setResultStack] = useRecoilState(resultStackAtom);
  const [idStack, setIdStack] = useRecoilState(idStackAtom);

  useEffect(() => {
    if (!songStack) return;
    songStack.forEach((title: string, index: number) => {
      youtubeFetcher(
        title.replace("\n", " - ").trim(),
        "AIzaSyAYxYIwcNXTHZMTFH9HlV7ihoBvpyqoEgw"
      ).then((data: JSON | null) => {
        if (!data) return;
        idStackRef.current.push({
          title: title, //@ts-ignore
          ids: data.items.map((element: object) => element.id.videoId),
        });
      }); // end of fetch
    }); // end of the iteration
    setIdStack(idStackRef.current);
  }, [songStack]);
  useEffect(() => {
    idStack?.forEach((element: IdStackElement, index: number) => {
      const { title, ids }: IdStackElement = element;

      let validUrl: Promise<string | null> = cobaltFetchWithIds(ids).then(
        (data: cobaltResponse | null) => {
          if (!data) return null;
          return data.url;
        }
      ); // cobaltFetchWithIds

      resultStackRef.current.push({
        title: title,
        url: !validUrl ? validUrl : "\0",
      });
    }); // forEach()
    setResultStack(resultStackRef.current);
  }, [idStack]);
  if (!resultStack) return <></>;
  const style: TailwindProperties = {
    xl: "",
    base: "",
  };
  return (
    <div className={`${style.xl} ${style.base} ${className}`}>
      <div>
        {resultStack.map((element: ResultStackElement, index: number) => (
          <PlaylistAnalyzerElement data={element} key={index} />
        ))}
      </div>
    </div>
  );
}
export default PlaylistAnalyzer;

function PlaylistAnalyzerElement({
  data,
  className,
}: DefaultProps<ResultStackElement>) {
  if (!data) return <></>;
  const { title, url }: ResultStackElement = data;
  return (
    <div className={`${className}`}>
      <h1>{title}</h1>
      <a href={url}>
        <h2>Download</h2>
      </a>
    </div>
  );
}
