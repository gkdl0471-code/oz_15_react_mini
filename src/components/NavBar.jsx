import { Link, useNavigate } from "react-router-dom";
import "./NavBar.scss";
import { useState, useMemo, useCallback } from "react";

export function NavBar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");                           // 검색어 입력값을 상태로 관리 (초기값은 빈 문자열)

  const debounce = (func, delay) => {                               // 특정 함수를 delay만큼 디바운스 처리해주는 유틸 함수 정의
    let timer;                                                      // 타이머 id를 저장할 변수 (클로저로 유지됨)
    return (...args) => {                                           // 나중에 실제로 호출될 디바운스된 함수 반환 (가변 인자 사용)
      clearTimeout(timer);                                          // 이전에 설정된 타이머가 있으면 취소해서 연속 호출을 막음
      timer = setTimeout(() => func(...args), delay);               // delayms 후에 func를 실제 인자로 실행하는 타이머 설정
    };
  };

  const debouncedSearch = useMemo(() =>                             // debounce로 감싼 검색 함수를 메모이제이션해서 재생성 최소화
      debounce( keyword => {                                        // keyword를 받아 처리하는 콜백을 디바운스 처리
        const trimmed = keyword.trim();                             // 앞뒤 공백을 제거한 검색어를 trimmed 변수에 저장

        if (!trimmed) {                                             // 검색어가 비어 있거나 공백만 있을 경우 홈으로 이동
          navigate("/");
          return;
        }

        navigate(`/search?movie=${encodeURIComponent(trimmed)}`);   // 검색어를 인코딩하여 /search 페이지의 쿼리 파라미터로 이동
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
