import { Outfit, Ovo } from "next/font/google";
import "./globals.css";
import ClientLayout from './components/ClientLayout'
import { inter, dmSerif, roboto } from './styles/fonts'

const outfit = Outfit({
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700"], 
});

const ovo = Ovo({
  subsets: ["latin"], 
  weight: ["400"],
});

export const metadata = {
  title: "Portfolio - Rudradev",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSerif.variable} ${roboto.variable}`}>
      <body className={`${roboto.className} antialiased`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
