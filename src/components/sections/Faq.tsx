import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQSection() {
  const faqs = [
    {
      question: "How do I start my property search?",
      answer:
        "You can begin by using our search bar at the top of the page. Filter by location, property type, and your preferred dates. Our advanced search features help you find exactly what you're looking for.",
    },
    {
      question: "What documents do I need to buy a property?",
      answer:
        "Required documents typically include valid ID, proof of income, bank statements, and proof of address. Our agents will guide you through the specific requirements based on your situation and location.",
    },
    {
      question: "How long does the buying process take?",
      answer:
        "The timeline varies depending on various factors, but typically takes 30-90 days from offer acceptance to closing. Our experienced team works to make the process as efficient as possible.",
    },
    {
      question: "Do you offer virtual property tours?",
      answer:
        "Yes, we offer high-quality virtual tours for most of our listed properties. This allows you to explore properties remotely before scheduling an in-person viewing.",
    },
    {
      question: "What are the payment terms?",
      answer:
        "We offer flexible payment terms and can help connect you with trusted financial partners. Payment options vary by property and may include mortgages, installment plans, or full payment.",
    },
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about our services and property
            buying process.
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-semibold text-xl no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
