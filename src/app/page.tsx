"use client"

import { Button } from "@/components/ui/button";
import { LogoutButton } from "./logout";
import { useTRPC } from "@/trpc/client";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const Page = () =>{
 
  const trpc = useTRPC();
  const queryClient = useQueryClient()
  const {data} = useQuery(trpc.getWorkflows.queryOptions())

  const testAi = useMutation(trpc.testAi.mutationOptions({
    onSuccess : () => {
      toast.success("작업 성공")
    }
  }))

  const create = useMutation(trpc.createWorkflow.mutationOptions({
    onSuccess : () => {
      // queryClient.invalidateQueries(trpc.getWorkflows.queryOptions())
      toast.success("작업 성공")
    }
  }))
  
  
  return(
    <div className="min-h-screen min-w-screen flex items-center justify-center">
      로그인한 사용자만 접근 가능
      <div>
        {JSON.stringify(data, null, 2)}
      </div>
      <Button disabled={testAi.isPending} onClick={()=> testAi.mutate()}> Test Ai</Button>
      <Button disabled={create.isPending} onClick={()=>create.mutate()}>
        워크플로우 생성
      </Button>
      <LogoutButton/>
    </div>
  )
}

export default Page