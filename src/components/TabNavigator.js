import React, { useState } from "react";
import { Tab, Tabs, Typography } from '@mui/material';
import Calculadora from "../pages/Tabs/Calculadora/Calculadora";
import Fretes from "../pages/Tabs/Fretes/Fretes";
import "./TabNavigator.css"
const TabNavigator = () => {
    const [tabSelect, setTabSelect] = useState(0);
    const handleTabChange = (event, newValue) => {
        setTabSelect(newValue)
    }
    return (
        <div className="tabContainer" >
            <Tabs value={tabSelect} onChange={handleTabChange} variant="fullWidth" className="tab-navigator"
                sx={{
                    "& button": { backgroundColor: '#0074E4', color: '#fff ' },
                    "& button:hover": { backgroundColor: '#0074E4', color: '#fff ' },
                    "& button:focus": { backgroundColor: '#0074E4', color: '#fff ' },
                    "& button:active": { backgroundColor: '#0074E4', color: '#fff ' }
                }}
                TabIndicatorProps={{
                    sx: {
                        backgroundColor: '#fff',
                        height: 4,
                        width: 100
                    }
                }}
                centered>
                <Tab label="Calculadora" style={{ color: '#fff' }} />
                <Tab label="Fretes" style={{ color: '#fff' }} />
            </Tabs>
            <Typography>
                {tabSelect === 0 && <Calculadora />}
                {tabSelect === 1 && <Fretes />}
            </Typography>
        </div>

    );
}

export default TabNavigator;