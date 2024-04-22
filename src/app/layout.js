import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/providers/theme-provider";

const inter = Space_Grotesk({ subsets: ["latin"] });

export const metadata = {
  title: "FAST SEARCH API",
  description: "A high-performance API built with Hono, Next.js and Cloudflare",
};

export default function RootLayout({ children }) {
  const isDev = process.env.NODE_ENV === "development";

  return (
    <html lang="en" suppressHydrationWarning={isDev}>
      <body
        className={`${inter.className} bg-[#010106] text-gray-200 antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
