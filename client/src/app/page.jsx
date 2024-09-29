import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 home">
      <Link href="/login">Login</Link>
      <div>- Or -</div>
      <Link href="/signup">Signup</Link>
    </main>
  );
}