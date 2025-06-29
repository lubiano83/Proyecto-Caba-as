import Inicio from "./components/Inicio";
import { AuthProvider } from "./contexts/AuthContext";
import { LodgeProvider } from "./contexts/LodgeContext";
import "./globals.css";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {

  const email = "lastrancaslodges@gmail.com";
  const address = "Hijuelas 20, Las Trancas, Pinto.";
  const year = new Date().getFullYear();
  const derechos = `© ${year} Todos los derechos reservados`;

  return (
    <html lang="es">
      <body className="text-white">
        <AuthProvider>
          <LodgeProvider>
            <Inicio email={email} address={address} derechos={derechos} >
              {children}
            </Inicio>
          </LodgeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
