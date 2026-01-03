"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import "./auth.css";
import api from "@/lib/axios";
import axios from "axios";

import { useGlobalModal } from '@/components/modal/GlobalModalProvider';


/**
 * 로그인 화면 UI 컴포넌트
 * @returns 
 */
export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const { openModal } = useGlobalModal();

  useEffect(() => {

    // 쿠키값이 있는지 검증
    const authCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("onlineOpenChatAuth="));

    if (authCookie) { // 이미 로그인 되어있다면 홈화면으로 이동한다.
      router.push("/");
    }

  }, [router]);

  // 로그인 버튼 클릭
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    // 로그인 API 요청
    const result = await api.post<LoginResponse>("/api/v1/auth/login", {
      loginId: username,
      password: password,
    });

    console.log('[Login] 로그인 API 요청 결과 : ', result.data);

    if (result.status !== 200 || result.data.result === "INTERNAL_SERVER_ERROR") {
      openModal({
        title: '요청 실패',
        content: (
          <div className="text-green-600">
            로그인 요청에 실패하였습니다.
          </div>
        ),
      });
      return;
    }
    else if (result.data.result === "NOT_EXIST_USER") {
      openModal({
        title: '요청 실패',
        content: (
          <div className="text-green-600">
            존재하지 않는 유저입니다.
          </div>
        ),
      });
      return;
    }
    else if (result.data.result === "MIS_MATCH_PASSWORD") {
      openModal({
        title: '요청 실패',
        content: (
          <div className="text-green-600">
            비밀번호가 일치하지 않습니다.
          </div>
        ),
      });
      return;
    }

    // 전달받은 accessToken 값을 쿠키값에 세팅
    document.cookie = `onlineOpenChatAuth=${result.data.token}; path=/`;
    
    router.push("/");
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2 className="auth-title">Web Talk</h2>
        <h3 className="auth-label" style={{ textAlign: "center" }}>웹기반 메신저</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="auth-label">
              ID
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="auth-input"
            />
          </div>
          <div>
            <label htmlFor="password" className="auth-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="auth-input"
            />
          </div>
          <button type="submit" className="auth-button">
            Login
          </button>
        </form>
        <p className="auth-footer">
          처음이신가요? <a href="/register">회원가입</a>
        </p>
      </div>
    </div>
  );
}
