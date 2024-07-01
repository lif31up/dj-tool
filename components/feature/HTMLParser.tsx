"use client";

import TailProperties, { TailClassName } from "@/styles/TailwindProperties";
import DefaultProps from "@/utils/DefaultProps";
import parseHTML, { ParseHTML_ERROR } from "@/utils/ParseHTML";
import { ChangeEvent, useState } from "react";
import { RecoilState, useRecoilState } from "recoil";
import { PlaylistElement } from "@/utils/PlaylistAtom";

export default HTMLParser;

interface HTMLParserProps extends DefaultProps<never> {
  playlistAtom: RecoilState<PlaylistElement[]>;
} // HTMLParserProps
function HTMLParser({ playlistAtom, className }: HTMLParserProps) {
  const [playlist, setPlaylist] =
    useRecoilState<PlaylistElement[]>(playlistAtom);

  const changeHandler = (event: ChangeEvent<any>) => {
    setPlaylist([]); // init the Playlist
    const file = event.target.files[0];
    const reader: FileReader = new FileReader();
    reader.onload = (progressEvent: ProgressEvent<any>) => {
      const content: string = progressEvent.target.result;
      const buffer: PlaylistElement[] = parseHTML(parserId, content);
      if (buffer !== ParseHTML_ERROR) setPlaylist(buffer);
    }; // onload
    if (file) reader.readAsText(file);
  }; // changeHandler

  const parserId: string = "parser-id-0";
  const tailname: TailProperties = {
    box: "p-1",
    layout: "grid gap-1",
    bg_border: "",
    typo: "",
  }; // tailname

  return (
    <div className={`${TailClassName(tailname)} ${className}`}>
      <input
        onChange={changeHandler}
        type="file"
        accept="html"
        className="w-full h-6 text-sm text-green-200"
      />
      <div className="p-2">
        <h2 className="text-xs font-medium text-teal-100">
          raw element: {playlist.length}
        </h2>
        <h2 className="text-xs font-medium text-teal-100">
          total estimate time: 10s
        </h2>
      </div>
      <div id={parserId} />
    </div>
  ); // return
} // HTMLParser
