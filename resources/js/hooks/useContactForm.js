import { useForm } from '@inertiajs/react';

/**
 * Handles the contact form lifecycle using Inertia's native form helper.
 * Posts data directly to your Laravel route.
 */
export default function useContactForm() {
  const { data, setData, post, processing, recentlySuccessful, errors, reset } = useForm({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setData(e.target.id, e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Post message to Laravel route named 'contact.store' or '/contact'
    post('/contact', {
      preserveScroll: true,
      onSuccess: () => reset(),
    });
  };

  return {
    formData: data,
    handleChange,
    handleSubmit,
    isSubmitting: processing,
    submitted: recentlySuccessful,
    error: errors.message || errors.email || errors.name || null,
  };
}