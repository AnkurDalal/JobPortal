import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import ApplyJob from "./Pages/ApplyJob";
import Applications from "./Pages/Applications";

import { AppContext } from "./Context/AppContext";
import RecruiterLogin from "./Components/RecruiterLogin";
import DashBoard from "./Pages/DashBoard";
import AddJob from "./Pages/AddJob";
import ManageJobs from "./Pages/ManageJobs";
import ViewApplication from "./Pages/ViewApplication";
import 'quill/dist/quill.snow.css';

const App = () => {
  const {showRecruiterLogin}=useContext(AppContext)

  return (
    <div>
    {showRecruiterLogin && <RecruiterLogin/>}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/apply-job/:id" element={<ApplyJob />}></Route>
        <Route path="/applications" element={<Applications />}></Route>
        <Route path="/dashboard" element={<DashBoard/>}>
          <Route path="add-job" element={<AddJob/>}/>
          <Route path="manage-jobs" element={<ManageJobs/>}/>
          <Route path="view-applications" element={<ViewApplication/>}/>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
