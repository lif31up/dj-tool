import YT_KEY from "@/public/YTKeys.json";
import DefaultProps from "@/utils/DefaultProps";
import TailwindProperties from "@/styles/TailwindProperties";

function Instruction({ className }: DefaultProps<never>) {
  const style: TailwindProperties = {
    xl: "w-full h-full  flex-col",
    base: "p-2  relative",
  };
  return (
    <div className={`${style.xl} ${style.base} ${className}`}>
      <div className="w-full h-10  px-2  flex items-center justify-start">
        <h1 className="text-sm font-bold text-green-300">🔑 Spare Keys</h1>
      </div>
      <div className="w-full h-fit pb-4 px-2  grid gap-1  text-green-500 border-b border-b-green-800">
        {YT_KEY.map((key: string, index: number) => (
          <Key key={index} data={{ key: key }} />
        ))}
      </div>
      <div className="w-full h-10  px-2 pt-1  flex items-center justify-start gap-2 text-green-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="20"
          height="20"
        >
          <path d="M13 15C10.7083 21 4.29167 15 2 21" stroke="currentColor" />
          <path
            d="M15.5 15H17.0013C19.3583 15 20.5368 15 21.2691 14.2678C22.0013 13.5355 22.0013 12.357 22.0013 10V8C22.0013 5.64298 22.0013 4.46447 21.2691 3.73223C20.5368 3 19.3583 3 17.0013 3H13.0013C10.6443 3 9.46576 3 8.73353 3.73223C8.11312 4.35264 8.01838 5.29344 8.00391 7"
            stroke="currentColor"
          />
          <circle cx="7.5" cy="12.5" r="2.5" stroke="currentColor" />
          <path d="M12 7H18M18 11H15" stroke="currentColor" />
        </svg>
        <h1 className="text-base font-bold">Instruction</h1>
      </div>
      <div className="w-full h-auto  p-2  grid gap-1  text-xs text-green-200">
        <ul className="bg-green-950 p-2">
          스포티파이를 통해 만든 플레이리스트의 링크로 이동합니다.
        </ul>
        <ul className="bg-green-950 p-2">
          해당 페이지를 html 파일로 저장합니다.
        </ul>
        <ul className="bg-green-950 p-2">
          그렇게 저장한 파일을 로더에 입력합니다. 그 후 파일 분석기의 분석
          버튼을 누릅니다. 이때, 상단의 여분 키들 중 하나를 골라 입력합니다.
          만약 비활성화된 것이 있다면 다른 키를 입력해 다시 분석합니다.
        </ul>
        <ul className="bg-green-950 p-2">
          그 후 파일 분석기 하단의 다운로드 버튼을 눌러 곡을 모두
          다운로드합니다. (이때, 팝업을 활성화해야 합니다.)
        </ul>
      </div>

      <h3
        className="absolute bottom-0 mb-2 ml-1 text-green-200  text-center  pt-2  line-clamp-1"
        style={{ fontSize: "10px" }}
      >
        ⚠ &nbsp; 만약 이해가 안 가는 게 있다면 @lif31up으로 DM 주세요.
      </h3>
    </div>
  );
}
export default Instruction;

type KeyData = {
  key: string;
};
function Key({ className, data }: DefaultProps<KeyData>) {
  if (!data) return <></>;
  const { key }: KeyData = data;
  const style: TailwindProperties = {
    xl: "",
    base: "",
  };
  return (
    <div className={`${style.xl} ${style.base} ${className}`}>
      <h1 className="text-xs"> • {key}</h1>
    </div>
  );
}
