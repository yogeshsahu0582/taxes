import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TaxSlider } from "@/components/TaxSlider";
import { Services } from "@/components/Services";
import { Footer } from "@/components/Footer";
import { Features } from "@/components/Features";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Features />
        <TaxSlider />
        <Services />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
