import { black, white } from "@/tailwind.config";
import { Geist, Geist_Mono, Noto_Znamenny_Musical_Notation, Zilla_Slab } from "next/font/google";


const notoSans = Noto_Znamenny_Musical_Notation({
  weight: "400",
  subsets: ["latin", "math"],
});

const standardSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const standardMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const serif = Zilla_Slab({
  weight: ["400", "600"],
  subsets: ["latin"],
});

export const font = {
  notoSans,
  standardSans,
  standardMono,
  serif,
};

export const globalTheme = {
  background: white,
  foreground: black,
} as const;
