import React from "react";
import "./sideBar.css";
import { useNavigate } from "react-router-dom";

const SideBar = () => {

  const navigate = useNavigate()
  
  const hadleHomePageButton=()=>{
    navigate('/home')
  }
  const hadleProfilePageButton=()=>{
    navigate('/profile')
  }
  const handleFollowerButton=()=>{
    navigate('/followers')
  }

  return (
    <div className="sideBar">
      <div className="navs" onClick={()=>hadleHomePageButton()}>Home</div>
      {/* <div className="navs" onClick={()=>hadleProfilePageButton()}>Profile</div>
      <div className="navs" onClick={()=>handleFollowerButton()}>FollowersFollowing</div> */}

    </div>
  );
};

export default SideBar;
