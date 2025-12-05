import Header from "@/components/Header";
import SystemOverview from "@/components/SystemOverview";
import TrainSection from "@/components/TrainSection";
import TrainAnimation from "@/components/TrainAnimation";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <Header />
      
      <main className="container mx-auto px-4 py-3 flex-1 flex flex-col gap-3">
        <SystemOverview />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TrainSection direction="upline" />
          <TrainSection direction="downline" />
        </div>

        <TrainAnimation />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
