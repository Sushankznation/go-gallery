import { imageContainer } from "../App"
import { useContext } from "react"
import Image from "./Image"
export default function Images() {
  const { Data, isLoading } = useContext(imageContainer)
  return (
    <>
      <h1 className="text-center px-2 mt-6 text-2xl">Results : </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 my-10">
      {Data?.map((data,key)=> <Image key={key} data={data}/>) : }
      </div>

    </>
  )
}
