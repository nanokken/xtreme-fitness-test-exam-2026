import { useFetch } from '../hooks/useFetch';
import { Link } from 'react-router-dom';

const LatestBlogPosts = () => {
  const { data, loading, error } = useFetch('/blogs');

  if (loading) {
    return (
      <section className="py-12 lg:py-20 bg-light">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500">Indlæser blogindlæg...</p>
        </div>
      </section>
    );
  }

  if (error || !data?.data) {
    return null;
  }

  // Sort by createdAt descending and take newest 3
  const sortedBlogs = [...data.data]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'];
    const month = months[date.getMonth()];
    return { day, month };
  };

  return (
    <section className="py-12 lg:py-20 bg-light">
      <div className="container mx-auto px-4">
        {/* Header - only on mobile */}
        <div className="text-center mb-8 lg:hidden">
          <p className="text-secondary uppercase tracking-widest text-sm mb-2 font-heading">
            Vores Nyheder
          </p>
          <h2 className="text-dark text-2xl font-bold uppercase font-heading">
            Seneste Blogindlæg
          </h2>
        </div>

        {/* Blog cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {sortedBlogs.map((blog, index) => {
            const { day, month } = formatDate(blog.createdAt);
            return (
              <article
                key={blog._id}
                className={`text-center ${index > 0 ? 'hidden lg:block' : ''}`}
              >
                {/* Image with date badge */}
                <div className="relative mb-4">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-64 object-cover"
                  />
                  {/* Date badge */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                    <div className="bg-primary text-light rounded-full w-16 h-16 flex flex-col items-center justify-center">
                      <span className="text-xl font-bold leading-none">{day}</span>
                      <span className="text-xs">{month}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="pt-8 px-4">
                  <h3 className="text-dark text-lg font-bold uppercase mb-3 font-heading">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {blog.teaser}
                  </p>
                  <Link
                    to={`/blog/${blog._id}`}
                    className="text-primary hover:text-secondary transition-colors font-medium"
                  >
                    Læs mere
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LatestBlogPosts;
