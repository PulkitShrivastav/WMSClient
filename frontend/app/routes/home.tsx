import LoginTerminal from "~/components/login";
import type { Route } from "./+types/home";
import AnalyticDashBoard from "~/components/wholesale_admin_dashboard";
import { useState } from "react";
import BillingTerminalWorkspace from "~/components/billing";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "WMS-Shield" },
  ];
}

type navTypes = 'Login' | 'Analytics' | 'Billing'

export default function Home() {

  const [nav, setNav] = useState<navTypes>('Login')
  const navs: Array<navTypes> = ['Login', 'Analytics', 'Billing']

  return (
    <>
      <div className="bg-[black] h-[50px] flex items-center gap-2 py-2 px-4 justify-end">
        {navs.map(v => <div
          className="bg-[white]/50 rounded-lg py-1 px-4 hover:bg-[white]/80 hover:text-[black]/70
          transition duration-300 cursor-pointer"
          onClick={() => { setNav(v) }}
        >{v}</div>)}
      </div>
      {nav === 'Analytics' ? <AnalyticDashBoard /> : null}
      {nav === 'Login' ? <LoginTerminal /> : null}
      {nav === 'Billing' ? <BillingTerminalWorkspace /> : null}

    </>
  )
}
