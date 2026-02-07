import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRegisterUserMutation, useLoginUserMutation } from "../api/authApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [loginInput, setLoginInput] = useState({
        email: "",
        password: "",
    });

    const [signupData, setSignupData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [registerUser, { data: registerData, error: registerError, isLoading: registerIsLoading, isSuccess: registerIsSuccess }] = useRegisterUserMutation();
    const [loginUser, { data: loginData, error: loginError, isLoading: loginIsLoading, isSuccess: loginIsSuccess }] = useLoginUserMutation();

    const navigate = useNavigate();

    const handleRegistration = async (type) => {
        const inputData = type === "signup" ? signupData : loginInput;
        const action = type === "signup" ? registerUser : loginUser;

        await action(inputData)
    };

    useEffect(() => {
        if (registerIsSuccess && registerData) {
            toast.success(registerData.message || "Signup successfull");
        }
        if (loginIsSuccess && loginData) {
            toast.success(loginData.message || "Login successfull");
            navigate('/');
        }
        if (registerError) {
            toast.success(registerError.data.message || "Signup Failed");
        }
        if (loginError) {
            toast.success(loginError.data.message || "Login Failed");
        }

    }, [loginIsLoading, registerIsLoading, loginInput, registerData, loginError, registerError]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold">
                        Welcome Back 👋
                    </CardTitle>
                    <CardDescription>
                        Login or create an account to continue
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <Tabs defaultValue="login" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="login">Login</TabsTrigger>
                            <TabsTrigger value="signup">Sign Up</TabsTrigger>
                        </TabsList>

                        <TabsContent value="login">
                            <form className="space-y-4 mt-4">
                                <div className="space-y-2">
                                    <Label>Email</Label>
                                    <Input
                                        type="email"
                                        placeholder="john@example.com"
                                        value={loginInput.email}
                                        onChange={(e) =>
                                            setLoginInput({ ...loginInput, email: e.target.value })
                                        }
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Password</Label>
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        value={loginInput.password}
                                        onChange={(e) =>
                                            setLoginInput({ ...loginInput, password: e.target.value })
                                        }
                                    />
                                </div>

                                <Button type="button" disabled={loginIsLoading} onClick={() => handleRegistration("login")} className="w-full">
                                    {
                                        loginIsLoading ? (
                                            <>
                                                <Loader className="mr-2h-4 w-4 animate-appin" />Please wait
                                            </>
                                        ) : "Login"
                                    }
                                </Button>
                            </form>
                        </TabsContent>

                        <TabsContent value="signup">
                            <form className="space-y-4 mt-4">
                                <div className="space-y-2">
                                    <Label>Full Name</Label>
                                    <Input
                                        type="text"
                                        placeholder="John Doe"
                                        value={signupData.name}
                                        onChange={(e) =>
                                            setSignupData({ ...signupData, name: e.target.value })
                                        }
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Email</Label>
                                    <Input
                                        type="email"
                                        placeholder="john@example.com"
                                        value={signupData.email}
                                        onChange={(e) =>
                                            setSignupData({ ...signupData, email: e.target.value })
                                        }
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Password</Label>
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        value={signupData.password}
                                        onChange={(e) =>
                                            setSignupData({
                                                ...signupData,
                                                password: e.target.value,
                                            })
                                        }
                                    />
                                </div>

                                <Button type="button" disabled={registerIsLoading} onClick={() => handleRegistration("signup")} className="w-full">

                                    {
                                        registerIsLoading ? (
                                            <>
                                                <Loader className="mr-2h-4 w-4 animate-appin" />Please wait
                                            </>
                                        ) : "signup"

                                    }
                                </Button>
                            </form>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div >
    );
};

export default Login;
