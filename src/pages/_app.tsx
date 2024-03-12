import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Inter } from "next/font/google";
import { Container, Theme, ThemePanel } from "@radix-ui/themes";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import "@radix-ui/themes/styles.css";
import NavBar from "./NavBar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Theme appearance="light" accentColor="violet">
        <NavBar />
        <main className={`font-sans ${inter.variable}`}>
          <Component {...pageProps} />
        </main>
      </Theme>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
