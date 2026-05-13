import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SITE_NAME, DEFAULT_DESCRIPTION } from "../config/site";

const ROUTE_META = {
  "/": {
    title: `${SITE_NAME} · Full-stack engineer`,
    description: DEFAULT_DESCRIPTION,
  },
  "/about": {
    title: `About · ${SITE_NAME}`,
    description: `About ${SITE_NAME} — journey, values, and full-stack engineering focus.`,
  },
  "/projects": {
    title: `Projects · ${SITE_NAME}`,
    description: `Selected work by ${SITE_NAME}: HydroFlow, EasyProfile, eWorld, Grade-A — web, mobile, and APIs.`,
  },
  "/experience": {
    title: `Experience · ${SITE_NAME}`,
    description: `Professional experience and roles for ${SITE_NAME} — web, mobile, and product delivery.`,
  },
  "/skills": {
    title: `Skills · ${SITE_NAME}`,
    description: `Technical skills and tools — React, React Native, Node.js, MongoDB, testing, Docker, and more.`,
  },
  "/contact": {
    title: `Contact · ${SITE_NAME}`,
    description: `Contact ${SITE_NAME} for collaborations, full-stack roles, and product engineering.`,
  },
};

function upsertMeta(selector, attrName, attrValue, content) {
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertOg(property, content) {
  upsertMeta(`meta[property="${property}"]`, "property", property, content);
}

/**
 * Client-side document title + Open Graph / Twitter basics for SPA routes.
 */
export default function Seo() {
  const { pathname } = useLocation();
  const meta = ROUTE_META[pathname] ?? ROUTE_META["/"];

  useEffect(() => {
    document.title = meta.title;

    upsertMeta('meta[name="description"]', "name", "description", meta.description);

    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const url = `${origin}${pathname}`;
    const ogImage = `${origin}/Ewash.png`;

    upsertOg("og:type", "website");
    upsertOg("og:title", meta.title);
    upsertOg("og:description", meta.description);
    upsertOg("og:url", url);
    upsertOg("og:image", ogImage);

    upsertMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", meta.title);
    upsertMeta('meta[name="twitter:description"]', "name", "twitter:description", meta.description);
    upsertMeta('meta[name="twitter:image"]', "name", "twitter:image", ogImage);
  }, [pathname, meta.title, meta.description]);

  return null;
}
