
import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import Services from "@/components/landing/Services";
import Testimonials from "@/components/landing/Testimonials";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Care.xyz - Reliable Baby & Elderly Care Services",
  description: "Find trusted caregivers for baby sitting, elderly care, and sick people support. Book easily online.",
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <About />
      <Services />
      <Testimonials />
    </main>
  );
}
