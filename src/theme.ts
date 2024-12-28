import { black, white } from "@/tailwind.config";
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
  background: white,
  foreground: black,
} as const;
