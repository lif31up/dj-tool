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
import { cobaltFetchWithIds } from "@/utils/cobalt/CobaltRequest";

function PlaylistAnalyzer({ className }: DefaultProps<never>) {
  const songStack = useRecoilValue(songStackAtom);
  const idStackRef = useRef<Array<IdStackElement>>([]);
  const resultStackRef = useRef<Array<ResultStackElement>>([]);
  const [resultStack, setResultStack] = useRecoilState(resultStackAtom);
  const [idStack, setIdStack] = useRecoilState(idStackAtom);

  useEffect(() => {
    if (!songStack) return;
    Promise.all(
      songStack.map((title: string) =>
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
      console.log(idStackRef.current);
    });
  }, [songStack]);
  useEffect(() => {
    if (!idStack) return;
    Promise.all(
      idStack.map((element: IdStackElement) =>
        cobaltFetchWithIds(element.ids).then((data) => {
          resultStackRef.current = [
            ...resultStackRef.current,
            { title: element.title, url: data?.url ? data.url : "" },
          ];
        })
      )
    ).then(() => setResultStack(resultStackRef.current));
  }, [idStack]);
  const clickHandler = () => {
    resultStack?.forEach((element: ResultStackElement) => {
      window.open(element.url);
    });
  };
  const style: TailwindProperties = {
    xl: "",
    base: "",
  };
  return (
    <div className={`${style.xl} ${style.base} ${className}`}>
      {resultStack ? (
        <button className="text-red-600" onClick={clickHandler}>
          Download All
        </button>
      ) : (
        <></>
      )}
      <div className="w-full h-full">
        {resultStack ? (
          resultStack.map((element: ResultStackElement, index: number) => (
            <PlaylistAnalyzerElement data={element} key={index} />
          ))
        ) : (
          <></>
        )}
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
