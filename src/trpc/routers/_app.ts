import { inngest } from '@/inngest/client';
import { baseProcedure, createTRPCRouter, protectedProcedure } from '../init';
import prisma from '@/lib/db';
import { TRPCError } from '@trpc/server';

export const appRouter = createTRPCRouter({

  // 앱 내부에서 사용하지말고 
  // testAi : protectedProcedure.mutation(async () => {
  //   const {text} = await generateText({
  //     model: google("gemini-2.5-flash"),
  //     prompt: "4인분 채식 라자냐 레시피를 작성해 줘"
  //   });

  //   return text;
  // }),

  // 보호된 절차를 기본으로 사용
  testAi : baseProcedure.mutation(async () => {

    throw new TRPCError({ code: "BAD_REQUEST", message: "문제가 발생했습니다."})

    
    await inngest.send({
      name: "execute/ai",
    })

    return {success: true, message: "작업 대기 중"}
  }),

  getWorkflows: protectedProcedure.query(({ctx}) => {    
      return prisma.workflow.findMany()
  }),
  createWorkflow : protectedProcedure.mutation(async()=>{

    // 일반적인 백그라운드 워크플로우 예시
    // // 1️⃣ 비디오 가져오기 (외부 API / 스토리지)
    // await new Promise((resolve) => setTimeout(resolve, 5_000))

    // // 2️⃣ 비디오 → 텍스트 변환 (무거운 연산)
    // await new Promise((resolve) => setTimeout(resolve, 5_000))

    // // 3️⃣ OpenAI로 전송해서 요약/분석
    // await new Promise((resolve) => setTimeout(resolve, 5_000))


    await inngest.send({
      name: "test/hello.world",
      data: {
        email:"zzuny@zzuny.com"
      }
    }); 

    // return prisma.workflow.create({
    //   data: {
    //     name : "test-workflow"
    //   }
    // })

    return {success: true, message: "작업 대기 중"}
  })
});
// export type definition of API
export type AppRouter = typeof appRouter;