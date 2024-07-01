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
    box: "p-2",
    layout: "grid gap-2",
    bg_border: "",
    typo: "",
  }; // tailname

  return (
    <div className={`${TailClassName(tailname)} ${className}`}>
      <input
        onChange={changeHandler}
        type="file"
        accept="html"
        className="w-full text-sm text-green-200"
      />
      <h2 className="text-xs font-medium text-teal-100">
        분석된 곡의 총 수: {playlist.length}
      </h2>
      <div id={parserId} />
    </div>
  ); // return
} // HTMLParser
