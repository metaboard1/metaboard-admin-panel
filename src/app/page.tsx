'use client';
import { GridShape } from "@/components/global";
import { LoginForm } from "@/components/local/login";
import { ThemeProvider } from "@/context/ThemeContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


const Login = () => {

    const router = useRouter();

    useEffect(() => {
        checkUserLoginOrNot();
    }, []);

    const checkUserLoginOrNot = () => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        if (token && user) {
            router.push('/dashboard');
        }
    }

    return (<>

        <div className="relative p-6 bg-white z-1 dark:bg-gray-900 sm:p-0">
            <ThemeProvider>
                <div className="relative flex lg:flex-row w-full h-screen justify-center flex-col  dark:bg-gray-900 sm:p-0">
                    <div className="flex flex-col flex-1 lg:w-1/2 w-full">

                        <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
                            <div>
                                <div className="mb-5 sm:mb-8">
                                    <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
                                        Sign In
                                    </h1>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Enter your email and password to sign in!
                                    </p>
                                </div>
                                <LoginForm />
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-1/2 w-full h-full bg-brand-950 dark:bg-white/5 lg:grid items-center hidden">
                        <div className="relative items-center justify-center  flex z-1">
                            <GridShape />
                            <div className="flex flex-col items-center max-w-xs">
                                <h1 className="mb-2 font-semibold text-white text-title-sm dark:text-white/90 sm:text-title-md">
                                    MetaBoard
                                </h1>
                                {/* <p className="text-center text-gray-400 dark:text-white/60">
                                    Free and Open-Source Tailwind CSS Admin Dashboard Template
                                </p> */}
                            </div>
                        </div>
                    </div>
                    {/* <div className="fixed bottom-6 right-6 z-50 hidden sm:block">
                        <ThemeTogglerTwo />
                    </div> */}
                </div>
            </ThemeProvider>
        </div>
    </>)
}
export default Login;
