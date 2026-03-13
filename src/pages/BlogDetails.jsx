import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';

export default function BlogDetails() {
  const { id } = useParams();
  const { data, loading, error } = useFetch(`/blog/${id}`);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !data?.data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Kunne ikke indlæse blogindlæg</p>
      </div>
    );
  }

  const blog = data.data;

  return (
    <>
      {/* Hero Header with Title */}
      <section className="bg-dark pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-heading font-black text-3xl md:text-5xl uppercase text-white leading-tight">
            {blog.title}
          </h1>
        </div>
      </section>

      {/* Blog Content */}
      <article className="bg-white py-12 md:py-16 px-6">
        <div className="max-w-2xl mx-auto">
          {/* Blog Image */}
          <div className="mb-8 md:mb-12">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Title (repeated for article context) */}
          <h2 className="font-heading font-black text-xl md:text-2xl uppercase text-dark text-center mb-8 leading-tight">
            {blog.title}
          </h2>

          {/* Content paragraphs */}
          <div className="text-dark/80 leading-loose space-y-6 text-sm md:text-base">
            {blog.content.split('\n').filter(p => p.trim()).map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Author and Date */}
          <div className="mt-12 pt-6 border-t border-gray-200 text-sm text-dark/60 italic">
            <p>Forfatter: {blog.author}</p>
            <p>Oprettet: {formatDate(blog.createdAt)}</p>
          </div>
        </div>
      </article>
    </>
  );
}