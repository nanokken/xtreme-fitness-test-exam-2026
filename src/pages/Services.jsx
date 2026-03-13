import ServiceCards from '../components/ServiceCards';
import Exercises from '../components/Exercises';
import LatestBlogPosts from '../components/LatestBlogPosts';
import PageHeader from '../components/PageHeader';
import servicesHeader from '../assets/headers/servicesHeader.png';

export default function Services() {
    return (
        <div>
            <PageHeader backgroundImage={servicesHeader} title="Tjenester" />
            <Exercises />
            <ServiceCards />
            <LatestBlogPosts />
        </div>
    );
}