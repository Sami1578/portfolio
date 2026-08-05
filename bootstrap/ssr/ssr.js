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
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, /* @__PURE__ */ Object.assign({ "./Pages/Admin/About/Edit.jsx": () => import("./assets/Edit-DIeh0sj8.js"), "./Pages/Admin/Contact/Edit.jsx": () => import("./assets/Edit-C3998MIV.js"), "./Pages/Admin/Dashboard.jsx": () => import("./assets/Dashboard-D10eknJl.js"), "./Pages/Admin/Messages/Index.jsx": () => import("./assets/Index-DIHFjLkU.js"), "./Pages/Admin/Messages/Show.jsx": () => import("./assets/Show-Cd5kGHzt.js"), "./Pages/Admin/Profile/Edit.jsx": () => import("./assets/Edit-DuykHu0J.js"), "./Pages/Admin/Projects/Create.jsx": () => import("./assets/Create-C1PzaU6H.js"), "./Pages/Admin/Projects/Edit.jsx": () => import("./assets/Edit-xT4swMpy.js"), "./Pages/Admin/Projects/Form.jsx": () => import("./assets/Form-cOZzEhO7.js"), "./Pages/Admin/Projects/Index.jsx": () => import("./assets/Index-DeM63pN7.js"), "./Pages/Admin/Services/Create.jsx": () => import("./assets/Create-WeG0o-SN.js"), "./Pages/Admin/Services/Edit.jsx": () => import("./assets/Edit-DLGTqv5Z.js"), "./Pages/Admin/Services/Form.jsx": () => import("./assets/Form-CANtj-jC.js"), "./Pages/Admin/Services/Index.jsx": () => import("./assets/Index-Ci_Rx4UB.js"), "./Pages/Admin/SkillCategories/Create.jsx": () => import("./assets/Create-CI4yMT33.js"), "./Pages/Admin/SkillCategories/Edit.jsx": () => import("./assets/Edit-q5kPF0D5.js"), "./Pages/Admin/SkillCategories/Form.jsx": () => import("./assets/Form-qstXYIqo.js"), "./Pages/Admin/SkillCategories/Index.jsx": () => import("./assets/Index-DKR3UO9u.js"), "./Pages/Admin/Skills/Create.jsx": () => import("./assets/Create-DPJuOoXS.js"), "./Pages/Admin/Skills/Edit.jsx": () => import("./assets/Edit-GFzrm4sI.js"), "./Pages/Admin/Skills/Form.jsx": () => import("./assets/Form-B-C6TRCl.js"), "./Pages/Admin/Skills/Index.jsx": () => import("./assets/Index-DP_Ve7I7.js"), "./Pages/Auth/Login.jsx": () => import("./assets/Login-DEJwI__D.js"), "./Pages/Home.jsx": () => import("./assets/Home-BU2wxAz6.js") })),
    setup: ({ App, props }) => /* @__PURE__ */ jsx(App, { ...props })
  })
);
