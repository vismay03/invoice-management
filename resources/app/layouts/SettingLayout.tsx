import SettingTab from "@/components/SettingTab";
import { ReactNode } from "react";
export default function SettingLayout({ children }: { children?: ReactNode }) {
    return (
        <>
           
            <SettingTab />
          

            <div className="border bg-white border-t-0 mb-10 py-10 border-gray-200 dark:border-gray-700">{children}</div>

        </>
    );
}
