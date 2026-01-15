"use client"

import {zodResolver} from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {toast} from "sonner"
import {z} from "zod"
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import{
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import {authClient} from "@/lib/auth-client"
import {cn} from "@/lib/utils"

// 유효성 검사 스키마
const registerSchema = z.object({
    email: z.email("이메일 주소를 입력해 주세요."),
    password: z.string().min(1, "비밀번호를 입력해주세요"),
    confirmPassword: z.string(),
})
.refine((data) => data.password === data.confirmPassword,{
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"]
})

type RegisterFormValues = z.infer<typeof registerSchema>

export function RegisterForm(){

    const router = useRouter()

    // 폼 초기화
    const form =useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: ""
        }
    })

    // 제출 핸들러
    const onSubmit = async (values: RegisterFormValues) => {
        // console.log(values);   
        await authClient.signUp.email(
            {
                name: values.email,
                email: values.email,
                password: values.password,
                callbackURL: "/"
            },
            {
                onSuccess: () => {
                    router.push("/")
                },
                onError : (ctx) => {
                    toast.error(ctx.error.message)
                }
            }
        )     
    }

    const isPending = form.formState.isSubmitting;

    return(
        <div className="flex flex-col gap-6">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle>
                        다시 오신 것을 환영합니다.
                    </CardTitle>
                    <CardDescription>
                        시작하려면 계정을 만드세요.
                    </CardDescription>

                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <div className="grid gap-6">
                                    <div className="flex flex-col gap-4">
                                        <Button
                                            variant="outline"
                                            className="w-full"
                                            type="button"
                                            disabled={isPending}
                                        >
                                            <Image src="/logos/github.svg" width={20} height={20} alt={"GitHub"}/>
                                            GitHub로 진행하기
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="w-full"
                                            type="button"
                                            disabled={isPending}
                                        >
                                            <Image src="/logos/google.svg" width={20} height={20} alt={"Google"}/>
                                            Google로 진행하기
                                        </Button>
                                    </div>
                                    <div className="grid gap-6">
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>이메일</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="email"
                                                            placeholder="test@test.com"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="password"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>비밀번호</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="password"
                                                            placeholder="*****"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="confirmPassword"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>비밀번호 확인</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="password"
                                                            placeholder="*****"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                        <Button 
                                            type="submit"
                                            className="w-full"
                                            disabled={isPending}
                                        >
                                            회원가입
                                        </Button>
                                    </div>
                                    <div className="text-center text-sm">
                                        이미 계정이 있으신가요?{" "}
                                        <Link 
                                            href="/login"
                                            className="underline underline-offset-4"
                                        >
                                            로그인하기
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </CardHeader>
            </Card>
        </div>
    )
}