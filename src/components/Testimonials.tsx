export default function Testimonials() {
  const testimonials = [
    {
      name: 'Jared',
      text: 'Cybrary is just an amazing platform. Literally thousands of hours of quality content. You can find a course or a lab for just about everything, and they are constantly releasing new material. They also have highly responsive customer service. It\'s been worth every penny.',
    },
    {
      name: 'Bradly',
      text: 'Greatest investment I have made to date. Cybrary is solely responsible for my passing the CompTIA A+ exam and is the reason I am going into my Net+ with confidence. I have learned a great deal through virtual labs, practice tests, recorded lessons, and the various other things they offer.',
    },
    {
      name: 'JPM',
      text: 'Training is cool. Easy to enroll, instructors are enthusiastic and professional, technical stuff is very well explained.',
    },
    {
      name: 'Justin B.',
      role: 'IT Specialist',
      text: 'The interviewer said the certifications and training I had completed on my own time showed that I was a quick learner, and they gave me a job offer.',
    },
    {
      name: 'Gabby H.',
      role: 'Senior Security Analyst',
      text: 'All of the knowledge, skills, and abilities gained through the program were essential to me impressing the employer during the interview.',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-4">
            Words from our users
          </h2>
          <p className="text-[#666666] text-lg">
            Join 3 million+ users, including 96% of Fortune 1000 companies who use our platform to upskill their teams. See what the buzz is about - start learning for free!
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <blockquote 
              key={index} 
              className="bg-[#f8f9fa] rounded-lg p-6"
              itemScope
              itemType="https://schema.org/Review"
            >
              <p className="text-[#666666] mb-4 leading-relaxed" itemProp="reviewBody">
                &quot;{testimonial.text}&quot;
              </p>
              <footer>
                <p className="font-semibold text-[#1a1a1a]" itemProp="author" itemScope itemType="https://schema.org/Person">
                  <span itemProp="name">{testimonial.name}</span>
                </p>
                {testimonial.role && (
                  <p className="text-sm text-[#666666]" itemProp="jobTitle">{testimonial.role}</p>
                )}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

