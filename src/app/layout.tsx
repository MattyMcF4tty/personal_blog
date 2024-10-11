import './globals.css';

export const metadata = {
  title: 'Matthias Kristensen',
  description: 'A blog about me and my programming projects',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
