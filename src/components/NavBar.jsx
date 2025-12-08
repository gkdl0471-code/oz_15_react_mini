import { Link, useNavigate } from "react-router-dom";
import "./NavBar.scss";
import { useState, useMemo, useCallback } from "react";

export function NavBar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const debouncedSearch = useMemo(() =>
      debounce( keyword => {
        const trimmed = keyword.trim();

        if (!trimmed) {
          navigate("/");
          return;
        }

        navigate(`/search?movie=${encodeURIComponent(trimmed)}`);
      }, 200),
    [navigate]
  );

  const handleChangeDebounced = useCallback(
    (event) => {
      const value = event.target.value;
      setQuery(value);          // 입력값 상태로 저장
      debouncedSearch(value);   // 디바운스된 검색 실행
    },
    [debouncedSearch]
  );

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
          <nav className="navbox">
            <Link to="/">홈</Link>
            <Link to="/genre">장르별</Link>
          </nav>
        </div>

        <div className="auth-buttons">
          <input
            type="text"
            placeholder="영화 제목 검색"
            value={query}
            onChange={handleChangeDebounced}
            className="search-input"
          />
          <button className="signup-btn">로그인</button>
        </div>
      </header>

    </div>
  );
}
