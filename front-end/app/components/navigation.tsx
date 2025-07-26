"use client";

import { useRouter, usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { Icon } from "./ui/icon";

export function Navigation() {
  const router = useRouter();
  const pathname = usePathname();

  const navigateTo = (path: string) => {
    router.push(path);
  };

  return (
    <nav className="flex space-x-2 mb-6">
      <Button
        variant={pathname === "/" || pathname === "/home" ? "default" : "outline"}
        size="sm"
        onClick={() => navigateTo("/home")}
        className="flex-1"
      >
        <Icon name="home" size="sm" className="mr-2" />
        Home
      </Button>
      <Button
        variant={pathname === "/features" ? "default" : "outline"}
        size="sm"
        onClick={() => navigateTo("/features")}
        className="flex-1"
      >
        <Icon name="star" size="sm" className="mr-2" />
        Features
      </Button>
    </nav>
  );
} 