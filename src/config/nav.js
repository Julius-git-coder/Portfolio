/** Primary navigation: label shown in UI → URL path */
export const NAV_TABS = [
  { name: "Home", path: "/" },
  { name: "About Me", path: "/about" },
  { name: "Project", path: "/projects" },
  { name: "Experience", path: "/experience" },
  { name: "Skills", path: "/skills" },
  { name: "Contact", path: "/contact" },
];

export function tabPath(tabName) {
  return NAV_TABS.find((t) => t.name === tabName)?.path ?? "/";
}
