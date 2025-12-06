"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import "./auth.css";
import api from "@/lib/axios";
import axios from "axios";

/**
 * 로그인 화면 UI 컴포넌트
 * @returns 
 */
export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

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
    const result = await api.post("/api/v1/auth/login", {
      name: username,
      password: password,
    });

    console.log('[Login] 로그인 API 요청 결과 : ', result.data);

    if (result.status !== 200) {
      alert("존재하지 않은 User 입니다.");
      return;
    }

    // 전달받은 accessToken 값을 쿠키값에 세팅
    document.cookie = `onlineOpenChatAuth=${result.data.token}; path=/`;
    
    router.push("/");
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2 className="auth-title">Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="auth-label">
              Username
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
          Don't have an account? <a href="/register">Sign Up</a>
        </p>
      </div>
    </div>
  );
}
