import { fetchConductors } from "@/actions/fetch";
import { ConductorSelect } from "@/components/beethoven/ConductorSelect";


export async function ConductorComponent() {
  const conductors = await fetchConductors();
  if (!conductors.success) {
    return null;
  }
  return <ConductorSelect conductors={conductors} />;
}
