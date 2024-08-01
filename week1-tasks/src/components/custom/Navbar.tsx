import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { Menu } from "lucide-react";
import SearchBar from "@/components/custom/SearchBar";

export default function Navbar() {
  return (
    <header className="sticky top-0 flex h-16 items-center border-b bg-background px-4 sm:px-6">
      <nav className="hidden flex-col sm:flex sm:flex-row sm:items-center sm:gap-5 lg:gap-6 m-auto">
        <Link
          href="/"
          className="flex gap-2 text-lg font-semibold sm:text-base"
        >
          Quoter
        </Link>
      </nav>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 sm:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              Quoter
            </Link>
          </nav>
        </SheetContent>
      </Sheet>

      <div className="flex w-full items-center sm:w-auto m-auto sm:gap-2 lg:gap-4 max-sm:ml-3">
        <div className="w-full sm:w-auto">
          <div className="relative w-full sm:w-auto">
            <SearchBar />
          </div>
        </div>
      </div>
    </header>
  );
}
