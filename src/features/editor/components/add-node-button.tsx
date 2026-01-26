"use client"

import { memo } from "react"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { NodeSelector } from "@/components/node-selector"
import { useState } from "react"

export const AddNodeButton = memo(()=>{

    const [selectorOpen, setSelectorOpen] = useState(false)

    return(
        <NodeSelector open={selectorOpen} onOpenChage={setSelectorOpen}>
            <Button
                onClick={()=>setSelectorOpen(true)}
                size="icon"
                variant="outline"
                className="bg-background"
            >
                <PlusIcon/>
            </Button>
        </NodeSelector>
    )
})

AddNodeButton.displayName = "AddNodeButton";