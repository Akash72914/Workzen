import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/providers/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Workzen | Project management",
  description: "A calmer way to move your team’s work forward.",
};

const themeBootstrap = `
  try {
    var savedPreference = localStorage.getItem("workzen-theme");
    var systemPrefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    var preference = savedPreference === "light" || savedPreference === "dark" || savedPreference === "system"
      ? savedPreference
      : "system";
    document.documentElement.dataset.themePreference = preference;
    document.documentElement.dataset.theme = preference === "system"
      ? systemPrefersDark ? "dark" : "light"
      : preference;
  } catch (error) {
    document.documentElement.dataset.theme = "light";
  }
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
