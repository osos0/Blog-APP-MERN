import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";

export default function Dashboard() {
  const location = useLocation();

  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFormUrl = urlParams.get("tab");

    if (tabFormUrl) {
      setTab(tabFormUrl);
    }
  }, [location.search]);

  return (
    <>
      <div className="container DashboardFather">
        <div className="row rowCon">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <DashSidebar />
          </div>
          {tab === "profile" && (
            <div className="col-lg-6 col-md-6 col-sm-12">
              <DashProfile />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
