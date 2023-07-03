import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";


export default function Home() {

  const { data: session } = useSession();

  return (
    <Layout>
      <div className='test-blue-900 flex justify-between'> 
        <h2 className="text-blue-600 ">
          Hello, <span className="font-bold">{session?.user?.name}</span>
        </h2>
        <div className="flex bg-gray-300 gap-1 text-black">
          <img src={session?.user?.image} alt="image" className="w-6 h-6"/>
          <span className="px-2 ">
            {session?.user?.name}
          </span>
          
        </div>
      </div>
    </Layout>
    
  )
}
