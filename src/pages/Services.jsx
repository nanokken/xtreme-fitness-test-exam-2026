import ServiceCards from '../components/ServiceCards';

export default function Services() {
    return (
        <div className="pt-20 min-h-screen bg-white">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8 text-center uppercase tracking-wider">Vores Tjenester</h1>
            </div>
            <ServiceCards />
        </div>
    );
}