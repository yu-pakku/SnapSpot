import { FiTag } from "react-icons/fi"

export function Tag({ name }: { name: string}) {
  return (
    <div className="inline-flex items-center gap-2 py-1 px-2 bg-castle-green500 text-white Body12Medium rounded-sm">
      <FiTag size={16} color="white" />
      <span>{name}</span>
    </div>
  )
}