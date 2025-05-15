import { StaticImageData } from "next/image";

import headerImageDark from "../assets/bg-desktop-dark.jpg";
import headerImageLight from "../assets/bg-desktop-light.jpg";

import headerImageDarkMobile from "../assets/bg-mobile-dark.jpg";
import headerImageLightMobile from "../assets/bg-mobile-light.jpg";

type ThemeType = "dark" | "light";

export function getHeaderImage(
  theme: ThemeType,
  isMobile: boolean,
): StaticImageData {
  const isLightTheme = theme === "light";

  if (isMobile) {
    return isLightTheme ? headerImageLightMobile : headerImageDarkMobile;
  }

  return isLightTheme ? headerImageLight : headerImageDark;
}
