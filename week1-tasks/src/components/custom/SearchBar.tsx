"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Author = {
  value: string;
  label: string;
};

export default function SearchBar() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [authors, setAuthors] = React.useState<Author[]>([]);

  React.useEffect(() => {
    const getAuthors = async () => {
      const response = await fetch("/api/quotes/authors");
      const { AUTHORS } = await response.json();

      const formattedAuthors = AUTHORS.map((author: any) => ({
        value: author,
        label: author,
      }));
      setAuthors(formattedAuthors);
    };

    getAuthors();
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between max-sm:w-full"
        >
          {value
            ? authors.find((author) => author.value === value)?.label
            : "Search author..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search author..." />
          <CommandEmpty>No author found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {authors.map((author) => (
                <Link
                  key={author.value}
                  className="text-white"
                  href={`/authors/${author.value}`}
                >
                  <CommandItem
                    onSelect={() => {
                      setValue(author.value);
                      setOpen(false);
                      router.push(`/authors/${author.value}`);
                    }}
                    className="cursor-pointer"
                  >
                    {author.label}
                  </CommandItem>
                </Link>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
