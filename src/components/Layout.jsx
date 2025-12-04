import { Outlet, Link } from 'react-router-dom';
import './Layout.scss';

export function Layout() {
  return (
    <>
      <div className="topbar">
        <header className='flex'>
          <div className='flex h-20'> 
            <Link to="/">
              <h1 
                className='text-[50px] font-bold bg-linear-to-b from-red-600 to-indigo-600 bg-clip-text text-transparent'
              >
                OGV
              </h1>
            </Link>
            <img className='w-[100px]' src='src/img/CGV로고.png'/>
          </div>
          <div className="auth-buttons">
            <button className="login-btn">로그인</button>
            <button className="signup-btn">회원가입</button>
          </div>
        </header>

        <nav className="navbox">
          <Link to="/">메인</Link>
          <Link to="/favorite">즐겨찾기</Link>
          <Link to="/detail">자세히보기</Link>
          <Link to="/search">검색</Link>
        </nav>
      </div>

      <main>
        <Outlet />
      </main>
    </>
  );
}
