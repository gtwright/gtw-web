import Link from "next/link"

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">Hello!</h1>
      <Link href="/beethoven">Beethoven</Link>
    </div>
  )
}
