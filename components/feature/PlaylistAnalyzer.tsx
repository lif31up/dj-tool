"use client";

import DefaultProps from "@/utils/DefaultProps";
import TailwindProperties from "@/styles/TailwindProperties";
import { useEffect, useRef, useState } from "react";
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
import { wait } from "next/dist/lib/wait";

function PlaylistAnalyzer({ className }: DefaultProps<never>) {
  const songStack = useRecoilValue(songStackAtom);
  const idStackRef = useRef<Array<IdStackElement>>([]);
  const resultStackRef = useRef<Array<ResultStackElement>>([]);
  const [resultStack, setResultStack] = useRecoilState(resultStackAtom);
  const [idStack, setIdStack] = useRecoilState(idStackAtom);

  useEffect(() => {
    idStackRef.current = [];
    if (!songStack) return;
    Promise.all(
      songStack.map(async (title: string) =>
        youtubeFetcher(title).then((data: JSON | null) => {
          if (!data) return;
          idStackRef.current = [
            ...idStackRef.current,
            {
              title: title, //@ts-ignore
              ids: data.items.map((element: object) => element.id.videoId),
            },
          ];
        })
      )
    ).then(() => {
      setIdStack(idStackRef.current);
    });
  }, [songStack]);
  useEffect(() => {
    resultStackRef.current = [];
    if (!idStack) return;
    Promise.all(
      idStack.map(async (element: IdStackElement, index: number) => {
        await wait(index * 10000);
        await cobaltFetchWithIds(element.ids, 0).then(
          (data: cobaltResponse | null) => {
            if (!data) return;
            resultStackRef.current = [
              ...resultStackRef.current,
              { title: element.title, url: data.url },
            ];
          }
        );
      })
    ).then(() => {
      setResultStack(resultStackRef.current);
    });
  }, [idStack]);
  const clickHandler = () => {
    resultStack?.forEach((element: ResultStackElement) => {
      if (!element.url) {
      } else window.open(element.url);
    });
  };
  const style: TailwindProperties = {
    xl: "",
    base: "",
  };
  if (!resultStack) return <div className={className} />;
  return (
    <div className={`${style.xl} ${style.base} ${className}`}>
      <button className="text-red-600" onClick={clickHandler}>
        Download All
      </button>
      <div className="w-full h-full">
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
    <div className={`py-2 ${className}`}>
      <h1>{title}</h1>
      <a className="text-blue-600" href={url}>
        <h2>Download</h2>
      </a>
    </div>
  );
}
