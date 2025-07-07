import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/kit/tabs.tsx";
import { ImagesIcon, ListIcon } from "lucide-react";

export type ViewMode = "list" | "cards";
export function ViewModeToggle({
  value,
  onChange,
}: {
  value: ViewMode;
  onChange: (value: ViewMode) => void;
}) {
  return (
    <Tabs defaultValue={value} onValueChange={onChange}>
      <TabsList>
        <TabsTrigger value="list">
          <ListIcon />
        </TabsTrigger>
        <TabsTrigger value="cards">
          <ImagesIcon />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
