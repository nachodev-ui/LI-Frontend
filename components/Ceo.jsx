import { DefaultSeo } from "next-seo";

const Ceo = ({ page }) => {
  const title = `Librería Imagina - ${page}`;
  const description = "Integración Librería Imagina por TESS";
  const canonical = "https://tu-sitio-web.com";
  const iconPath = "/img/LI-Logo.png";

  return (
    <DefaultSeo
      title={title}
      description={description}
      canonical={canonical}
      openGraph={{
        url: canonical,
        title: title,
        description: description,
        images: [{ url: iconPath, alt: "Imagen Open Graph" }],
        site_name: "Librería Imagina",
      }}
      additionalLinkTags={[
        {
          rel: "icon",
          href: iconPath,
        },
      ]}
    />
  );
};

export default Ceo;
