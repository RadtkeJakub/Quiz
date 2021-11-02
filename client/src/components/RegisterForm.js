import React from "react";
import Input from "./Input";
import { useForm } from "react-hook-form";

export default function RegisterForm() {
  const { register, handleSubmit, watch, errors } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const watcher = watch();

  return (
    <div className="form-container">
      <div className="form-tittle">Register</div>
      <form className="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          name="login"
          label="Login"
          reference={register({
            required: "login is required",
            minLength: { value: 4, message: "Min length is 4" },
            maxLength: { value: 16, message: "Max length of login is is 16" },
          })}
          err={errors.login}
          watcher={watcher.login}
        />
        <Input
          type="email"
          name="email"
          label="Email"
          reference={register({
            required: "email is required",
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
              message: "invalid email format",
            },
          })}
          err={errors.email}
          watcher={watcher.email}
        />
        <Input
          type="email"
          name="emailConfirm"
          label="Email confirm"
          reference={register({
            required: "email confirm is required",
            validate: (e) => e === watcher.email || "Emails does not match",
          })}
          err={errors.emailConfirm}
          watcher={watcher.emailConfirm}
        />
        <Input
          type="password"
          name="password"
          label="Password"
          reference={register({
            required: "password is required",
            minLength: { value: 8, message: "min length: 8" },
            maxLength: { value: 16, message: "max length: 16" },
            validate: {
              hasLowercase: (e) =>
                !/^(?=.*[a-z])$/.test(e) ||
                "Does not have lowercase characters",
              hasUppercase: (e) =>
                !/^(?=.*[A-Z])$/.test(e) ||
                "Does not have uppercase characters",
              hasNumber: (e) => {
                console.log(!/^(?=.*\d)$/.test(e));
                return !/^(?=.*\d)$/.test(e) || "Does not have number";
              },
            },
          })}
          err={errors.password}
          watcher={watcher.password}
        />
        <Input
          type="password"
          name="passwordConfirm"
          label="Password confirm"
          reference={register({
            required: "password confirm is required",
            validate: (e) =>
              e === watcher.password || "Passwords does not match",
          })}
          err={errors.passwordConfirm}
          watcher={watcher.passwordConfirm}
        />

        <button type="submit" className="button button--lift">
          Sign up
        </button>
      </form>
    </div>
  );
}
