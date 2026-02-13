"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html
      lang="en"
      style={{
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <body
        style={{
          maxWidth: "28rem",
          width: "100%",
          borderRadius: "0.5rem",
          border: "1px solid #e5e7eb",
          padding: "1.5rem",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        }}
      >
        <h1>A fatal error occurred</h1>
        <p>{error.message}</p>
        <a href="/">
          <button type="button">Go home</button>
        </a>
        <button type="button" onClick={reset}>
          Reset
        </button>
      </body>
    </html>
  );
}
