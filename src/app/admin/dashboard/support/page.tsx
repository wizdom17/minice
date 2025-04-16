import { fetchSupports } from "@/actions/supports";
import SupportTable from "@/components/admin/SupportTable";

export default async function SupportPage() {
  const { supports } = await fetchSupports();
  return (
    <div>
      <h1 className="text-lg font-semibold font-sans">Help & Support</h1>
      <div className="mt-5">
        <SupportTable data={supports} />
      </div>
    </div>
  );
}
