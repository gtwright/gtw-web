"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export function ConductorSelect({
  conductors,
}: {
  conductors: { success: boolean; data?: string[]; error?: string };
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleConductorChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("conductor", value);
    replace(`${pathname}?${params.toString()}`);
  };
  if (!conductors.success || !conductors.data) return null;
  const currentConductor = searchParams.get("conductor")?.toString();

  return (
    <Select
      onValueChange={handleConductorChange}
      defaultValue={currentConductor}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select a conductor" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem key="all" value="all">
          All Conductors
        </SelectItem>
        {conductors.data.map((conductor) => (
          <SelectItem key={conductor} value={conductor}>
            {conductor}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
