import { CustomThemeData } from "@shipengine/giger-theme";

export const themeConfig: CustomThemeData = {
  borderRadius: {
    XS: "2px",
    S: "4px",
    M: "8px",
    L: "16px",
    XL: "32px",
  },
  breakPoints: {
    mobileLarge: 480,
    tablet: 768,
    tabletLarge: 960,
    desktop: 1280,
  },
  iconSize: {
    small: "16px",
    medium: "20px",
    regular: "24px",
    large: "32px",
    extra_large: "48px",
  },
  palette: {
    primary: {
      ultraLight: "#e0f4fe",
      light: "#b1e2fc",
      main: "#0070ba",
      dark: "#035098",
    },
    secondary: {
      ultraLight: "#e6e9f4",
      light: "#96a3d2",
      main: "#003087",
      dark: "#001e72",
    },
    error: {
      main: "#df341c",
      light: "#fac8ca",
    },
    success: {
      main: "#56b652",
      light: "#bfe3be",
    },
    alert: {
      main: "#ffc032",
      light: "#ffebb7",
    },
    info: {
      main: "#37aad5",
      light: "#b6e5f0",
    },
    gray: {
      main: "#6c7378",
      light: "#dedede",
      ultraLight: "#ececec",
      megaLight: "#f5f7fa",
      dark: "#2c2e2f",
    },
    black: "#000",
    white: "#fff",
    dataVisualization: {
      highContrast: {
        blueDark: "#002039",
        coral: "#F95D6A",
        purpleDark: "#665191",
        orange: "#FFA600",
        purple: "#A05195",
        orangeDark: "#FF7C43",
        blue: "#3970C1",
        cyan: "#45CEE0",
        pink: "#D12771",
        green: "#B3D849",
      },
      lowContrast: {
        blueDark: "#5283AB",
        coral: "#FCA6AD",
        purpleDark: "#B1A2D0",
        orange: "#FDDFA5",
        purple: "#D4BBFF",
        orangeDark: "#FCC2A9",
        blue: "#96B3DE",
        cyan: "#BAE6FF",
        pink: "#E995BA",
        green: "#DEF895",
      },
    },
  },
  spacingBase: 8,
  typography: {
    fontWeight: {
      light: 200,
      normal: 300,
      semibold: 400,
      bold: 600,
    },
    fontSize: {
      XXS: "10px",
      XS: "12px",
      S: "14px",
      M: "16px",
      L: "18px",
      XL: "20px",
      XXL: "24px",
      XXXL: "32px",
      XXXXL: "48px",
    },
    lineHeight: {
      S: "20px",
      M: "24px",
      L: "28px",
      XL: "32px",
      XXL: "48px",
      XXXL: "72px",
    },
    letterSpacing: {
      S: 0,
      M: 1,
      L: 3,
      XL: 5,
      XXL: 8,
      XXXL: 12,
    },
  },
  card: {
    borderRadius: {
      mobile: "4px",
      tablet: "8px",
      desktop: "8px",
    },
  },
  elevations: {
    flat1: {
      boxShadow: "0 2px 2px rgba(0, 0, 0, 0.1)",
      zIndex: 1,
    },
    flat2: {
      boxShadow: "0 2px 2px rgba(0, 0, 0, 0.1)",
      zIndex: 1000,
    },
    above: {
      boxShadow: "0 0 12px rgba(0, 0, 0, 0.1)",
      zIndex: 1000,
    },
    sticky: {
      boxShadow: "none",
      zIndex: 1001,
    },
    raised: {
      boxShadow: "0 8px 8px rgba(0, 0, 0, 0.1)",
      zIndex: 1002,
    },
    raisedInverted1: {
      boxShadow: "0 -8px 8px rgba(0, 0, 0, 0.1)",
      zIndex: 1002,
    },
    raisedInverted2: {
      boxShadow: "0 -8px 8px rgba(0, 0, 0, 0.1)",
      zIndex: 1003,
    },
    popout1: {
      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
      zIndex: 1004,
    },
    popout2: {
      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
      zIndex: 1005,
    },
    overlay1: {
      boxShadow: "0 0 24px rgba(0, 0, 0, 0.1)",
      zIndex: 1006,
    },
    backdrop: {
      boxShadow: "none",
      zIndex: 1007,
    },
    overlay2: {
      boxShadow: "0 0 24px rgba(0, 0, 0, 0.1)",
      zIndex: 1008,
    },
  },
  grid: {
    mobile: {
      columns: 4,
      horizontalSpace: 16,
      verticalSpace: 16,
      gutter: 16,
    },
    mobileLarge: {
      columns: 4,
      horizontalSpace: 16,
      verticalSpace: 16,
      gutter: 16,
    },
    tablet: {
      columns: 12,
      horizontalSpace: 16,
      verticalSpace: 24,
      gutter: 24,
    },
    tabletLarge: {
      columns: 12,
      horizontalSpace: 16,
      verticalSpace: 24,
      gutter: 24,
    },
    desktop: {
      columns: 12,
      horizontalSpace: 16,
      verticalSpace: 24,
      gutter: 24,
    },
    desktopLarge: {
      columns: 12,
      horizontalSpace: 16,
      verticalSpace: 24,
      gutter: 24,
    },
  },
  fontFaces: [
    {
      family: "PayPal Sans Small",
      source: [
        "https://cdn.packlink.com/brand/paypal/fonts/PayPalSans-Small-Web/Light.woff",
      ],
      descriptors: {
        weight: "200",
        style: "normal",
      },
    },
    {
      family: "PayPal Sans Small",
      source: [
        "https://cdn.packlink.com/brand/paypal/fonts/PayPalSans-Small-Web/Regular.woff",
      ],
      descriptors: {
        weight: "300",
        style: "normal",
      },
    },
    {
      family: "PayPal Sans Small",
      source: [
        "https://cdn.packlink.com/brand/paypal/fonts/PayPalSans-Small-Web/Medium.woff",
      ],
      descriptors: {
        weight: "400",
        style: "normal",
      },
    },
    {
      family: "PayPal Sans Small",
      source: [
        "https://cdn.packlink.com/brand/paypal/fonts/PayPalSans-Small-Web/Bold.woff",
      ],
      descriptors: {
        weight: "600",
        style: "normal",
      },
    },
  ],
  defaultFontFamily: "PayPal Sans Small, sans-serif",
  components: {
    Chip: {
      backgroundColor: "#fff",
      border: "1px solid #dedede",
      borderRadius: "16px",
      color: "#6c7378",
      fontWeight: 400,
      padding: "4px 16px",
      isSelected: {
        border: "none",
        backgroundColor: "#e0f4fe",
        color: "#035098",
      },
    },
    Link: {
      defaultColor: "#0070ba",
      visitedColor: "#035098",
      hoverColor: "#035098",
      activeColor: "#b1e2fc",
      isDark: {
        defaultColor: "#fff",
        visitedColor: "#fff",
        hoverColor: "#fff",
        activeColor: "#b1e2fc",
      },
    },
    Button: {
      borderRadius: "20px",
    },
    Dialog: {
      action: {
        justifyContent: "flex-end",
      },
      content: {
        textAlign: "left",
        padding: 4,
      },
      dialog: {
        backgroundColor: "rgba(0, 0, 0, 0.26)",
        borderRadius: "8px",
      },
      header: {
        borderBottom: "1px solid #dedede",
        padding: 4,
        titleColor: "#2c2e2f",
      },
    },
    Typography: {
      heading1: {
        fontSize: "48px",
        fontWeight: 600,
        lineHeight: "72px",
        letterSpacing: 0,
      },
      heading2: {
        fontSize: "32px",
        fontWeight: 600,
        lineHeight: "48px",
        letterSpacing: 1,
      },
      heading3: {
        fontSize: "24px",
        fontWeight: 600,
        lineHeight: "48px",
        letterSpacing: 3,
      },
      heading4: {
        fontSize: "20px",
        fontWeight: 600,
        lineHeight: "32px",
        letterSpacing: 3,
      },
      heading5: {
        fontSize: "18px",
        fontWeight: 600,
        lineHeight: "28px",
        letterSpacing: 3,
      },
      heading6: {
        fontSize: "16px",
        fontWeight: 600,
        lineHeight: "24px",
        letterSpacing: 3,
      },
      subtitle1: {
        fontSize: "16px",
        fontWeight: 400,
        lineHeight: "24px",
        letterSpacing: 3,
      },
      subtitle2: {
        fontSize: "14px",
        fontWeight: 400,
        lineHeight: "20px",
        letterSpacing: 5,
      },
      body1: {
        fontSize: "16px",
        fontWeight: 300,
        lineHeight: "24px",
        letterSpacing: 0,
      },
      body2: {
        fontSize: "14px",
        fontWeight: 300,
        lineHeight: "20px",
        letterSpacing: 3,
      },
      small: {
        fontSize: "12px",
        fontWeight: 300,
        lineHeight: "20px",
        letterSpacing: 5,
      },
    },
    Checkbox: {
      borderRadius: "2px",
      square: false,
    },
    Field: {
      fontWeight: 600,
      color: "#2c2e2f",
      placeholder: {
        fontWeight: 600,
      },
    },
    FieldContainer: {
      borderRadius: "4px",
    },
    Table: {
      border: "none",
      borderRadius: "4px",
      boxShadow: "0 0 12px rgba(0, 0, 0, 0.1)",
    },
  },
};
