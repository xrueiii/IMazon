"use client";

import { Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setPage(newValue);
      };
    return(
        <div className="w-full border-l-2 border-r-2">
            <ThemeProvider theme={theme}>
                <Tabs value={page} onChange={handleChange} indicatorColor="primary">
                    <Tab label="Product Page" value={1}/>
                    <Tab label="Setting Page" value={2}/>
                    <Tab label="What? Page" value={3}/>
                </Tabs>
            </ThemeProvider>
        </div>
    );
}