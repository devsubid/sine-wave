import StyledComponentsRegistry from "./lib/registry";

export const metadata = {
  title: "Canvas",
  description: "A simple canvas app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
