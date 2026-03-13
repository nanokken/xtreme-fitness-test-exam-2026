export default function PageHeader({ backgroundImage, title }) {
  return (
    <section 
      className="relative h-64 md:h-80 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50"></div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center pt-16">
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-wider font-heading">
          {title}
        </h1>
      </div>
    </section>
  );
}
