import { ReactNode } from "react";

import OfficialSidebar from "../components/OfficialSidebar";
import OfficialTopbar from "../components/OfficialTopbar";

interface OfficialLayoutProps {
  children: ReactNode;
}

const OfficialLayout = ({
  children,
}: OfficialLayoutProps) => {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f5f7fb",
      }}
    >
      <OfficialSidebar />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <OfficialTopbar />

        <main
          style={{
            flex: 1,
            padding: "24px",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default OfficialLayout;