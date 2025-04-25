// src/components/ui/button.jsx
export function Button({ children, onClick }) {
    return <button onClick={onClick} style={{ padding: "0.5rem 1rem" }}>{children}</button>;
  }
  