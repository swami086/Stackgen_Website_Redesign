import Image from 'next/image';
import { MonoLabel } from '@/components/primitives/MonoLabel';
import { Reveal } from '@/components/motion/Reveal';
import type { SectionProps } from '@/lib/types';
import home from '@/content/home';

type IntegrationsContent = typeof home.integrations;

export const FEATURED_TOOL_LOGOS = [
  { name: 'AWS', file: '/logos/tools/aws.svg', width: 24, height: 24 },
  { name: 'Azure', file: '/logos/tools/azure.svg', width: 24, height: 24 },
  { name: 'Google Cloud', file: '/logos/tools/googlecloud.svg', width: 24, height: 24 },
  { name: 'Kubernetes', file: '/logos/tools/kubernetes.svg', width: 24, height: 24 },
  { name: 'Docker', file: '/logos/tools/docker.svg', width: 24, height: 24 },
  { name: 'Terraform', file: '/logos/tools/terraform.svg', width: 24, height: 24 },
  { name: 'Git', file: '/logos/tools/git.svg', width: 24, height: 24 },
  { name: 'SonarQube', file: '/logos/tools/sonarqube.svg', width: 24, height: 24 },
] as const;

export function Integrations({ content, className }: SectionProps<IntegrationsContent>) {
  return (
    <section
      aria-labelledby="integrations-heading"
      className={['bg-bg-base px-pad-x py-[120px]', className].filter(Boolean).join(' ')}
    >
      <Reveal>
        <div className="mx-auto flex max-w-[1240px] flex-col gap-12">
          <div className="flex max-w-[560px] flex-col gap-5">
            <MonoLabel>{content.label}</MonoLabel>
            <h2
              id="integrations-heading"
              className="text-[42px] font-medium leading-[1.12] tracking-[-0.03em] text-text-primary"
            >
              {content.heading}
            </h2>
          </div>

          <div className="border-t border-border-hairline">
            <ul className="grid grid-cols-8">
              {FEATURED_TOOL_LOGOS.map((logo) => (
                <li
                  key={logo.name}
                  className="flex h-[52px] items-center justify-center border-r border-b border-border-hairline last:border-r-0"
                >
                  <Image
                    src={logo.file}
                    alt={logo.name}
                    width={logo.width}
                    height={logo.height}
                    className="h-6 w-6 object-contain opacity-70"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
