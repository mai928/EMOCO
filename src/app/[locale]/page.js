import MainComponets from "@/components/MainComponets";
import Navbar from "@/components/Menu/Navbar";
import Partner from "@/components/Partner";
import Image from "next/image";

export default function Home({params}) {
  return (
    <section className="">
        <MainComponets params={params}/>
    </section>
  );
}
