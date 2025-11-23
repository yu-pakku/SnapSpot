import Image from "next/image"

export default function Loading() {
  return (
    <main className="flex flex-col items-center justify-center gap-8">
      <Image 
        src="/loading.svg"
        alt="loading"
        width={196}
        height={196}
        className="animate-spin"
      />
      <h1 className="Heading24 text-castle-green200">
        Generating the route...
      </h1>
    </main>
  )
}