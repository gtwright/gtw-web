import { fetchPerformances } from "@/actions/fetch"
export default async function Page() {
  const data = await fetchPerformances("all");
  console.log(data);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">The BSO and Beethoven Symphonies</h1>
    </div>
  )
}
