import Card from "./Card";

// Create an array of objects that contains the data for each service
const services = [
  {
    image: "../../../injec.jpg",
    title: "Primary Care",
    description:
      "We provide comprehensive and personalized primary care for patients of all ages, from newborns to seniors.",
  },
  {
    image: "../../../doc1.jpg",
    title: "Specialized Treatments",
    description:
      "We offer a range of specialized treatments for various conditions, such as diabetes, asthma, allergies, arthritis, and more.",
  },
  {
    image: "../../../teddy.jpg",
    title: "Preventive Health",
    description:
      "We help you prevent diseases and maintain your health with regular check-ups, screenings, immunizations, and lifestyle advice.",
  },
];

const Work = () => {
    return (
      <div className="w-full min-h-screen bg-[url('../../../make.jpg')]">
            
    <div className="relative  pt-24 px-4 mx-auto max-w-7xl">
                   <h1 className="mb-20 relative font-['Helvetica_Now_Display'] text-3xl leading-[.8] md:text-4xl  md:leading-[.8] font-semibold text-zinc-900">
              Featured Services
        </h1>
      {/* Use grid and gap to create a card layout */}
      <div className="flex flex-wrap gap-2">
        {/* Map over the services array and render a Card component for each object */}
        {services.map((service, index) => (
          // Pass the data as props to the Card component
          <Card key={index}
            image={service.image}
            title={service.title}
            description={service.description}
          />
        ))}
      </div>
            </div>
      </div>
            
  );
};

export default Work;
