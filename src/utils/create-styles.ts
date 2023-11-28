import { Interpolation } from "@emotion/serialize";
import { Theme } from "@packlink/giger-theme";

type CreatStyles = Record<string, Interpolation<Theme>>;

export const createStyles = <T extends CreatStyles>(styles: T): T => styles;
