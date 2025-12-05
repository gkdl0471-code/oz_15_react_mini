import { Link, useNavigate } from "react-router-dom";
import "./NavBar.scss";

export function NavBar() {
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const value = e.target.value;

    if (!value.trim()) {
      navigate("/search");
      return;
    }
    navigate(`/search?movie=${encodeURIComponent(value)}`);
  };

  return (
    <div className="topbar">
      <header className="flex">
        <div className="flex h-20">
          <Link to="/">
            <h1 className="text-[50px] font-bold bg-linear-to-b from-red-600 to-indigo-600 bg-clip-text text-transparent">
              OGV
            </h1>
          </Link>
          <img className="w-[100px]" src="src/img/CGV로고.png" />
        </div>

        <div className="auth-buttons">
          <input
            type="text"
            placeholder="영화 제목 검색"
            onChange={handleSearchChange}
            className="search-input"
          />
          <button className="login-btn">로그인</button>
          <button className="signup-btn">회원가입</button>
        </div>
      </header>

      <nav className="navbox">
        <Link to="/">홈</Link>
        <Link to="/popular">인기</Link>
        <Link to="/latest">최신</Link>
        <Link to="/genre">장르별</Link>
      </nav>
    </div>
  );
}
