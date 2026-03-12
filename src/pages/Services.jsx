import ServiceCards from '../components/ServiceCards';
import Exercises from '../components/Exercises';
import LatestBlogPosts from '../components/LatestBlogPosts';

export default function Services() {
    return (
        <div >
            <Exercises />
            <ServiceCards />
            <LatestBlogPosts />
        </div>
    );
}