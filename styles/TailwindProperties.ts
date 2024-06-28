export default interface TailProperties {
  position?: string;
  box?: string;
  layout?: string;
  typo?: string;
  bg_border?: string;
  anime_transit?: string;
  transform?: string;
  interact?: string;
  etc?: string;
}

export function TailClassName(tailwindProperties: TailProperties) {
  return `${tailwindProperties.position} ${tailwindProperties.bg_border} ${tailwindProperties.box} ${tailwindProperties.layout} ${tailwindProperties.typo} ${tailwindProperties.anime_transit} ${tailwindProperties.transform} ${tailwindProperties.interact}`;
}
