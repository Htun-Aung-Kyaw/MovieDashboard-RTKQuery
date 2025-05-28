import type { Metadata } from "next";
import Welcome from "@/app/components/home/Welcome";

export default function IndexPage() {
  return <Welcome />;
}

export const metadata: Metadata = {
  title: "Movie App",
};