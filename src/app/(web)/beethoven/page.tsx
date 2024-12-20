import { fetchPerformances } from "@/actions/fetch"
export default async function Page(props: {
  searchParams?: Promise<{ conductor?: string }>;
}) {
  const searchParams = await props.searchParams;
  const conductor = searchParams?.conductor || "";
  const data = await fetchPerformances(conductor);
  console.log(data);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">The BSO and Beethoven Symphonies</h1>
    </div>
  )
}
