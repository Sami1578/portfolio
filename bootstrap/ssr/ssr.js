import { jsx } from "react/jsx-runtime";
import { createInertiaApp } from "@inertiajs/react";
import createServer from "@inertiajs/react/server";
import ReactDOMServer from "react-dom/server";
async function resolvePageComponent(path, pages) {
  for (const p of Array.isArray(path) ? path : [path]) {
    const page = pages[p];
    if (typeof page === "undefined") {
      continue;
    }
    return typeof page === "function" ? page() : page;
  }
  throw new Error(`Page not found: ${path}`);
}
createServer(
  (page) => createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, /* @__PURE__ */ Object.assign({ "./Pages/Admin/About/Edit.jsx": () => import("./assets/Edit-COnym4dZ.js"), "./Pages/Admin/Comments/Index.jsx": () => import("./assets/Index-VYgy-6Jq.js"), "./Pages/Admin/Contact/Edit.jsx": () => import("./assets/Edit-OUn53OjY.js"), "./Pages/Admin/Dashboard.jsx": () => import("./assets/Dashboard-zq8tJwMo.js"), "./Pages/Admin/Messages/Index.jsx": () => import("./assets/Index-C6Kaa7DR.js"), "./Pages/Admin/Messages/Show.jsx": () => import("./assets/Show-DFfl_v0v.js"), "./Pages/Admin/Posts/Create.jsx": () => import("./assets/Create-BxgZuWut.js"), "./Pages/Admin/Posts/Edit.jsx": () => import("./assets/Edit-CHwoAWar.js"), "./Pages/Admin/Posts/Form.jsx": () => import("./assets/Form-BBuxohNQ.js"), "./Pages/Admin/Posts/Index.jsx": () => import("./assets/Index-CX6poAYY.js"), "./Pages/Admin/Profile/Edit.jsx": () => import("./assets/Edit-B9zp2N8t.js"), "./Pages/Admin/Projects/Create.jsx": () => import("./assets/Create-C0UMTST9.js"), "./Pages/Admin/Projects/Edit.jsx": () => import("./assets/Edit-CEVWr-G9.js"), "./Pages/Admin/Projects/Form.jsx": () => import("./assets/Form-cOZzEhO7.js"), "./Pages/Admin/Projects/Index.jsx": () => import("./assets/Index-8OzVv0rk.js"), "./Pages/Admin/Services/Create.jsx": () => import("./assets/Create-2iNGFl9E.js"), "./Pages/Admin/Services/Edit.jsx": () => import("./assets/Edit-BADlJiu1.js"), "./Pages/Admin/Services/Form.jsx": () => import("./assets/Form-CANtj-jC.js"), "./Pages/Admin/Services/Index.jsx": () => import("./assets/Index-BqenD8ld.js"), "./Pages/Admin/SkillCategories/Create.jsx": () => import("./assets/Create-M_x9lAK7.js"), "./Pages/Admin/SkillCategories/Edit.jsx": () => import("./assets/Edit-AbtG4L2O.js"), "./Pages/Admin/SkillCategories/Form.jsx": () => import("./assets/Form-qstXYIqo.js"), "./Pages/Admin/SkillCategories/Index.jsx": () => import("./assets/Index-CIOpUbRX.js"), "./Pages/Admin/Skills/Create.jsx": () => import("./assets/Create-B4kJ4Vw0.js"), "./Pages/Admin/Skills/Edit.jsx": () => import("./assets/Edit-BNjIqquY.js"), "./Pages/Admin/Skills/Form.jsx": () => import("./assets/Form-B-C6TRCl.js"), "./Pages/Admin/Skills/Index.jsx": () => import("./assets/Index-DEH2_9O2.js"), "./Pages/Auth/Login.jsx": () => import("./assets/Login-DEJwI__D.js"), "./Pages/Blog/Index.jsx": () => import("./assets/Index-80m2oOGZ.js"), "./Pages/Blog/Show.jsx": () => import("./assets/Show-CRPXJFuK.js"), "./Pages/Home.jsx": () => import("./assets/Home-CVu0zpWu.js") })),
    setup: ({ App, props }) => /* @__PURE__ */ jsx(App, { ...props })
  })
);
