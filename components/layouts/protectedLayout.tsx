import { FC, ReactNode } from "react";
import useAuthenticatedRoute from "../../lib/hooks/useAuthenticatedRoute";
import { ChildProps } from "../../lib/uiUtils/CustomTypes";

const ProtectedLayout: FC<ChildProps> = ({ children }) => {
    const isLoading = useAuthenticatedRoute()
    return <>
        {isLoading ? 'Loading...' : children}
    </>
}
export default ProtectedLayout