import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    title: "Authentic Italian Cuisine",
    description:
      "Indulge in the authentic flavors of Italy with our handcrafted pasta dishes and wood-fired pizzas.",
    icon: "🍝",
  },
  {
    title: "Quality Ingredients",
    description:
      "We use only the freshest ingredients to create dishes that are both delicious and nutritious.",
    icon: "🍴",
  },
  {
    title: "Elegant atmosphere",
    description:
      "Warm, inviting ambiance with both indoor and outdoor seating options for the perfect dining experience.",
    icon: "🎉",
  },
  {
    title: "Exceptional Service",
    description:
      "Our passionate team ensures every guest feels like family, providing personalized service and attention to detail.",
    icon: "⭐",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-card to-background py-20 px-4  bg-[url(/banner.png)] bg-no-repeat md:bg-repeat sm:bg-center">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-bold text-primary mb-6 text-shadow-lg">
            Benvenuti a <span>Bella Vista</span>
          </h1>
          <p className="md:text-shadow-none text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experience authentic Italian cuisine crafted with passion and
            tradition. From handmade pasta to wood-fired pizzas, every dish
            tells a story of Italy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/booking">Book a Table</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/menu">View Menu</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Why Choose Bella Vista?
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                className="text-center hover:shadow-lg transition-shadow"
                key={index}
              >
                <CardContent className="p-4">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 border border-bg-secondary shadow">
                    <span className="text-2xl">{feature.icon}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Ready for an Unforgettable Experience?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Reserve your table today and let us transport you to the heart of
            Italy.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/booking">Make Reservation</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
