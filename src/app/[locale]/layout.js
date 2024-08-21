import { DM_Serif_Text, Inter } from "next/font/google";// import Navbar from "@/components/Menu/Navbar";
import Footer from "@/components/Footer";
import initTranslations from "../i18n";
import TranslationsProvider from "@/components/TranslationsProvider/TranslationsProvider";
import { dir } from "i18next";
import Navbar from "@/components/Menu/Navbar";
import i18nConfig from "../../../i18nConfig";
import "../globals.css";
import { getMetadata } from "@/components/getMetadata";

const dmSerifText = DM_Serif_Text({ subsets: ["latin"] ,weight:'400' });
export function generateStaticParams() {
  return i18nConfig.locales.map(locale => (locale));
}

export const metadata = {
  title: "EMOCO",
  description: "Engineered Modern Operations",
};

const i18nNamespaces = ["home"];


export default async function RootLayout({ children, params }) {
  const { locale } = params

  const { resources, t } = await initTranslations(locale, i18nNamespaces)


  const passedToggle =()=>{

  }

  return (
    <html lang={locale} dir={dir(locale)} className={dmSerifText.className}>
    
      <body >

        <TranslationsProvider
          namespaces={i18nNamespaces}
          locale={locale}
          resources={resources}
        >
          <section className="relative">
            <Navbar />
            {children}
            <Footer  params={params}/>
          </section>

        </TranslationsProvider>

      </body>
    </html>
  );
}
