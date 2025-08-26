import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-card to-background py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Benvenuti a <span className="text-primary">Bella Vista</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experience authentic Italian cuisine crafted with passion and tradition. From handmade pasta to wood-fired
            pizzas, every dish tells a story of Italy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/book">Book a Table</Link>
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
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">Why Choose Bella Vista?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🍝</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Authentic Recipes</h3>
                <p className="text-muted-foreground">
                  Traditional Italian recipes passed down through generations, made with the finest imported
                  ingredients.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏛️</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Elegant Atmosphere</h3>
                <p className="text-muted-foreground">
                  Warm, inviting ambiance with both indoor and outdoor seating options for the perfect dining
                  experience.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⭐</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Exceptional Service</h3>
                <p className="text-muted-foreground">
                  Our passionate team ensures every guest feels like family, providing personalized service and
                  attention to detail.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">Ready for an Unforgettable Experience?</h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Reserve your table today and let us transport you to the heart of Italy.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/book">Make Reservation</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}