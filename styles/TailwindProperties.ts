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
} // TailProperties

export function TailClassName(tailwindProperties: TailProperties) {
  return `${tailwindProperties.position ? tailwindProperties.position : ""} ${
    tailwindProperties.bg_border ? tailwindProperties.bg_border : ""
  } ${tailwindProperties.box ? tailwindProperties.box : ""} ${
    tailwindProperties.layout ? tailwindProperties.layout : ""
  } ${tailwindProperties.typo ? tailwindProperties.typo : ""} ${
    tailwindProperties.anime_transit ? tailwindProperties.anime_transit : ""
  } ${tailwindProperties.transform ? tailwindProperties.transform : ""} ${
    tailwindProperties.interact ? tailwindProperties.interact : ""
  }`; // return
} // TailClassName
