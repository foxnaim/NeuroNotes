export default function TrustedBy() {
  const companies = [
    'CrowdStrike',
    'Google',
    'Johnson & Johnson',
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <p className="text-center text-[#666666] text-sm font-semibold mb-8 uppercase tracking-wider">
          Trusted by leading organizations
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16">
          {companies.map((company, index) => (
            <div 
              key={index}
              className="text-2xl font-bold text-[#999999] hover:text-[#666666] transition-colors"
            >
              {company}
            </div>
          ))}
        </div>
        <p className="text-center text-[#666666] text-sm mt-8">
          Trusted by leading organizations worldwide
        </p>
      </div>
    </section>
  );
}

