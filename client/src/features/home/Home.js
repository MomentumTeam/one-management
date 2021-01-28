import React from "react";
import { useSelector } from "react-redux";
import { selectTab } from "./homeSlice";
import {TabPanel} from "../../components/TabPanel"

function Home() {
  const tab = useSelector(selectTab);
  
  return (
    <div>
      <TabPanel value={tab} index={0}>
         Item One
       </TabPanel>
       <TabPanel value={tab} index={1}>
         Item Two
       </TabPanel>
       <TabPanel value={tab} index={2}>
         Item Three
       </TabPanel>
       <TabPanel value={tab} index={3}>
         Item Four
       </TabPanel>

    </div>
  );
}

export default Home;
