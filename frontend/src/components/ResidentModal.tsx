import type { ReactNode } from "react";

interface ResidentModalProps {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(0, 0, 0, 0.45)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "720px",
  maxHeight: "90vh",
  overflowY: "auto",
  backgroundColor: "#ffffff",
  borderRadius: "10px",
  boxShadow: "0 10px 30px rgba(0,0,0,.15)",
};

const headerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "20px 24px",
  borderBottom: "1px solid #e5e7eb",
};

const bodyStyle: React.CSSProperties = {
  padding: "24px",
};

const closeButtonStyle: React.CSSProperties = {
  border: "none",
  background: "transparent",
  fontSize: "24px",
  cursor: "pointer",
  lineHeight: 1,
};

const ResidentModal = ({
  open,
  title,
  children,
  onClose,
}: ResidentModalProps) => {
  if (!open) {
    return null;
  }

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <div style={headerStyle}>
          <h2
            style={{
              margin: 0,
            }}
          >
            {title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            style={closeButtonStyle}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div style={bodyStyle}>{children}</div>
      </div>
    </div>
  );
};

export default ResidentModal;