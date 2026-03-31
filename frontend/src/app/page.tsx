import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";

async function Page() {

  const session = await getSession();

  if(!session){
    redirect('/login')
  }

  return (
    <div>Page</div>
  )
}

export default Page