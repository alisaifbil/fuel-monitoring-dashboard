import { useState } from "react";

export const useSidebarControls = () => {
    const [show, toggleSidebar] = useState(true);

    const open = () => toggleSidebar(true);
    const close = () => toggleSidebar(false);

    return {open , close, show};
}

export default useSidebarControls;
