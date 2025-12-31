import { requireAuth } from "@/lib/auth-utils"
import {caller} from "@/trpc/server"
import { LogoutButton } from "./logout";

const Page = async() =>{
 
  await requireAuth();

  const data = await caller.getUsers();
  
  return(
    <div className="min-h-screen min-w-screen flex items-center justify-center">
      로그인한 사용자만 접근 가능
      <div>
        {JSON.stringify(data, null, 2)}
      </div>
      <LogoutButton/>
    </div>
  )
}

export default Page