import { useState, useEffect } from "react";
import IdeaCard from "../../components/ideaCard";
import Header from "../../components/header";

import "./profilePage.css";
import { Link } from "react-router-dom";
import { FetchApi } from "../../utils/Fetch";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

const ProfilePage = () => {
  const [countIdeas, setCount] = useState(0);
  const headers = useAuthHeader();
  const Token = headers.replace("x-acess-token", "");
  const authUser = useAuthUser();
  useEffect(() => {
    FetchApi("GET", `https://railway/get/,´${authUser}`, Token).then((data) => {
      setCount(data);
    });
  }, [Token, authUser]);
  return (
    <div>
      <Header to1="/" link1="Home" to2="/ideias" link2="Todas ideias"/>
      <div>
        <h1 className="title">Perfil</h1>
        <div className="profile-page">
          <div className="profile-info">
            <div className="infos">
              <h2 className="subtitle">{authUser}</h2>
              <p>Numero de ideias : {countIdeas} </p>
              <Link className="btn">Criar ideia</Link>
              <Link className="btn">Ideias a serem Aprovadas</Link>
            </div>
          </div>
          <div className="profile-ideas">
            <div className="ideas">
              <span className="subtitle idea">Suas ideias de projetos</span>
              <IdeaCard
                url={ `https://railway/posts/get/${authUser}`}
                editable={true}
                cards={2}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;