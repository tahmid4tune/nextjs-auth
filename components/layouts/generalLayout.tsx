import { FC, ReactNode } from "react";
import { ChildProps } from "../../lib/uiUtils/CustomTypes";

const GeneralLayout: FC<ChildProps> = ({ children }) => {
    return <>
        {children}
    </>
}
export default GeneralLayout