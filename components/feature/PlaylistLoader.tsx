"use client";

import React, { ChangeEvent, MutableRefObject, useRef } from "react";
import TailwindProperties from "@/styles/TailwindProperties";
import { useRecoilValue, useSetRecoilState } from "recoil";
import DefaultProps from "@/utils/DefaultProps";
import { songStackAtom } from "@/components/section/Main";

export default function PlaylistLoader({ className }: DefaultProps<never>) {
  const style: TailwindProperties = {
    xl: "",
    base: "pt-2 pl-4 relative",
  };
  return (
    <section className={`${style.xl} ${style.base} ${className}`}>
      <PlaylistParser className="absolute top-0 left-0" />
      <PlaylistDisplay className="mt-16" />
    </section>
  );
}

function PlaylistParser({ className }: DefaultProps<never>) {
  const setSongStack = useSetRecoilState(songStackAtom);
  const songStackRef: MutableRefObject<Array<string>> = useRef([]);

  // id specification
  const playlistParserId: string = "playlist-parser";
  const playlistInputId: string = "playlist-input";

  const changeHandler = (event: ChangeEvent<any>) => {
    // condition check: is there a proper file?
    const file = event.target.files[0];
    if (!file) return;

    // Init a FileReader and define its onload()
    const reader: FileReader = new FileReader();
    reader.onload = (progressEvent: ProgressEvent<any>) => {
      const content: string = progressEvent.target.result;

      // Embed the HTML file which from the input
      const container: HTMLElement | null =
        document.getElementById(playlistParserId);
      if (!container) return;
      container.innerHTML = content;

      // Select the specified elements containing the infos we need
      const targetParent: HTMLElement | null = container.querySelector(
        ".oIeuP60w1eYpFaXESRSg"
      );
      if (!targetParent) return () => console.assert("target parent is null");
      const NodeListOfTarget: NodeListOf<HTMLElement> =
        targetParent.querySelectorAll(".w46g_LQVSLE9xK399VYf");

      // Iter for extracting the infos
      songStackRef.current = [];
      NodeListOfTarget.forEach((element: HTMLElement, index: number) => {
        if (index <= 1) return;
        let title: string = "";
        element.childNodes.forEach((child: ChildNode) => {
          //@ts-ignore: ChildNode as HTMLElement
          if (child.innerText) title += child.innerText.trim();
        });
        if (title === "") return;
        songStackRef.current.push(title.trim());
      }); // end of the iteration

      // value of the ref as songStack
      setSongStack(songStackRef.current);
    };
    reader.readAsText(file);
  }; // end of onload() definition
  const style: TailwindProperties = {
    xl: "",
    base: "",
  };
  return (
    <div className={`${style.xl} ${style.base} ${className}`}>
      <h1 className="text-xl pb-2">Playlist Loader</h1>
      <input
        type="file"
        id={playlistInputId}
        accept="html"
        onChange={changeHandler}
      />
      <div
        title="parser"
        id={playlistParserId}
        className="w-0 h-0 overflow-hidden"
      />
    </div>
  );
}

function PlaylistDisplay({ className }: DefaultProps<never>) {
  const songStack = useRecoilValue(songStackAtom);
  let nodesOfPlaylist: Array<React.ReactNode> = [];
  if (!songStack) return <></>;
  songStack.forEach((title: string, index: number) => {
    nodesOfPlaylist.push(<PlaylistElement data={title} key={index} />);
  });
  return <div className={className}>{nodesOfPlaylist}</div>;
}

function PlaylistElement({ data, className }: DefaultProps<string>) {
  if (!data) return <></>;
  const [song, artist] = data.split("\n");

  const style: TailwindProperties = {
    xl: "",
    base: "flex-col py-2",
  };
  return (
    <div className={`${style.xl} ${style.base} ${className}`}>
      <h1 className="text-sm">{song}</h1>
      <h2 className="text-xs">{artist}</h2>
    </div>
  );
}
