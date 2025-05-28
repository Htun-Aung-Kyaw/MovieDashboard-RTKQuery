import type { ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";
import { Nav } from "./components/Nav";

import "./styles/globals.css";
import styles from "./styles/layout.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <html lang="en">
          <body cz-shortcut-listen="true">
              <section className={styles.container}>
                  <aside className={styles.aside}><Nav/></aside>
                  <main className={styles.main}>
                      <div className={styles.content}>{children}</div>
                      <footer className={styles.footer}>
                          <span>This is my NEXT JS project using Redux Toolkit.</span>
                      </footer>
                  </main>
              </section>
          </body>
      </html>
    </StoreProvider>
  );
}
