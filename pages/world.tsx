// 'use client'
import { useState, useEffect } from "react";

const World = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        console.log("data", data, 123);
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return <div className="world">
    world{JSON.stringify(data)}22
  </div>;
};


export default World;