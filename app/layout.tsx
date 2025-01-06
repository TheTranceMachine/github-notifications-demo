import type { ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";
import "./styles/index.scss";
// import "@carbon/react/scss/styles.scss";

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <html lang="en">
        <body>{children}</body>
      </html>
    </StoreProvider>
  );
}
