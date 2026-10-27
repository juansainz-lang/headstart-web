import { Inter, JetBrains_Mono } from "next/font/google";

// One variable font for body and headlines (headlines get tighter tracking in CSS).
export const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
// Small labels only: not on the critical path.
export const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], display: "swap", preload: false });
