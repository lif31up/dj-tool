"use client";

import { useState } from "react";
import { RecoilState, useRecoilValue } from "recoil";
import DefaultProps from "@/utils/DefaultProps";
import FileDisplay from "@/components/feature/FileDisplay";

interface ParserProps extends DefaultProps<never> {
  atom: RecoilState<string[]>;
}
function Parser({ className, atom }: ParserProps) {
  const list = useRecoilValue(atom);
  const [APIKey, setAPIKey] = useState<string | null>(null);
  const inputId: string = "input-0";
  const clickHandler = () => {
    const input: HTMLElement | null = document.getElementById(inputId);
    const value: string = input?.value;
    // @ts-ignore
    setAPIKey(value);
    console.log(APIKey);
  };
  return (
    <div className={``}>
      <div className="w-full h-12  px-2  flex justify-start items-center gap-2">
        <button
          className="text-xs p-1 bg-gray-200 text-black rounded"
          onClick={clickHandler}
        >
          parse
        </button>
        <input
          id={inputId}
          type="text"
          className="w-full h-6 px-2 text-xs text-black"
          placeholder="type your key..."
        />
      </div>
      <FileDisplay playlist={list} APIKey={APIKey} />
    </div>
  );
}
export default Parser;
