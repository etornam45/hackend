import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import  './root.css'
import  'virtual:uno.css'
import  '@unocss/reset/tailwind.css'
import { NavBar } from "./components/nav-bar";
import { FloatingBlur } from "./ui/blur-floating";


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
      <body className="dark:bg-gray-900 text-gray-800 dark:text-gray-100 font-mono relative">
        <NavBar />
        {children}
        <FloatingBlur />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
