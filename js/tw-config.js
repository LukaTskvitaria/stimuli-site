tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#334f2b",
        "on-primary": "#ffffff",
        "primary-container": "#4a6741",
        "on-primary-container": "#c2e4b4",
        "primary-fixed": "#caecbc",
        "on-primary-fixed": "#062104",
        "primary-fixed-dim": "#afd0a1",
        "on-primary-fixed-variant": "#324e2a",
        "secondary": "#376282",
        "on-secondary": "#ffffff",
        "secondary-container": "#afd9fe",
        "on-secondary-container": "#34607f",
        "secondary-fixed": "#cae6ff",
        "secondary-fixed-dim": "#a1cbef",
        "tertiary": "#534537",
        "on-tertiary": "#ffffff",
        "tertiary-container": "#6c5d4d",
        "on-tertiary-container": "#ecd7c3",
        "tertiary-fixed": "#f4dfcb",
        "tertiary-fixed-dim": "#d7c3b0",
        "on-tertiary-fixed": "#241a0e",
        "background": "#f4fbfa",
        "on-background": "#161d1d",
        "surface": "#f4fbfa",
        "on-surface": "#161d1d",
        "surface-variant": "#dde4e3",
        "on-surface-variant": "#434840",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#eef5f4",
        "surface-container": "#e8efef",
        "surface-container-high": "#e3eae9",
        "surface-container-highest": "#dde4e3",
        "outline": "#73796f",
        "outline-variant": "#c3c8bd",
        "error": "#ba1a1a",
        "on-error": "#ffffff"
      },
      spacing: {
        "margin-mobile": "20px",
        "margin-desktop": "40px",
        "gutter": "24px",
        "section-gap": "80px",
        "container-max": "1200px",
        "unit": "8px"
      },
      fontFamily: {
        "display": ["Manrope", "Noto Serif Georgian", "serif"],
        "body": ["Fira Sans", "Noto Sans Georgian", "sans-serif"]
      },
      fontSize: {
        "display-lg": ["48px", { lineHeight: "56px", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display-lg-mobile": ["32px", { lineHeight: "40px", letterSpacing: "-0.01em", fontWeight: "700" }],
        "headline-md": ["32px", { lineHeight: "40px", fontWeight: "600" }],
        "headline-md-mobile": ["24px", { lineHeight: "32px", fontWeight: "600" }],
        "title-lg": ["22px", { lineHeight: "28px", fontWeight: "500" }],
        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
        "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "label-md": ["14px", { lineHeight: "20px", letterSpacing: "0.01em", fontWeight: "500" }]
      }
    }
  }
};
