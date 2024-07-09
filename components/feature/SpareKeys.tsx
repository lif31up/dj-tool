"use client";

import DefaultProps from "@/utils/DefaultProps";
import { ReactElement, useState } from "react";
import TailProperties, { TailClassName } from "@/styles/TailwindProperties";
import AESDecoder from "@/utils/AESDecoder";

export default SpareKeys;

function SpareKeys({ data, className }: DefaultProps<object>) {
  const [keys, setKeys] = useState<ReactElement[]>([]);

  const inputId: string = "spare-keys--input-0";

  if (!data) return <></>;
  const clickHandler = (): void => {
    const input: HTMLElement | null = document.getElementById(inputId);
    // @ts-ignore
    if (input?.value) {
      setKeys(
        // @ts-ignore
        data.keys.map(
          (encoded: string, index: number): JSX.Element => (
            <p key={index} className="w-full text-center bg-green-900">
              {
                // @ts-ignore
                AESDecoder(encoded, input.value)
              }
            </p>
          )
        )
      );
    }
  };
  const tailname: TailProperties = {
    layout: "grid gap-1",
    box: "w-full h-fit p-2 text-teal-100",
  };
  return (
    <section className={`${TailClassName(tailname)} ${className}`}>
      <div className="w-full h-6  flex gap-2">
        <input
          id={inputId}
          type="text"
          className="w-full text-black bg-green-900 px-2"
        />
        <button
          onClick={clickHandler}
          className="w-fit px-2 text-teal-100 text-center bg-green-950 text-xs"
        >
          password
        </button>
      </div>
      <div className="w-full h-fit grid gap-1 py-1 overflow-scroll text-xs">
        {keys}
      </div>
    </section>
  );
}
