import Link from 'next/link';

export default function PopularCourses() {
  const courses = [
    {
      title: 'Defensive Security and Cyber Risk',
      hours: 35,
      minutes: 1,
      ceus: 1,
      free: false,
      description: 'Learn the basics of defensive security and cyber risk. Review foundational risk management concepts such as calculating risk and strategies for dealing with risk.',
    },
    {
      title: 'Comptia Security+ Certification Prep',
      hours: 18,
      minutes: 28,
      ceus: 10,
      free: true,
      description: 'CompTIA\'s Security+ is a globally recognized certification that equips IT professionals with cybersecurity principles and security best practices.',
    },
    {
      title: 'OSINT Certification Course & Training',
      hours: 1,
      minutes: 56,
      ceus: 2,
      free: true,
      description: 'Learn techniques for gathering intelligence from public data sources and how to leverage this knowledge to defend your organization.',
    },
    {
      title: 'Application of the MITRE ATT&CK Framework',
      hours: 8,
      minutes: 29,
      ceus: 10,
      free: true,
      description: 'Learn how to apply the MITRE ATT&CK matrix to help mitigate current threats. Move through the 12 core areas of the framework.',
    },
  ];

  return (
    <section className="py-20 bg-[#f8f9fa]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a]">
            Popular Cybersecurity Courses & Training
          </h2>
          <Link 
            href="/catalog"
            className="text-[#0066cc] hover:text-[#0052a3] font-semibold"
          >
            Full Catalog →
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, index) => (
            <article 
              key={index} 
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              itemScope
              itemType="https://schema.org/Course"
            >
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  {course.free && (
                    <span className="px-3 py-1 bg-[#00d4ff] text-white text-xs font-semibold rounded">
                      Free
                    </span>
                  )}
                  <span className="text-sm text-[#666666]">
                    {course.hours}H: {course.minutes}M
                  </span>
                  <span className="text-sm text-[#666666]">
                    {course.ceus} CEUS
                  </span>
                </div>
                <h3 className="text-xl font-bold text-[#1a1a1a] mb-2" itemProp="name">
                  {course.title}
                </h3>
                <p className="text-sm text-[#666666] mb-4" itemProp="description">
                  {course.description}
                </p>
                <Link 
                  href={`/courses/${course.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-[#0066cc] hover:text-[#0052a3] font-semibold"
                  itemProp="url"
                >
                  Learn More & Enroll →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

