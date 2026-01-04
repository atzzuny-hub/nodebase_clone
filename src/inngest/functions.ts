import prisma from "@/lib/db";
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world", retries: 5 },
  { event: "test/hello.world" },
  async ({ event, step }) => {

    // 비디오 가져오기 (외부 API / 스토리지)
    await step.sleep("비디오 가져오기", "1s");
    // 비디오 → 텍스트 변환 (무거운 연산)
    await step.sleep("비디오 → 텍스트 변환", "1s");
    // OpenAI로 전송해서 요약/분석
    await step.sleep("OpenAI로 전송해서 요약/분석", "1s");

    // return { message: `Hello ${event.data.email}!` };
    await step.run("create-workflow", () => {
        return prisma.workflow.create({
            data: {
                name: "workflow-from-inngest"
            }
        })
    })
  },
);
