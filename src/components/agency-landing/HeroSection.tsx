"use client";

import { motion } from "framer-motion";
import { hero } from "@/data/content";
import CinematicHeading from "@/components/layout/CinematicHeading";
import HeroBackdrop from "@/components/layout/HeroBackdrop";
import HeroWordmark from "@/components/layout/HeroWordmark";
import CtaGroup from "@/components/layout/CtaGroup";
import { RISE, STAGGER, enter } from "@/lib/motion";
export default function HeroSection() {
  return (
    <>
      <section className="flex max-w-screen overflow-x-hidden flex-col items-center justify-center p-2">
        <div className="h-[98vh] w-full md:h-screen">
          <div className="relative m-0 h-[98vh] w-full overflow-hidden rounded-3xl bg-black text-white ">
            <HeroBackdrop />

            <div className="relative mt-12 z-10 mx-auto flex h-full w-full max-w-[1440px] flex-col px-4 sm:px-4 lg:px-4">
              <div className="flex flex-1 flex-col items-center justify-center text-center">
              
                <CinematicHeading text={hero.headline} dark />
                <motion.p
                  initial={{ opacity: 0, y: RISE.sm }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={enter(STAGGER * 4)}
                  className="mx-auto mt-8 max-w-2xl text-base leading-8 text-white/70 sm:text-lg lg:text-xl"
                >
{hero.sub}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: RISE.sm }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={enter(STAGGER * 6)}
                  className="relative top-[10rem] flex justify-center"
                >
                  <CtaGroup />
                </motion.div>
              </div>

              <HeroWordmark />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
