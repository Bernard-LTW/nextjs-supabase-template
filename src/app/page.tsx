import Hero from "@/components/hero";


export default async function Home() {
  return (
    <>
      <Hero />
      <main className="flex-1 flex flex-col gap-6 px-4">
        <p>
          This is a modified version of the official Next.js and Supabase template with additional features. Most of the credit goes to the original creator of the template. I just made some changes to help myself to get up and running quicker.
        </p>
      </main>
    </>
  );
}
