"use client";

import Link from "next/link";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useState, useEffect } from "react";
export default function Home() {
  interface User {
    id: string;
    name: string;
    age: number;
    is_adult: boolean;
  }
  const [data, setData] = useState("");
  const [datauser, setDataUser] = useState<User[]>([]);
  const [loading, setISLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    async function fetchData() {
      setISLoading(true);
      try {
        const response = await fetch("http://127.0.0.1:8000/");
        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }
        const data = await response.json();
        setData(data.msg);
      } catch (error) {
        console.error(error);
      } finally {
        setISLoading(false);
      }
    }
    fetchData();
  }, []);
  useEffect(() => {
    async function fetchDataUser() {
      setISLoading(true);
      try {
        const res = await fetch("http://127.0.0.1:8000/user");
        if (!res.ok) {
          throw new Error(`Error! status:${res.status}`);
        }
        const userData = await res.json();
        const usersList = Array.isArray(userData)
          ? userData
          : userData.users || [];
        setDataUser(usersList);
      } catch (error) {
        console.error(error);
        return { massage: "Error fetching user data", error };
      } finally {
        setISLoading(false);
      }
    }
    fetchDataUser();
  }, []);

  const getUser = async () => {
    try {
      const url = new URL("http://127.0.0.1:8000/");
      const response = await fetch(url + "user", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Mohamed",
          age: 19,
          is_adult: false,
        }),
      });
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      const user = await response.json();
      setUser(user);
    } catch (error) {
      console.error(error);
      console.log("Error fetching user data:", error);
    } finally {
      setISLoading(false);
    }
  };

  // const getUserById = async (id: string) => {
  //   if (typeof id !== "string" || !id.trim()) {
  //     console.error("Invalid ID passed:", id);
  //     return;
  //   }
  //   setISLoading(true);
  //   try {
  //     const res = await fetch(`http://127.0.0.1:8000/user/${id}`);
  //     if (!res.ok) {
  //       throw Error(`Error! status: ${res.status}`);
  //     }
  //     const userbyid: User = await res.json();
  //     setUser(userbyid);
  //   } catch (error) {
  //     console.error(error);
  //     console.log("Error fetching user By id:", error);
  //   }
  //   setISLoading(false);
  // };
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <p className="text-lg font-semibold bold">
            {data ? data : "No data available"}
          </p>
        )}
        {/* <CardDemo /> */}
        <Card className="w-96 mt-8">
          <CardHeader>
            <CardTitle>Fetched User Data</CardTitle>
            <CardDescription>Details of the fetched user</CardDescription>
          </CardHeader>
          <CardContent>
            {datauser && datauser.length > 0 ? (
              datauser.map((u, index) => (
                <div key={index} className="mt-4 border-b pb-2 last:border-b-0">
                  <p>
                    <strong>Name:</strong> {u.name}
                  </p>
                  <p>
                    <strong>Age:</strong> {u.age}
                  </p>
                  <p>
                    <strong>Is Adult:</strong> {u.is_adult ? "Yes" : "No"}
                  </p>
                </div>
              ))
            ) : (
              <p>No user data available</p>
            )}
          </CardContent>
        </Card>
        <Button onClick={getUser} className="mt-8">
          Fetch User
        </Button>
        {user && (
          <div className="mt-8 flex flex-col items-center justify-center">
            <Card className="w-96">
              <CardHeader>
                <CardTitle>User Information</CardTitle>
                <CardDescription>Details of the fetched user</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  <strong>Name:</strong> {user.name}
                </p>
                <p>
                  <strong>Age:</strong> {user.age}
                </p>
                <p>
                  <strong>Is Adult:</strong> {user.is_adult ? "Yes" : "No"}
                </p>
              </CardContent>
              <CardFooter>
                <Button onClick={() => setUser(null)}>Clear User</Button>
              </CardFooter>
            </Card>
            {/* <Button onClick={() => getUserById("1")} className="mt-8">
          Fetch User By ID
        </Button>
            <Card className="w-96 mt-4">
              <CardHeader>
                <CardTitle>Get User by ID</CardTitle>
                <CardDescription>Fetch user details by ID</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() =>  getUserById ("0f580d59-b8d4-498c-81f0-c8b0b9ab4d18")}>
                  Fetch User with ID 1
                </Button>
                {datauser.map((u, index) => (
                  <div
                    key={u.id ?? index}
                    className="mt-4 border-b pb-2 flex justify-between items-center"
                  >
                    <div>
                      <p>
                        <strong>Name:</strong> {u.name}
                      </p>
                      <p>
                        <strong>Age:</strong> {u.age}
                      </p>
                    </div>

                    {u.id && (
                      <Button size="sm" onClick={() => getUserById(u.id!)}>
                        View Details
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card> */}
          </div>
        )}
        <Card className="w-96 mt-4">
          <CardHeader>
            <CardTitle>Get User by ID</CardTitle>
            <CardDescription>
              Click View Details to fetch user by ID
            </CardDescription>
          </CardHeader>
          <CardContent>
            {datauser.length > 0 ? (
              datauser.map((u, index) => (
                <div
                  key={u.id ?? index}
                  className="mt-4 border-b pb-2 last:border-b-0 flex justify-between items-center"
                >
                  <div>
                    <p>
                      <strong>Name:</strong> {u.name}
                    </p>
                    <p>
                      <strong>Age:</strong> {u.age}
                    </p>
                  </div>

                  {u.id && (
                    <Link href={`/user/${u.id}`}>
                      <Button size="sm">View Details</Button>
                    </Link>
                  )}
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">
                No users available. Add one first!
              </p>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
