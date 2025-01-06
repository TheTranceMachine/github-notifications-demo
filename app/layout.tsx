import type { ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";
import "./styles/index.scss";

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <html lang="en">
        <body style={{ backgroundColor: "#1d1d1d" }}>{children}</body>
      </html>
    </StoreProvider>
  );
}
