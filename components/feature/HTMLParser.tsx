"use client";

import TailProperties, { TailClassName } from "@/styles/TailwindProperties";
import DefaultProps from "@/utils/DefaultProps";
import parseHTML, { ParseHTML_ERROR } from "@/utils/ParseHTML";
import { ChangeEvent, useState } from "react";
import { RecoilState, useRecoilState } from "recoil";
import { PlaylistElement } from "@/components/section/Main_Playlist";

export default HTMLParser;

interface HTMLParserProps extends DefaultProps<never> {
  playlistAtom: RecoilState<PlaylistElement[]>;
} // HTMLParserProps
function HTMLParser({ playlistAtom, className }: HTMLParserProps) {
  const [playlist, setPlaylist] =
    useRecoilState<PlaylistElement[]>(playlistAtom);
  const [status, setStatus] = useState<number>(1);

  const changeHandler = (event: ChangeEvent<any>) => {
    setPlaylist([]); // init the Playlist
    const file = event.target.files[0];
    const reader: FileReader = new FileReader();
    reader.onload = (progressEvent: ProgressEvent<any>) => {
      const content: string = progressEvent.target.result;
      const buffer: PlaylistElement[] = parseHTML(parserId, content);
      if (buffer !== ParseHTML_ERROR) {
        setPlaylist(buffer);
        setStatus(0);
      } // if
    }; // onload
    if (file) reader.readAsText(file);
  }; // changeHandler

  const parserId: string = "parser-id-0";
  const tailname: TailProperties = {
    box: "p-1 w-full h-fit",
    layout: "grid gap-1",
    bg_border: "bg-transparent",
    typo: "text-teal-200 font-medium text-xs",
  }; // tailname

  return (
    <div className={`${TailClassName(tailname)} ${className}`}>
      <input
        onChange={changeHandler}
        type="file"
        accept="html"
        className="w-full h-6 text-sm text-green-200"
      />
      <div className="w-full h-fit  p-2">
        <h2>raw element: {playlist.length}</h2>
        <h2>total estimate time: {playlist.length * 6}s</h2>
      </div>
      <Error code={status} />
      <div title="parserDiv" id={parserId} />
    </div>
  ); // return
} // HTMLParser

const ERROR_CODE: string[] = [
  "hint: your html file is parsed",
  "hint: input your spotify playlist page HTML",
];
interface ErrorProps extends DefaultProps<never> {
  code: number;
} // ErrorProps
function Error({ code, className }: ErrorProps) {
  let tailname: TailProperties = {
    box: "h-5",
    bg_border: "bg-red-800",
    typo: "text-red-400 font-bold text-center",
    layout: "flex items-center justify-center",
  };
  if (!code)
    tailname = {
      ...tailname,
      typo: "text-green-400 font-bold text-center",
      bg_border: "bg-green-800",
    };
  return (
    <h1 className={`${TailClassName(tailname)} ${className}`}>
      {ERROR_CODE[code]}
    </h1>
  );
}
