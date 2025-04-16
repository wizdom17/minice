import { PackageOpen } from "lucide-react";

export default function EmptyList() {
  return (
    <div className="flex flex-col mt-5 items-center justify-center">
      <PackageOpen size={50} className="text-muted-400 mb-2" />
      <span className="text-muted-400">No records yet.</span>
    </div>
  );
}
