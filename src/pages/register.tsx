"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import "./auth.css";
import api from "@/lib/axios";

/**
 * 회원가입 페이지 컴포넌트
 * @returns 
 */
export default function Register() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

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

    const res = await api.post("/api/v1/auth/create-user", {
      name: username,
      password: password,
    });

    console.log("[handleSubmit] 회원가입 요청 API 호출 결과 : ", res.data);

    router.push("/login");
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2 className="auth-title">Sign Up</h2>
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
            Sign Up
          </button>
        </form>
        <p className="auth-footer">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}
