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
const loginSchema = z.object({
    email: z.email("이메일 주소를 입력해 주세요."),
    password: z.string().min(1, "비밀번호를 입력해주세요")
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm(){

    const router = useRouter()

    // 폼 초기화
    const form =useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    // 제출 핸들러
    const onSubmit = async (values: LoginFormValues) => {
        await authClient.signIn.email(
            {
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
                        돌아온 것을 환영합니다
                    </CardTitle>
                    <CardDescription>
                        계속하려면 로그인하세요
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
                                        <Button 
                                            type="submit"
                                            className="w-full"
                                            disabled={isPending}
                                        >
                                            로그인
                                        </Button>
                                    </div>
                                    <div className="text-center text-sm">
                                        계정이 없으신가요? {""}
                                        <Link 
                                            href="/signup"
                                            className="underline underline-offset-4"
                                        >
                                            가입하기
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