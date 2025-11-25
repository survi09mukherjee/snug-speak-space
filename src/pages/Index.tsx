import Header from "@/components/Header";
import SystemTime from "@/components/SystemTime";
import WeatherCard from "@/components/WeatherCard";
import TrainSection from "@/components/TrainSection";
import SystemTopology from "@/components/SystemTopology";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="container mx-auto px-6 py-8 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <SystemTime />
          <WeatherCard />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <TrainSection direction="upline" />
          <TrainSection direction="downline" />
        </div>

        <SystemTopology />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
