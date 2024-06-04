import { useContext, useEffect, useState} from "react";
import IdeaCard from "../../components/ideaCard";
import Header from "../../components/header";

import "./profilePage.css";
import { Link } from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { StandbyContext } from "../../context/isStandbyContext";
import { useVerifyRole } from "../../utils/VerifyRole";
// import {ToastContainer} from 'react-toastify'

const ProfilePage = () => {
  const [limit,setLimit] = useState(10)
  const [offset,setOffSet] = useState(0)
  const [ideaCardUrl, setIdeaCardUrl] = useState('show-my?');
  const [key, setKey] = useState(Date.now())
  const [title, setTitle] = useState('Suas ideias de projetos');
  const [buttonText, setButtonText] = useState('Ideias a serem Aprovadas');
  const isAdmOn = useVerifyRole()


  const {selectPage,page } = useContext(StandbyContext)

  const authUser = useAuthUser();

  const handleButtonClick = () => {
      console.log(page)
    if (page !== 'standby') {
      setIdeaCardUrl('show-standby?');
      setButtonText('Ideias Aprovadas');
      setTitle('Ideias a serem Aprovadas');
      selectPage('standby')
      
    }
    if(page !== 'valid'){
      setIdeaCardUrl('show-my?');
      setButtonText('Ideias a serem Aprovadas');
      setTitle('Suas ideias de projetos');
      selectPage('valid')
    }
    setKey(Date.now()); 
  }

  useEffect(()=>{
    isAdmOn()
    selectPage('valid')
  },[])

  return (
    <div className="profile-page-div">
        {/* <ToastContainer closeOnClick="true" /> */}
      <Header to1="/" link1="Home" to2="/ideias" link2="Todas ideias"/>
      <div>
        <h1 className="title">Perfil</h1>
        <div className="profile-page">
          <div className="profile-info">
            <div className="infos">
              <h2 className="subtitle">{authUser.name}</h2>
              <div className="buttons-profile">
              <Link className="btn" to="/criar">Criar ideia</Link>
              <button className="btn" onClick={handleButtonClick}>{buttonText}</button>
              </div>
             
            </div>
          </div>
          <div className="profile-ideas">
            <div className="ideas">
            <span className="subtitle idea">{title}</span> 
              <IdeaCard
                url={ideaCardUrl}
                editable={true}
                cards={2}
                offsetInitial={offset}
                limitInitial={limit}
                key={key}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
