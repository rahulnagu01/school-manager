import './globals.css';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'School Manager',
  description: 'Manage Schools database',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}