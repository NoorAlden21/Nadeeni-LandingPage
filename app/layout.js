import { El_Messiri, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";

const messiri = El_Messiri({
  subsets: ["arabic", "latin"],
  weight: ["500", "600", "700"],
  variable: "--font-messiri",
});

const plex = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex",
});

export const metadata = {
  title: "ناديني — جهاز النداء الرقمي للمطاعم",
  description:
    "استبدلوا أجهزة النداء برمز QR. الزبون يتابع طلبه من المتصفح، والكاشير يضغط تنبيه عندما يجهز الطعام. بلا تطبيق وبلا أجهزة.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${messiri.variable} ${plex.variable}`}
    >
      <body className="bg-ivory font-sans text-ink antialiased">{children}</body>
    </html>
  );
}
