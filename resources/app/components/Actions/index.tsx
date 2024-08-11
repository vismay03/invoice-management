import { Button } from '@/components/ui/button'
import { Edit, Trash2Icon } from 'lucide-react'
import React, { memo } from 'react'
import { Link } from 'react-router-dom'

type Props = {
    feature: string
    row: any
    dataTableRef: any
}

const Actions = memo(({ feature, row, dataTableRef }: Props) => {
    return (
        <div className='flex gap-2'>
            <Button size={"icon"} variant={"destructive"} onClick={() => dataTableRef.current?.confirmDeleteRow(row.getValue("id"))}>
                <Trash2Icon className=" h-4 w-h-4" />
            </Button>
            <Button size={"icon"} asChild>
                <Link to={`/${feature}/edit/${row.getValue("id")}`} >
                    <Edit className=" h-4 w-h-4" />
                </Link>
            </Button>
        </div>
    )
})

export default Actions