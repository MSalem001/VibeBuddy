"use client"

import { Button } from "../components/ui/button";
import {Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle} from "../components/ui/card"
import { useState,useEffect } from "react";
export default function Home() {
  interface User {
  name: string;
  age: number;
  is_adult: boolean;
}
  const [data ,setData] = useState("");
  const [loading ,setISLoading] = useState(true);
  const [user,setUser] =  useState<User | null>(null);;
  useEffect(()=>{
    async function fetchData(){
      setISLoading(true);
      try{
        const response = await fetch("http://127.0.0.1:8000/");
        if(!response.ok){
          throw new Error(`Error! status: ${response.status}`);
        }
        const data = await response.json();
        setData(data.msg);
      }catch(error){
        console.error(error);
      }finally{
        setISLoading(false);
      }
    }
    fetchData();
  },[])

  const getUser = async () => {
     try{
      const url = new URL("http://127.0.0.1:8000/")
      const response = await fetch(url+ "user",{
        method:"post",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          name:"Mustafa",
          age:30,
          is_adult:true
        }),
      });
      if(!response.ok){
        throw new Error(`Error! status: ${response.status}`);
      }
      const user = await response.json();
      setUser(user);
     }
      catch(error){
        console.error(error);
        console.log("Error fetching user data:", error);
      }finally{
        setISLoading(false);
      }
    } 
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
       {loading ? (
        <p>Loading...</p>
       ):(
        <p className="text-lg font-semibold bold">{data ? data : "No data available"}</p>
       )}
        {/* <CardDemo /> */}
        <Button onClick={getUser} className="mt-8">Fetch User</Button>
        {user && (
          <div className="mt-8 flex flex-col items-center justify-center">
            <Card className="w-96">
              <CardHeader>
                <CardTitle>User Information</CardTitle>
                <CardDescription>Details of the fetched user</CardDescription>
              </CardHeader>
              <CardContent>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Age:</strong> {user.age}</p>
                <p><strong>Is Adult:</strong> {user.is_adult ? "Yes" : "No"}</p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => setUser(null)}>Clear User</Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
