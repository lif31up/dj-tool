import DefaultProps from "@/utils/DefaultProps";
import TailwindProperties from "@/styles/TailwindProperties";

function HeadLine({ className }: DefaultProps<never>) {
  const style: TailwindProperties = {
    xl: "w-fit h-fit  flex items-center gap-4",
    base: "text-green-200",
  };
  return (
    <section className="absolute top-0  w-full h-fit  mt-8  flex items-center justify-center">
      <div className={`${style.xl} ${style.base} ${className}`}>
        <h1 className="w-fit h-full  px-2  bg-green-900">
          {"LIF31UP's Spotify Playlist Downloader for DJ"}
        </h1>
        <a
          className="w-8 h-8  flex items-center justify-center  rounded-full  bg-green-900"
          href="https://open.spotify.com/"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={24}
            height={24}
            fill={"none"}
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M7.5 12.0685C8.59944 11.6998 9.77639 11.5 11 11.5C13.0238 11.5 14.9199 12.0465 16.5488 13M18 10C16.1509 8.7383 13.9122 8 11.5 8C9.90307 8 8.38216 8.32358 7 8.90839M15.129 16C13.8927 15.3609 12.4894 15 11.0018 15C10.1819 15 9.38762 15.1096 8.63281 15.315"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}
export default HeadLine;
