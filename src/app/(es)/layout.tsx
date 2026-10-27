import type { ReactNode } from "react";
import RootShell from "@/components/layout/RootShell";
import { metadataFor } from "@/lib/metadata";
import "../globals.css";

export const metadata = metadataFor("es");
export { viewport } from "@/lib/metadata";

export default function Layout({ children }: { children: ReactNode }) {
  return <RootShell lang="es">{children}</RootShell>;
}
