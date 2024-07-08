import SearchForm from "./SearchForm";
import SearchTags from "./SearchTags";
import "./Home.scss";
import CompaniesList from "./CompaniesList";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="home">
        <h1 className="home__title">1000+ IT Jobs For Developers</h1>

        <div className="home__search">
          <SearchForm />
          <SearchTags />
        </div>

        <CompaniesList />
      </div>
    </>
  )
}

export default Home;