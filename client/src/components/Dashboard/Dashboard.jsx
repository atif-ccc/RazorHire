import React, { useState, useEffect } from "react";
import style from "./Dashboard.module.scss";
import clsx from "clsx";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [resumes, setResumes] = useState([]);
  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await axios.get("resume/myProjects");
        setResumes(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching templates:", error);
      }
    };
    fetchResumes();
  }, []);
  let navigate = useNavigate();
  return (
    <div className={clsx(style.wrapper, "withPadding")}>
      <h2>Dashboard Page</h2>
      <div className={clsx(style.templates, "withPadding")}>
        <a className={clsx(style.template, "withPadding")} href={"/resume/new"}>
          Create new Resume
        </a>
        {resumes?.map((resume) => (
          <div
            className={clsx(style.template, "withPadding")}
            onClick={() => {
              navigate(`/resume/${resume?.Content}`);
            }}
          >
            <img height="150" width="auto" src={resume.ImageLink} />
            <p>{resume?.Title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}