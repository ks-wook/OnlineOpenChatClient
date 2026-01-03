"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import "./auth.css";
import api from "@/lib/axios";

import { useGlobalModal } from '@/components/modal/GlobalModalProvider';

/**
 * 회원가입 페이지 컴포넌트
 * @returns 
 */
export default function Register() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const { openModal } = useGlobalModal();

  useEffect(() => {
    const authCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("auth="));
    if (authCookie) {
      router.push("/");
    }
  }, [router]);

  /**
   * 회원가입 버튼 클릭
   * @param event 
   */
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    // Add registration logic here

    console.log(username);
    console.log(password);

    const res = await api.post<CreateUserResponse>("/api/v1/auth/create-user", {
      loginId: username,
      password: password,
    });

    console.log("[handleSubmit] 회원가입 요청 API 호출 결과 : ", res.data);

    if(res.status !== 200 || res.data.result === "INTERNAL_SERVER_ERROR" ) {
      openModal({
        title: '요청 실패',
        content: (
          <div className="text-green-600">
            회원가입 요청에 실패하였습니다.
          </div>
        ),
      });
      return;
    }
    else if(res.data.result === "USER_ALREADY_EXISTS" ) {
      openModal({
        title: '요청 실패',
        content: (
          <div className="text-green-600">
            이미 존재하는 ID 입니다. 다른 ID를 사용해주세요.
          </div>
        ),
      });
      return;
    }
    else if(res.data.result === "USER_SAVED_FAILED" ) {
      openModal({
        title: '요청 실패',
        content: (
          <div className="text-green-600">
            유저정보 저장에 실패하였습니다. 잠시후 다시 시도해주세요.
          </div>
        ),
      });
      return;
    }
    
    // 회원가입 성공 시 login 화면으로 이동
    router.push("/login");
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2 className="auth-title">회원가입</h2>
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
            Sign Up
          </button>
        </form>
        <p className="auth-footer">
          이미 계정이 있으신가요? <a href="/login">로그인</a>
        </p>
      </div>
    </div>
  );
}
