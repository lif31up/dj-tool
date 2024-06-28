import DefaultProps from "@/utils/DefaultProps";
import TailProperties, { TailClassName } from "@/styles/TailwindProperties";
import { ReactElement } from "react";

export default SpareKeys;

type SpareKeysData = {
  keys: string[];
}; // sparekeys
function SpareKeys({ data }: DefaultProps<SpareKeysData>) {
  const nodeListOfKey: ReactElement[] = [];
  data.keys.forEach((key: string, index: number) => {
    nodeListOfKey.push(<Key data={{ key: key }} key={index} />);
  }); // forEach

  const tailname: TailProperties = {
    box: "",
    layout: "",
  }; // tailname
  return <div className={`${TailClassName(tailname)}`}>{nodeListOfKey}</div>;
}

type KeyData = {
  key: string;
}; // KeyData
function Key({ data }: DefaultProps<KeyData>) {
  if (!data) return <></>;
  const { key }: KeyData = data;
  const tailname: TailProperties = {};
  return <div className={`${TailClassName(tailname)}`}>{key}</div>;
} // Key
