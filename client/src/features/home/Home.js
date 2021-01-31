import React from "react";
import { useSelector } from "react-redux";
import { selectTab } from "./homeSlice";
import { TabPanel } from "../../components/TabPanel"

function Home() {
  const tab = useSelector(selectTab);

  return (
    <div>
      <TabPanel value={tab} index={0}>
        מועדפים
      </TabPanel>
      <TabPanel value={tab} index={1}>
        היסטוריה
      </TabPanel>
      <TabPanel value={tab} index={2}>
        קטגוריות
      </TabPanel>
      <TabPanel value={tab} index={3}>
        FAQ
      </TabPanel>

    </div>
  );
}

export default Home;
