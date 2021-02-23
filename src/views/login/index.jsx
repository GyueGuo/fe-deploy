import React, { useCallback, useMemo, useState } from 'react';
// import axios from 'axios';
import '../register/index.less';

function Register() {
  const [username, setUsername] = useState('');
  const [pwd, setPwd] = useState('');
  const handleLogin = useCallback(() => {

  }, []);
  const handleUsernameInput = useCallback((e) => {
    setUsername(e.target.value.trim());
  }, []);
  const handlePwdInput = useCallback((e) => {
    setPwd(e.target.value.trim());
  }, []);
  const isBtnDisabled = useMemo(() => (
    !username || !pwd
  ), [username, pwd]);

  return (
    <div className="form-wrap">
      <div className="form-item">
        <input value={username} placeholder="请输入用户名" onInput={handleUsernameInput} />
      </div>
      <div className="form-item">
        <input value={pwd} placeholder="请输入密码" onInput={handlePwdInput} />
      </div>
      <button className="form-submit" type="button" disabled={isBtnDisabled} onClick={handleLogin}>登录</button>
      <div className="form-entries-wrap">
        <a href="/register">去注册</a>
      </div>
    </div>
  );
}

export default Register;
