import { Interpolation } from "@emotion/serialize";
import { Theme as GigerTheme } from "@packlink/giger-theme";

declare module "@emotion/react" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends GigerTheme {}
}

type CreatStyles = Record<string, Interpolation<GigerTheme>>;

export const createStyles = <T extends CreatStyles>(styles: T): T => styles;
