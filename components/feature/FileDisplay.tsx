import DefaultProps from "@/utils/DefaultProps";
import TailwindProperties from "@/styles/TailwindProperties";
import React from "react";

interface FileDisplayProps extends DefaultProps<never> {
  playlist: string[];
  APIKey?: string | null;
}
function FileDisplay({ className, playlist }: FileDisplayProps) {
  const elements: React.ReactNode[] = [];
  playlist?.forEach((title: string, index: number) => {
    elements.push(<Element title={title} key={index} />);
  });
  const style: TailwindProperties = {
    xl: "w-full h-full  p-1  text-xs",
    base: "grid gap-1 flex-wrap",
  };
  return (
    <div className="w-full h-full overflow-scroll scroll-smooth">
      <div className={`${style.xl} ${style.base} ${className}`}>{elements}</div>
    </div>
  );
}
export default FileDisplay;

interface ElementProps extends DefaultProps<never> {
  title: string;
  isDownloaded?: boolean;
}
export function Element({ title, isDownloaded = true }: ElementProps) {
  const style: TailwindProperties = {
    xl: "h-8 w-full  px-2",
    base: "flex items-center  bg-green-800  text-green-200",
  };
  return (
    <div
      className={`${style.xl} ${style.base} ${
        isDownloaded ? "" : "opacity-50"
      }`}
    >
      <h1 className="text-xs line-clamp-1">{title.replace("\n", " - ")}</h1>
    </div>
  );
}
