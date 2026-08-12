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
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, /* @__PURE__ */ Object.assign({ "./Pages/Admin/About/Edit.jsx": () => import("./assets/Edit-CpH4g14q.js"), "./Pages/Admin/Comments/Index.jsx": () => import("./assets/Index-BmXSQB9P.js"), "./Pages/Admin/Contact/Edit.jsx": () => import("./assets/Edit-CREsAM_4.js"), "./Pages/Admin/Dashboard.jsx": () => import("./assets/Dashboard-Dz84UtZa.js"), "./Pages/Admin/Messages/Index.jsx": () => import("./assets/Index-Df1G3irh.js"), "./Pages/Admin/Messages/Show.jsx": () => import("./assets/Show-Ci_Eg4b5.js"), "./Pages/Admin/Posts/Create.jsx": () => import("./assets/Create-Cq17GeLG.js"), "./Pages/Admin/Posts/Edit.jsx": () => import("./assets/Edit-C3Rmf9uo.js"), "./Pages/Admin/Posts/Form.jsx": () => import("./assets/Form-DIk8Pn_Q.js"), "./Pages/Admin/Posts/Index.jsx": () => import("./assets/Index-DgedUwio.js"), "./Pages/Admin/Profile/Edit.jsx": () => import("./assets/Edit-DN9cT2zW.js"), "./Pages/Admin/Projects/Create.jsx": () => import("./assets/Create-Mqz0kVyi.js"), "./Pages/Admin/Projects/Edit.jsx": () => import("./assets/Edit-TktNFJEt.js"), "./Pages/Admin/Projects/Form.jsx": () => import("./assets/Form-cOZzEhO7.js"), "./Pages/Admin/Projects/Index.jsx": () => import("./assets/Index-DDQJc7yt.js"), "./Pages/Admin/Resources/Create.jsx": () => import("./assets/Create-B0Yvfoiu.js"), "./Pages/Admin/Resources/Edit.jsx": () => import("./assets/Edit-q0B2zpom.js"), "./Pages/Admin/Resources/Form.jsx": () => import("./assets/Form-CuJrrGCb.js"), "./Pages/Admin/Resources/Index.jsx": () => import("./assets/Index-BlYPR30s.js"), "./Pages/Admin/Services/Create.jsx": () => import("./assets/Create-CEwuOQKa.js"), "./Pages/Admin/Services/Edit.jsx": () => import("./assets/Edit-Bs44dXa_.js"), "./Pages/Admin/Services/Form.jsx": () => import("./assets/Form-CANtj-jC.js"), "./Pages/Admin/Services/Index.jsx": () => import("./assets/Index-B5Z6U23_.js"), "./Pages/Admin/SkillCategories/Create.jsx": () => import("./assets/Create-B_a-5UsZ.js"), "./Pages/Admin/SkillCategories/Edit.jsx": () => import("./assets/Edit-C8235uog.js"), "./Pages/Admin/SkillCategories/Form.jsx": () => import("./assets/Form-qstXYIqo.js"), "./Pages/Admin/SkillCategories/Index.jsx": () => import("./assets/Index-8nn3yZV8.js"), "./Pages/Admin/Skills/Create.jsx": () => import("./assets/Create-BIZnQfiI.js"), "./Pages/Admin/Skills/Edit.jsx": () => import("./assets/Edit-CeuKPzBs.js"), "./Pages/Admin/Skills/Form.jsx": () => import("./assets/Form-B-C6TRCl.js"), "./Pages/Admin/Skills/Index.jsx": () => import("./assets/Index-BKWkoBEb.js"), "./Pages/Auth/Login.jsx": () => import("./assets/Login-DEJwI__D.js"), "./Pages/Blog/Index.jsx": () => import("./assets/Index-CTjXzG_j.js"), "./Pages/Blog/Show.jsx": () => import("./assets/Show-D2AuJti2.js"), "./Pages/Home.jsx": () => import("./assets/Home-Be65wHY8.js"), "./Pages/Resources/Index.jsx": () => import("./assets/Index-BNdVac1U.js"), "./Pages/Resources/Show.jsx": () => import("./assets/Show-kHvjYIeX.js") })),
    setup: ({ App, props }) => /* @__PURE__ */ jsx(App, { ...props })
  })
);
