import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query";

// 03 장에서 explore tRPC server + client (prefech) 해줌

/** 
    Hook to fetch all workflows using suspense
**/

export const useSuspenseWorkflows = () => {
    const trpc = useTRPC();

    return useSuspenseQuery(trpc.workflows.getMany.queryOptions());
}