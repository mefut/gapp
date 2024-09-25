"use client"
import React from "react"
import Submit from "@/components/Submit"
import "@/styles/globals.css"

const HomePage: React.FC = () => {
  return (
    <div className="container">
      <h1>Welcome</h1>
      <p>In this test you will learn the sport that suits you the best</p>
      <Submit />
    </div>
  )
}

export default HomePage
