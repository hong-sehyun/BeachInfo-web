import React from 'react'
import { Link } from 'react-router-dom';

const MemberPage = ({token}) => {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const sub = payload.sub;
  return (
    <>
        <h2>로그인에 성공하였습니다</h2>
      <div>{sub}님 반갑습니다</div>
      <Link to="/">홈으로</Link>
    </>

  )
}

export default MemberPage