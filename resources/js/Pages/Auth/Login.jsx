import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import FormField from '../../Components/admin/form/FormField';
import TextInput from '../../Components/admin/form/TextInput';
import AdminButton from '../../Components/admin/AdminButton';

export default function Login({ status }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const resolve = (name) => (typeof route === 'function' ? route(name) : '/login');

  const submit = (e) => {
    e.preventDefault();
    post(resolve('login'), { onFinish: () => reset('password') });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg px-4 text-text">
      <Head title="Sign in" />

      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="mb-2 font-mono-ui text-xs uppercase tracking-[0.18em] text-text-muted">
            Portfolio CMS
          </p>
          <h1 className="font-display text-2xl tracking-tight">Admin sign in</h1>
        </div>

        {status && (
          <div className="mb-4 rounded-md border border-status/40 bg-status/10 px-3 py-2 text-sm text-status">
            {status}
          </div>
        )}

        <form onSubmit={submit} className="flex flex-col gap-4 rounded-xl border border-border bg-surface p-6">
          <FormField label="Email" htmlFor="email" error={errors.email} required>
            <TextInput
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              invalid={!!errors.email}
              autoComplete="username"
              autoFocus
            />
          </FormField>

          <FormField label="Password" htmlFor="password" error={errors.password} required>
            <TextInput
              id="password"
              type="password"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              invalid={!!errors.password}
              autoComplete="current-password"
            />
          </FormField>

          <label className="flex items-center gap-2 text-sm text-text-muted">
            <input
              type="checkbox"
              checked={data.remember}
              onChange={(e) => setData('remember', e.target.checked)}
              className="rounded border-border text-accent focus:ring-accent"
            />
            Remember me
          </label>

          <AdminButton type="submit" disabled={processing} className="mt-1 w-full">
            {processing ? 'Signing in…' : 'Sign in'}
          </AdminButton>
        </form>
      </div>
    </div>
  );
}
