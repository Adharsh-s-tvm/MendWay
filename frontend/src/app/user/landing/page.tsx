"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Search,
  MapPin,
  Clock,
  Star,
  Users,
  Shield,
  Zap,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import ServiceCard from "@/components/ServiceCard";

// Move hero-image.jpg into /public directory in Next.js
const heroImage = "/hero-image.jpg";

const Landing = () => {
  const services = [
    {
      id: "1",
      title: "Plumbing Services",
      description:
        "Professional plumbing repair, installation, and maintenance services for your home.",
      price: "$50",
      rating: 4.8,
      reviewCount: 342,
      duration: "1-3 hours",
      category: "Home Repair",
      icon: ({ className }: { className?: string }) => (
        <div className={className}>🔧</div>
      ),
    },
    {
      id: "2",
      title: "House Cleaning",
      description:
        "Thorough cleaning services to keep your home spotless and organized.",
      price: "$30",
      rating: 4.9,
      reviewCount: 567,
      duration: "2-4 hours",
      category: "Cleaning",
      icon: ({ className }: { className?: string }) => (
        <div className={className}>🧽</div>
      ),
    },
    {
      id: "3",
      title: "Electrical Work",
      description:
        "Licensed electricians for all your electrical installation and repair needs.",
      price: "$75",
      rating: 4.7,
      reviewCount: 234,
      duration: "1-2 hours",
      category: "Home Repair",
      icon: ({ className }: { className?: string }) => (
        <div className={className}>⚡</div>
      ),
    },
    {
      id: "4",
      title: "Handyman Services",
      description:
        "General maintenance, furniture assembly, and small home improvement tasks.",
      price: "$40",
      rating: 4.8,
      reviewCount: 456,
      duration: "1-3 hours",
      category: "Maintenance",
      icon: ({ className }: { className?: string }) => (
        <div className={className}>🔨</div>
      ),
    },
  ];

  const features = [
    {
      icon: Shield,
      title: "Verified Workers",
      description:
        "All our workers are background-checked and verified professionals.",
    },
    {
      icon: Zap,
      title: "Quick Booking",
      description:
        "Book services in minutes with our streamlined booking process.",
    },
    {
      icon: Star,
      title: "Quality Guaranteed",
      description: "We ensure high-quality service with our satisfaction guarantee.",
    },
  ];

  const steps = [
    {
      step: "01",
      title: "Search Services",
      description: "Find the service you need from our wide range of categories.",
    },
    {
      step: "02",
      title: "Choose Worker",
      description: "Browse profiles, read reviews, and select the perfect worker.",
    },
    {
      step: "03",
      title: "Book & Meet",
      description: "Schedule your service and connect via video call when ready.",
    },
    {
      step: "04",
      title: "Pay Securely",
      description: "Pay safely through our platform after service completion.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt="Hero"
            fill
            priority
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Find Trusted{" "}
              <span className="bg-gradient-to-r from-accent-light to-success bg-clip-text text-transparent">
                Workers
              </span>{" "}
              Near You
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
              Connect with verified professionals for all your home and business
              needs. Book services in minutes, meet over video, and pay securely.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <Card className="glass shadow-custom-xl">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        placeholder="What service do you need?"
                        className="pl-10 h-12 border-0 focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div className="flex-1 relative">
                      <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                      <Input
                        placeholder="Enter your location"
                        className="pl-10 h-12 border-0 focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <Button className="h-12 px-8 bg-gradient-primary hover:bg-gradient-primary hover:opacity-90 shadow-glow">
                      Search
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>1000+ Services</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>Verified Workers</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>Same-day Service</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Services</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Browse our most requested services and find the perfect worker for
              your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ServiceCard {...service} />
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/services">
              <Button size="lg" variant="outline" className="hover-lift">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose WorkerHub?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We make it easy to find and book trusted professionals for any job
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={feature.title}
                className="hover-lift group animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get your job done in 4 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={step.step}
                className="text-center animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto shadow-glow">
                    <span className="text-2xl font-bold text-white">
                      {step.step}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary to-transparent transform translate-x-1/2"></div>
                  )}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of satisfied customers who trust WorkerHub for their
              service needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button
                  size="lg"
                  variant="secondary"
                  className="hover-lift shadow-custom-lg"
                >
                  Sign Up Now
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-white hover:bg-white hover:text-primary hover-lift"
                >
                  Browse Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
