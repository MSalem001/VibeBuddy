"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface User {
  id: string;
  name: string;
  age: number;
  is_adult: boolean;
}
export default function userDetails() {
  const param = useParams();
  const router = useRouter();
  const id = param.userByID as string;;

  const [user, setuser] = useState<User | null>(null);
  const [loading, isLoading] = useState(true);

  useEffect(() => {
    async function userId() {
      isLoading(true);
      try {
        const res = await fetch(`http://127.0.0.1:8000/user/${id}`);
        if (!res.ok) {
          if (res.status === 404) throw new Error("The user is unfound");
          if (res.status === 422) throw new Error("The ID is uncorrect");
          throw new Error(`Error! status: ${res.status}`);
        }
        const data: User = await res.json();
        setuser(data);
      } catch (error) {
        console.error(error);
        console.log("The user is unfound or the ID is uncorrect");
      } finally {
        isLoading(false);
      }
    }
    userId();
  }, [id]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 p-8 dark:bg-black">
      {loading && <p className="text-lg">Loading user details...</p>}

      {!loading && user && (
        <Card className="w-96">
          <CardHeader>
            <CardTitle>{user.name}</CardTitle>
            <CardDescription className="text-xs break-all">
              ID: {user.id}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              <strong>Age:</strong> {user.age}
            </p>
            <p>
              <strong>Is Adult:</strong> {user.is_adult ? "Yes" : "No"}
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={() => router.push("/")}>
              ← Back to Users List
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
