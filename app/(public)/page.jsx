import Hero from "@/components/Hero";
import LatestProducts from "@/components/LatestProducts";
import BestSelling from "@/components/BestSelling";
import Features from "@/components/Features"; // New Component below
import Newsletter from "@/components/Newsletter"; // New Component below

export default function Home() {
  return (
    // 'flex-col' ensures sections stack vertically. 
    // 'overflow-x-hidden' prevents horizontal scrollbars from large images.
    <main className="flex flex-col min-h-screen bg-white overflow-x-hidden w-full">
      
      {/* 1. Hero Section */}
      <section className="w-full relative">
        <Hero />
      </section>

      {/* 2. Features Section - distinct background */}
      <section className="w-full relative bg-white z-10">
         <Features />
      </section>

      {/* 3. Best Sellers - Added 'py' (padding-y) to force space */}
      <section className="w-full relative bg-white py-10">
        <BestSelling />
      </section>

      {/* 4. New Arrivals - Grey background to visually separate */}
      <section className="w-full relative bg-slate-50/50 py-10">
        <LatestProducts />
      </section>

      {/* 5. Newsletter */}
      <section className="w-full relative">
        <Newsletter />
      </section>

    </main>
  );
}
