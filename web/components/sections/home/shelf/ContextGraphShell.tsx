"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { SectionShell } from "@/components/primitives/SectionShell";
import { InteractiveBezel } from "@/components/motion/InteractiveBezel";
import { LogoMarquee } from "@/components/motion/LogoMarquee";
import { SlidePattern } from "@/components/motion/SlidePattern";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerText } from "@/components/motion/StaggerText";
import { SPRING_EASE } from "@/components/motion/easing";
import { homeShelf } from "@/content/home-shelf";
import { AidenOsStackDiagram } from "./AidenOsStackDiagram";
import { DoubleBezel } from "./DoubleBezel";

export function ContextGraphShell() {
  const {
    eyebrow,
    heading,
    body1,
    body2,
    stack,
    entityResolutionImage,
    integrations,
    footer,
  } = homeShelf.contextGraph;

  return (
    <SectionShell className="bg-bg py-[48px]">
      <Reveal className="mx-auto max-w-[1248px]">
        <InteractiveBezel
          className="mx-auto max-w-[1248px]"
          innerClassName="bg-surface p-12"
        >
          <div className="flex flex-col gap-12">
            <header className="flex flex-col items-center gap-4 text-center">
              <motion.span
                className="rounded-full bg-surface px-3 py-1.5 font-mono text-[11px] font-medium tracking-[2px] text-text-tertiary outline outline-1 -outline-offset-1 outline-border"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, ease: SPRING_EASE }}
              >
                {eyebrow}
              </motion.span>
              <h2 className="max-w-[900px] text-[40px] font-bold leading-[44px] tracking-[-1px] text-text-primary">
                <StaggerText text={heading} as="span" delay={0.08} />
              </h2>
              <Reveal index={1}>
                <p className="max-w-[720px] text-lg leading-[27px] text-text-secondary">
                  {body1}
                </p>
              </Reveal>
              <Reveal index={2}>
                <p className="max-w-[720px] text-base leading-6 text-text-tertiary">
                  {body2}
                </p>
              </Reveal>
            </header>

            <Reveal index={3}>
              <AidenOsStackDiagram stack={stack} />
            </Reveal>

            <Reveal index={4}>
              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.55, ease: SPRING_EASE }}
              >
                <Image
                  src={entityResolutionImage}
                  alt="Entity resolution diagram connecting sources to checkout-api"
                  width={1248}
                  height={500}
                  className="h-auto w-full"
                />
              </motion.div>
            </Reveal>

            <Reveal index={5}>
              <section
                className="flex flex-col items-center gap-8 py-12"
                aria-labelledby="shelf-integrations-heading"
              >
                <h3
                  id="shelf-integrations-heading"
                  className="text-2xl text-text-primary"
                >
                  {integrations.heading}
                </h3>
                <DoubleBezel className="w-full">
                  <LogoMarquee
                    label="Integration connectors"
                    speed={34}
                    gap={12}
                    items={integrations.items.map((item) => ({
                      id: item.name,
                      mark: (
                        <span
                          className="group relative flex h-[52px] items-center gap-2 overflow-hidden rounded-[14px] px-4 outline outline-1 -outline-offset-1 outline-border transition-[outline-color] duration-500 hover:outline-accent/35"
                        >
                          <SlidePattern />
                          <Image
                            src={item.icon}
                            alt=""
                            width={16}
                            height={16}
                            className="relative z-[1] object-contain"
                          />
                          <span className="relative z-[1] text-sm text-text-primary">
                            {item.name}
                          </span>
                        </span>
                      ),
                    }))}
                  />
                </DoubleBezel>
              </section>
            </Reveal>

            <footer className="border-t border-border pt-6">
              <p className="font-mono text-[11px] text-text-tertiary">
                {footer}
              </p>
            </footer>
          </div>
        </InteractiveBezel>
      </Reveal>
    </SectionShell>
  );
}
