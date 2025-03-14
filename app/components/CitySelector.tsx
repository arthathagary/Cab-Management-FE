"use client";

import { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandInput, CommandList, CommandItem } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";

export default function CitySelector({
  label,
  value,
  onValueChange,
  errorMessage,
}: {
  label: string;
  value: string;
  onValueChange: (val: string) => void;
  errorMessage?: string;
}) {
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Preload city areas of Colombo
    setCities(["Colombo 01 - Fort", "Colombo 02 - Slave Island", "Colombo 03 - Kollupitiya", "Colombo 04 - Bambalapitiya", "Colombo 05 - Havelock Town", "Colombo 06 - Wellawatta", "Colombo 07 - Cinnamon Gardens", "Colombo 08 - Borella", "Colombo 09 - Dematagoda", "Colombo 10 - Maradana", "Colombo 11 - Pettah", "Colombo 12 - Hulsdorf", "Colombo 13 - Kotahena", "Colombo 14 - Grandpass", "Colombo 15 - Mutwal", "Dehiwala", "Mount Lavinia", "Ratmalana"]);
  }, []);

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative w-full">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              className="pl-10"
              placeholder={label}
              value={value}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpen(true);
              }}
            />
          </div>
        </PopoverTrigger>
        {cities.length > 0 && (
          <PopoverContent className="w-full">
            <Command>
              <CommandInput placeholder="Search city area..." />
              <CommandList>
                {cities
                  .filter((city) => city.toLowerCase().includes(query.toLowerCase()))
                  .map((city, index) => (
                    <CommandItem
                      key={index}
                      onSelect={() => {
                        onValueChange(city);
                        setOpen(false);
                      }}
                    >
                      {city}
                    </CommandItem>
                  ))}
              </CommandList>
            </Command>
          </PopoverContent>
        )}
      </Popover>
      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
    </div>
  );
}
