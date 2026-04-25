import { useEffect } from "react";

interface SeoProps {
  title: string;
  description?: string;
  canonical?: string;
}

const SITE = "SBGFARMS";

const Seo = ({ title, description, canonical }: SeoProps) => {
  useEffect(() => {
    const fullTitle = title.includes(SITE) ? title : `${title} | ${SITE}`;
    document.title = fullTitle.slice(0, 60);

    if (description) {
      const desc = description.slice(0, 160);
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "description");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", desc);
    }

    const href = canonical ?? window.location.origin + window.location.pathname;
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", href);
  }, [title, description, canonical]);

  return null;
};

export default Seo;
