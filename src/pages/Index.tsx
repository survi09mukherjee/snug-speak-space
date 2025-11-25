import Header from "@/components/Header";
import SystemOverview from "@/components/SystemOverview";
import TrainSection from "@/components/TrainSection";
import TrainAnimation from "@/components/TrainAnimation";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8 flex-1">
        <div className="mb-6">
          <SystemOverview />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <TrainSection direction="upline" />
            <TrainSection direction="downline" />
          </div>
          <TrainAnimation />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
