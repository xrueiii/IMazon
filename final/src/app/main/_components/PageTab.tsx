"use client";

import { Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRouter } from "next/navigation";

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
  },
});


export default function PageTab() {
    const [page, setPage] = useState(1);
    const router = useRouter();
    
    return(
        <div className="w-full border-l-2 border-r-2">
            <ThemeProvider theme={theme}>
                <Tabs value={page} indicatorColor="primary">
                    <Tab label="Buyer Mode" value={1} onClick={() => {router.push(`/main/shop`); setPage(1);}}/>
                    <Tab label="Seller Mode" value={2} onClick={() => {router.push(`/main/warehouse`); setPage(2);}}/>
                </Tabs>
            </ThemeProvider>
        </div>
    );
}