import { CSSProperties } from "react";

interface ApiConfigBarProps {
  baseUrl: string;
  onChange: (value: string) => void;
  onConnect: () => void;
  online: boolean;
}

export default function ApiConfigBar({
  baseUrl,
  onChange,
  onConnect,
  online,
}: ApiConfigBarProps) {
  return (
    <div style={styles.wrapper}>
      <input
        value={baseUrl}
        onChange={(e) => onChange(e.target.value)}
        placeholder="http://localhost:8080"
        style={styles.input}
      />
      <button onClick={onConnect} style={styles.btn}>
        🔄 Conectar
      </button>
      <span
        title={online ? "Conectado" : "Offline"}
        style={{ ...styles.dot, background: online ? "#1D9E75" : "#888" }}
      />
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  wrapper: {
    display: "flex",
    gap: 8,
    maxWidth: 520,
    margin: "0 auto 1.25rem",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: 36,
    padding: "0 12px",
    borderRadius: 8,
    border: "1px solid #2d4a6a",
    background: "#162032",
    color: "#d0e4f7",
    fontSize: 13,
    outline: "none",
  },
  btn: {
    height: 36,
    padding: "0 14px",
    borderRadius: 8,
    fontSize: 13,
    cursor: "pointer",
    background: "#378ADD",
    color: "#fff",
    border: "1px solid #185FA5",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    flexShrink: 0,
  },
};
