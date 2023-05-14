import { MantineProviderProps } from "@mantine/core";

export type ThemeProps = Omit<MantineProviderProps, "children">;

export const mantineProps: ThemeProps = {
  withGlobalStyles: true,
  withNormalizeCSS: true,
  theme: {
    colorScheme: "dark",
    fontFamily: "Shantell Sans, sans-serif",
  },
};
