import { Badge } from "@/components/ui/badge"
import { X, CheckIcon } from "lucide-react"


type Props = {
    row: any
}

const StatusBadge = ({ row }: Props) => {
    return (
        <div>{row.getValue("status") == 1 ?
            <Badge variant="enable" className="inline-flex items-center gap-x-1">
                <CheckIcon className='w-2.5 p-[1px] h-2.5 rounded-full bg-teal-800 text-white' />
                Enable</Badge>

            :
            <Badge variant="disable" className="inline-flex items-center gap-x-1">
                <X className="w-2.5 p-[1px] h-2.5 rounded-full bg-red-700 text-white" />

                Disable</Badge>
        }</div>
    )
}

export default StatusBadge