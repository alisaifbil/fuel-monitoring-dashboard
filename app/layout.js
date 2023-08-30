import "./globals.css";
import SideBar from "@/components/SideBar";
import Provider from "@/components/Provider";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <SideBar children={children} />
        </Provider>
      </body>
    </html>
  );
}
