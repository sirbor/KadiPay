import React from "react"
import { useNavigate } from "react-router-dom"
import { Button, Wrapper } from "../../components/general"
import { ReactComponent as Svg404 } from "../../assets/images/404.svg"
import { PageRoutes } from "../../utils/constants"

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <Wrapper>
      <div className="mt-[100px] flex justify-center">
        <div className="flex flex-col justify-center items-center space-y-5 md:space-y-[46px] mb-[266px]">
          <Svg404 className="w-[80vw] md:w-auto" />
          <p className="font-medium text-white text-xl md:text-[40px] text-center uppercase">
            ERROR - PAGE NOT FOUND!
          </p>
          <Button
            text="Go Back"
            bordered
            background="transparent"
            textColor="white"
            onClick={() => navigate(PageRoutes.HOME)}
          />
        </div>
      </div>
    </Wrapper>
  )
}
