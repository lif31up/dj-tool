"use client";

import TailwindProperties from "@/styles/TailwindProperties";
import DefaultProps from "@/utils/DefaultProps";
import { ChangeEvent, useRef } from "react";
import { RecoilState, useSetRecoilState } from "recoil";

interface FileLoaderProps extends DefaultProps<never> {
  atom: RecoilState<any>;
}
function FileLoader({ className, atom }: FileLoaderProps) {
  const setList = useSetRecoilState(atom);
  const bufferRef = useRef<Array<string>>([]);

  const parserContainerId: string = "parser-container-0";

  const changeHandler = (event: ChangeEvent<any>) => {
    const file = event.target.files[0];
    if (!file) return () => console.log("changeHandler: file is not valid.");

    const reader: FileReader = new FileReader();
    reader.onload = (progressEvent: ProgressEvent<any>) => {
      const content: string = progressEvent.target.result;

      const container: HTMLElement | null =
        document.getElementById(parserContainerId);
      if (!container) {
        return () => {
          console.log("changeHandler: container can't find the element.");
        }; // return
      } // if
      const parser: HTMLDivElement = document.createElement("div");
      parser.innerHTML = content;
      container.appendChild(parser);

      bufferRef.current = [];
      const targetParent: HTMLElement | null = container.querySelector(
        ".oIeuP60w1eYpFaXESRSg"
      );
      if (!targetParent) {
        return () => {
          console.log("changeHandler: target parent is null");
        }; // return
      } // if
      const NodeListOfTarget: NodeListOf<HTMLElement> =
        targetParent.querySelectorAll(".w46g_LQVSLE9xK399VYf");

      NodeListOfTarget.forEach((element: HTMLElement, index: number) => {
        if (index <= 1) return; // discard first element
        let title: string = "";
        element.childNodes.forEach((child: ChildNode) => {
          //@ts-ignore
          if (child.innerText) title += child.innerText.trim();
        }); // forEach
        if (title.trim() === "") return;
        bufferRef.current = [...bufferRef.current, title.trim()];
      }); // forEach
      parser.remove();
      setList(bufferRef.current);
    }; // onload
    reader.readAsText(file);
  }; // changeHandler
  const style: TailwindProperties = {
    xl: "w-full h-12  px-1  text-xs",
    base: "flex justify-start content-center",
  };
  return (
    <div className={`${style.xl} ${style.base} ${className}`}>
      <input
        accept="html"
        type="file"
        onChange={changeHandler}
        className={`${style.xl} ${style.base} ${className}`}
      />
      <div id={parserContainerId} className="overflow-hidden w-0 h-0" />
    </div>
  );
}
export default FileLoader;
