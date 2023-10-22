import React from "react"
import { useForm, Controller } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { Button, Wrapper } from "../../components/general"
import { Input } from "../../components/inputs"
import { BackButton } from "../../components/navigation"
import { SettingsContent } from "../../components/settings"
import { PageRoutes } from "../../utils/constants"
import { comparePasswords } from "../../utils/functions"

interface PasswordValues {
  password: string
  confirm_password: string
}

export default function SetPassword() {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<PasswordValues>()
  const navigate = useNavigate()

  const password = watch("password")

  const onSubmit = handleSubmit((data) => {
    localStorage.setItem("data", JSON.stringify(data))
  })

  return (
    <Wrapper>
      <div className="px-4 pt-5 lg:pt-9 lg:px-[80px] flex flex-col space-y-[50px] lg:flex-row lg:space-y-20 lg:space-x-[77px]">
        <div className="flex flex-col space-y-[30px] lg:fixed flex-shrink-0 lg:max-w-[247px]">
          <h3 className="font-bold text-2xl text-white lg:text-[40px]">
            My Account
          </h3>
          <div className="flex flex-col space-y-[26.5px]">
            <BackButton
              onClick={() => navigate(PageRoutes.SECURITY_SETTINGS)}
              className="!bg-transparent !px-0"
            />
            <div className="flex flex-col space-y-[10px]">
              <h3 className="text-base font-semibold text-white">
                Set Password
              </h3>
              <p className="text-lightBlue leading-6 w-full">
                Protect your account with a password
              </p>
            </div>
          </div>
        </div>
        <SettingsContent title="Security settings">
          <form onSubmit={onSubmit} className="flex flex-col space-y-[30px]">
            <div className="flex flex-col space-y-[10px]">
              <p className="text-white font-medium">Enter password</p>
              <Controller
                control={control}
                name="password"
                rules={{
                  required: true,
                  validate: (v) => v?.trim()?.length > 0,
                }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="Please enter password"
                    type="password"
                    outerClassName="border border-white/[.5] rounded-lg"
                    className="placeholder:text-lightBlue !text-13 !text-white"
                    hasError={!!errors.password}
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
            </div>
            <div className="flex flex-col space-y-[10px]">
              <p className="text-white font-medium">Confirm password</p>
              <Controller
                control={control}
                name="confirm_password"
                rules={{
                  required: true,
                  validate: (v) => comparePasswords(v, password),
                }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    showErrorOnlyOnBlur
                    placeholder="Please confirm password"
                    type="password"
                    outerClassName="border border-white/[.5] rounded-lg"
                    className="placeholder:text-lightBlue !text-13 !text-white"
                    hasError={
                      !!errors.confirm_password ||
                      !comparePasswords(value, password)
                    }
                    onChange={onChange}
                    value={value}
                    errorMessage={value ? "Passwords do not match!" : ""}
                  />
                )}
              />
            </div>
            <Button text="Confirm" type="submit" className="mt-10 w-fit" />
          </form>
        </SettingsContent>
      </div>
    </Wrapper>
  )
}
