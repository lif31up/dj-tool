import { PlaylistElement } from "@/utils/PlaylistAtom";

export default ParseHTML;

function ParseHTML(id: string, content: string): PlaylistElement[] {
  // init the variables and buffer
  const container: HTMLElement | null = document.getElementById(id);
  if (!container) return [];
  const parser: HTMLDivElement = document.createElement("div");
  container.appendChild(parser);
  parser.innerHTML = content;
  const buffer: PlaylistElement[] = [];

  // parse the content
  const parent: HTMLElement | null = container.querySelector(
    ".oIeuP60w1eYpFaXESRSg"
  ); // parent
  if (!parent) return ParseHTML_ERROR;
  const NodeListOfTarget: NodeListOf<HTMLElement> = parent.querySelectorAll(
    ".w46g_LQVSLE9xK399VYf"
  ); // NodeListOfTarget
  NodeListOfTarget.forEach((element: HTMLElement, index: number): void => {
    if (index < 2) return; // discard first element
    let textBuffer: string = "";
    element.childNodes.forEach((child: ChildNode, index: number): void => {
      //@ts-ignore
      if (child.innerText) textBuffer += child.innerText.trim();
    }); // forEach
    const [title, artist]: string[] = textBuffer.trim().split("\n");
    if (title && artist) {
      buffer.push({ title: title, artist: artist, index: 0, snippets: [] });
    } // if
  }); // forEach
  container.removeChild(parser);
  if (buffer.length < 1) return ParseHTML_ERROR;
  return buffer;
} // ParseHTML

export const ParseHTML_ERROR: PlaylistElement[] = [];
