import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { useForm, Head } from "@inertiajs/react";
import { F as FormField, T as TextInput } from "./TextInput-DU1M0Yh9.js";
import { A as AdminButton } from "./AdminButton-Dfp76XtD.js";
function Login({ status }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    remember: false
  });
  const resolve = (name) => typeof route === "function" ? route(name) : "/login";
  const submit = (e) => {
    e.preventDefault();
    post(resolve("login"), { onFinish: () => reset("password") });
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen items-center justify-center bg-bg px-4 text-text", children: [
    /* @__PURE__ */ jsx(Head, { title: "Sign in" }),
    /* @__PURE__ */ jsxs("div", { className: "w-full max-w-sm", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-8 text-center", children: [
        /* @__PURE__ */ jsx("p", { className: "mb-2 font-mono-ui text-xs uppercase tracking-[0.18em] text-text-muted", children: "Portfolio CMS" }),
        /* @__PURE__ */ jsx("h1", { className: "font-display text-2xl tracking-tight", children: "Admin sign in" })
      ] }),
      status && /* @__PURE__ */ jsx("div", { className: "mb-4 rounded-md border border-status/40 bg-status/10 px-3 py-2 text-sm text-status", children: status }),
      /* @__PURE__ */ jsxs("form", { onSubmit: submit, className: "flex flex-col gap-4 rounded-xl border border-border bg-surface p-6", children: [
        /* @__PURE__ */ jsx(FormField, { label: "Email", htmlFor: "email", error: errors.email, required: true, children: /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "email",
            type: "email",
            value: data.email,
            onChange: (e) => setData("email", e.target.value),
            invalid: !!errors.email,
            autoComplete: "username",
            autoFocus: true
          }
        ) }),
        /* @__PURE__ */ jsx(FormField, { label: "Password", htmlFor: "password", error: errors.password, required: true, children: /* @__PURE__ */ jsx(
          TextInput,
          {
            id: "password",
            type: "password",
            value: data.password,
            onChange: (e) => setData("password", e.target.value),
            invalid: !!errors.password,
            autoComplete: "current-password"
          }
        ) }),
        /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 text-sm text-text-muted", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              checked: data.remember,
              onChange: (e) => setData("remember", e.target.checked),
              className: "rounded border-border text-accent focus:ring-accent"
            }
          ),
          "Remember me"
        ] }),
        /* @__PURE__ */ jsx(AdminButton, { type: "submit", disabled: processing, className: "mt-1 w-full", children: processing ? "Signing in…" : "Sign in" })
      ] })
    ] })
  ] });
}
export {
  Login as default
};
