import { ReactNode } from "react";
import Provider from "../components/Provider";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Provider>{children}</Provider>
    </div>
  );
}
