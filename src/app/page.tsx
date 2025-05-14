import Image from "next/image";
import headerImage from "../assets/bg-desktop-dark.jpg";
import ThemeToggle from "@/components/theme-toggle";

export default function Home() {
  return (
    <main className="bg-background object-cover w-full h-screen flex flex-col">
      <header>
        <Image
          src={headerImage}
          alt="header"
          className="w-full h-[300px] object-cover"
        />
      </header>
      <div className="w-[540px]  h-[540px] mx-auto mt-[-230px]">
        <div className="flex justify-between">
          <h1 className="top-[300px] text-white text-5xl font-bold">TODO</h1>
          <ThemeToggle />
        </div>
      </div>
    </main>
  );
}
