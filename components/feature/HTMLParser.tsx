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
  const [status, setStatus] = useState<string>("init");

  const changeHandler = (event: ChangeEvent<any>) => {
    setPlaylist([]); // init the Playlist
    const file = event.target.files[0];
    const reader: FileReader = new FileReader();
    reader.onload = (progressEvent: ProgressEvent<any>) => {
      const content: string = progressEvent.target.result;
      const buffer: PlaylistElement[] = parseHTML(parserId, content);
      if (buffer !== ParseHTML_ERROR) setPlaylist(buffer);
    }; // onload
    if (file) {
      reader.readAsText(file);
      setStatus("none");
    } else setStatus("error");
  }; // changeHandler

  const parserId: string = "parser-id-0";
  const tailname: TailProperties = {
    box: "p-2",
    layout: "grid gap-2",
    bg_border: "",
    typo: "",
  }; // tailname

  const estimateTime: number = playlist.length * 5 + 60;
  return (
    <div className={`${TailClassName(tailname)} ${className}`}>
      <input
        onChange={changeHandler}
        type="file"
        accept="html"
        className="w-full text-sm text-green-200"
      />
      <p className="text-xs font-medium text-teal-100">
        분석된 곡의 총 수: {playlist.length}
      </p>
      <p className="f">
        예상 소요시간: {Math.floor(estimateTime / 60)}m {estimateTime % 60}s
      </p>
      <STATUS status={status} />
      <div id={parserId} />
    </div>
  ); // return
} // HTMLParser

interface STATUSProps extends DefaultProps<never> {
  status: string;
}
function STATUS({ status, className }: STATUSProps) {
  let text: string = "오류가 발생했습니다.";
  if (status === "none") text = "다음 단계로 넘어가세요.";
  if (status === "init") text = "HTML 파일을 입력하세요.";

  return (
    <p
      className={`py-1  text-xs ${
        status === "init"
          ? "bg-red-800 text-red-200"
          : "bg-green-800 text-green-200"
      } text-center`}
    >
      {text}
    </p>
  ); // return
} // STATUS
