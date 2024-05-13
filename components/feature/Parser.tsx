"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { RecoilState, useRecoilValue } from "recoil";
import YTFetcher from "@/utils/youtube/YoutubeRequest";
import CBLTFetcher from "@/utils/cobalt/CobaltRequest";
import { wait } from "next/dist/lib/wait";
import { Element } from "@/components/feature/FileDisplay";

type ParsedElement = {
  title: string;
  videoIds: string[];
};

function Parser({ atom }: { atom: RecoilState<string[]> }) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const playlist: string[] = useRecoilValue(atom);
  const parsedListRef = useRef<ParsedElement[]>([]);
  const inputId: string = "parser-input-0";
  const clickHandler = () => {
    setIsLoaded(false);
    const inputElement: HTMLInputElement | HTMLElement | null =
      document.getElementById(inputId);
    if (!inputElement) return;
    // @ts-ignore
    const key: string = inputElement.value;
    if (key.length < 10)
      return () => {
        console.log("key is too short.");
      };
    console.log(playlist);
    const newList: ParsedElement[] = [];
    const promiseArray: Promise<void>[] = playlist.map(
      async (title: string): Promise<void> => {
        console.log(title);
        if (
          parsedListRef.current.some(
            (parsedElement: ParsedElement): boolean => {
              return parsedElement.title === title;
            }
          )
        )
          return;
        return YTFetcher({ pattern: title, key: key }).then(
          (videoIds: string[]) => {
            if (videoIds[0] === "error") return;
            newList.push({ title: title, videoIds: videoIds });
          }
        );
      }
    );
    console.log("parse started...");
    Promise.all(promiseArray).then(() => {
      parsedListRef.current = [...parsedListRef.current, ...newList];
      setIsLoaded(true);
    });
  };
  const downloadHandler = () => {
    parsedListRef.current.forEach(
      async (element: ParsedElement, index: number) => {
        await wait(index * 5500);
        CBLTFetcher({
          url: `https://www.youtube.com/watch?v=${element.videoIds[0]}`,
        }).then((url: string) => {
          if (url === "error") return;
          window.open(url);
        });
      }
    );
  };
  return (
    <div className={"relative w-full h-full"}>
      <div className="w-full h-12  flex items-center justify-start gap-2 px-4">
        <input
          id={inputId}
          type="text"
          className="w-full  px-2  text-green-600 bg-green-900"
        />
        <button
          onClick={clickHandler}
          className="w-fit h-fit  px-2  outline outline-1 outline-green-600"
        >
          Parse
        </button>
      </div>
      <div className="w-full h-fit  p-1  grid gap-1  text-xs overflow-scroll">
        {parsedListRef.current.map((element: ParsedElement, index: number) => (
          <Element key={index} title={element.title} />
        ))}
      </div>
      <div className="absolute bottom-0 right-0 p-2">
        <button
          onClick={downloadHandler}
          className="w-12 h-12  flex  justify-center items-center  rounded-full  text-green-500 bg-green-900"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={24}
            height={24}
          >
            <path
              d="M12 14.5L12 4.5M12 14.5C11.2998 14.5 9.99153 12.5057 9.5 12M12 14.5C12.7002 14.5 14.0085 12.5057 14.5 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20 16.5C20 18.982 19.482 19.5 17 19.5H7C4.518 19.5 4 18.982 4 16.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
export default Parser;
