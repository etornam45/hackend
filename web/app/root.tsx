import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import 'virtual:uno.css'
import './root.css'
import '@unocss/reset/tailwind.css'
import { NavBar } from "./components/nav-bar";
import { FloatingBlur } from "./ui/blur-floating";
import { FloatThemeSwitcher } from "./ui/theme-switcher";
import { ModalFloat } from "./ui/modal-float";


export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/x-icon" href="/favicon.png" />
        <Meta />
        <Links />
      </head>
      <body className="dark:bg-gray-900 text-gray-800 dark:text-gray-100 font-mono">
        <NavBar />
        {children}
        <ModalFloat />
        <FloatingBlur />
        <ScrollRestoration />
        <div className="fixed bottom-5 right-5">
          <FloatThemeSwitcher />
        </div>
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
