'use client';

import { useId, useState, type FormEvent } from 'react';
import { Reveal } from '@/components/motion/Reveal';

type FieldErrors = {
  workEmail?: string;
};

const fieldClassName =
  'h-10 w-full rounded-lg border border-border-hairline bg-surface-card px-3 text-[14px] text-text-primary placeholder:text-text-tertiary';

const labelClassName = 'text-[13px] font-medium tracking-[-0.01em] text-text-secondary';

export function DemoForm({ className }: { className?: string }) {
  const formId = useId();
  const workEmailId = `${formId}-work-email`;
  const companyId = `${formId}-company`;
  const roleId = `${formId}-role`;
  const workEmailErrorId = `${formId}-work-email-error`;

  const [workEmail, setWorkEmail] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors: FieldErrors = {};
    if (!workEmail.trim()) {
      nextErrors.workEmail = 'Work email is required.';
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <section
        aria-labelledby="demo-form-heading"
        className={[
          'border-t border-border-hairline bg-bg-base px-(--spacing-pad-x) py-10',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <Reveal>
          <div className="max-w-[1240px]">
            <h2 id="demo-form-heading" className="sr-only">
              Demo request
            </h2>
            <p
              role="status"
              className="text-[15px] leading-normal text-text-secondary"
            >
              This is a prototype. Nothing was sent. A real demo request will connect to
              StackGen when the site ships.
            </p>
          </div>
        </Reveal>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="demo-form-heading"
      className={[
        'border-t border-border-hairline bg-bg-base px-(--spacing-pad-x) py-10',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <Reveal>
        <div className="max-w-[1240px]">
          <h2 id="demo-form-heading" className="sr-only">
            Demo request
          </h2>
          <form
            noValidate
            onSubmit={handleSubmit}
            className="flex items-end gap-4 max-[767px]:flex-col max-[767px]:items-stretch"
          >
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <label htmlFor={workEmailId} className={labelClassName}>
                Work email
              </label>
              <input
                id={workEmailId}
                name="workEmail"
                type="email"
                autoComplete="email"
                value={workEmail}
                onChange={(event) => setWorkEmail(event.target.value)}
                aria-invalid={errors.workEmail ? true : undefined}
                aria-describedby={errors.workEmail ? workEmailErrorId : undefined}
                className={fieldClassName}
              />
              {errors.workEmail ? (
                <p
                  id={workEmailErrorId}
                  role="alert"
                  className="text-[13px] text-halt"
                >
                  {errors.workEmail}
                </p>
              ) : null}
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <label htmlFor={companyId} className={labelClassName}>
                Company
              </label>
              <input
                id={companyId}
                name="company"
                type="text"
                autoComplete="organization"
                value={company}
                onChange={(event) => setCompany(event.target.value)}
                className={fieldClassName}
              />
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <label htmlFor={roleId} className={labelClassName}>
                Role
              </label>
              <input
                id={roleId}
                name="role"
                type="text"
                autoComplete="organization-title"
                value={role}
                onChange={(event) => setRole(event.target.value)}
                className={fieldClassName}
              />
            </div>

            <button
              type="submit"
              className="inline-flex h-10 shrink-0 items-center justify-center rounded-lg bg-accent px-[14px] text-[13.5px] font-medium tracking-[-0.01em] text-text-primary max-[767px]:w-full"
            >
              Request demo
            </button>
          </form>
        </div>
      </Reveal>
    </section>
  );
}
