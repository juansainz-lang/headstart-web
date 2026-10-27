import type { ReactNode } from "react";
import Analytics from "@/components/layout/Analytics";
import BookingModal from "@/components/layout/BookingModal";
import MotionProvider from "@/components/layout/MotionProvider";
import { content, type Lang } from "@/lib/content";
import { inter, jetbrains } from "@/lib/fonts";

// The <html> document shared by the English and Spanish sites (each has its own root layout,
// so the page's language attribute is right for search engines and screen readers).
export default function RootShell({ lang, children }: { lang: Lang; children: ReactNode }) {
  return (
    <html lang={content[lang].htmlLang} className={`${inter.variable} ${jetbrains.variable} antialiased`}>
      <body>
        <MotionProvider>
          {children}
          <BookingModal t={content[lang].booking} />
        </MotionProvider>
        <Analytics />
      </body>
    </html>
  );
}
