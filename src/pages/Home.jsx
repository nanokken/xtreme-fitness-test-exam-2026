import SubscriptionCards from "../components/SubscriptionCards";
import ServiceCards from "../components/ServiceCards";
export default function Home() {
    return (
        <div className="container mx-auto px-4 py-8 bg-orange-500">
            <h1 className="text-3xl font-bold mb-4">Home Xtreme Fitness</h1>
            <ServiceCards />
            <SubscriptionCards />
            </div>
    );
}