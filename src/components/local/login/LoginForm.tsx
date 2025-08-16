'use client';

import React, { type FC } from "react";
import { Button, Input, Label } from "@/components/ui";
import { $crud } from "@/factory/crudFactory";
import validationSchema from "@/schema";
import { useFormik } from "formik";
import { useRouter } from 'next/navigation';

const LoginForm: FC = ({

}) => {

    const router = useRouter();

    const { handleSubmit, handleChange, values, errors, touched } = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validateOnChange: true,
        validateOnBlur: true,
        // enableReinitialize: true,
        validationSchema: validationSchema('login'),
        onSubmit: async (values) => {
            handleLogin(values);
        }
    });

    const handleLogin = async (values: object) => {
        try {
            const { data: { token, user } } = await $crud.post('admin/login', values);
            if (token) {
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                router.push('/dashboard');
            }
        } catch (e) {
            console.error(e);
        }
    }
    return (<>
        <form noValidate onSubmit={handleSubmit}>
            <div className="space-y-6">
                <div>
                    <Label>
                        Email <span className="text-error-500">*</span>{" "}
                    </Label>
                    <Input
                        placeholder="info@gmail.com"
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        error={Boolean(errors.email && touched.email)}
                        hint={touched.email ? errors.email : ''}
                    />
                </div>
                <div>
                    <Label>
                        Password <span className="text-error-500">*</span>{" "}
                    </Label>
                    <div className="relative">
                        <Input
                            type={"password"}
                            placeholder="Enter your password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            error={Boolean(errors.password && touched.password)}
                            hint={touched.password ? errors.password : ''}
                        />
                    </div>
                </div>
                <div>
                    <Button className="w-full" size="sm" type='submit'>
                        Sign in
                    </Button>
                </div>
            </div>
        </form>
    </>);
}
export default LoginForm;
