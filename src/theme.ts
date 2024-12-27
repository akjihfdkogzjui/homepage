import { Geist, Geist_Mono, Zilla_Slab } from "next/font/google";


const standardSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const standardMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const serif = Zilla_Slab({
  weight: "400",
  subsets: ["latin"],
});

export const font = {
  standardSans,
  standardMono,
  serif,
};




export const globalTheme = {
  background: "#f9f9f9",
  foreground: "#161616",
} as const;
