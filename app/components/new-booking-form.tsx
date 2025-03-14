"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Car, MapPin, User } from "lucide-react";
import axios from "axios";
import useSWR from "swr";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CitySelector from "./CitySelector";

// Fetch customers using Axios
const fetcher = (url: string) =>
  axios.get(url).then((res) => res.data);

// Form validation schema
const bookingFormSchema = z.object({
  customer: z.string({
    required_error: "Please select a customer",
  }),
  driver: z.string().optional(),
  car: z.string().optional(),
  pickupLocation: z.string().min(3, {
    message: "Pickup location must be at least 3 characters",
  }),
  dropLocation: z.string().min(3, {
    message: "Drop location must be at least 3 characters",
  }),
  fare: z.coerce.number().positive({
    message: "Fare must be a positive number",
  }),
  status: z.enum(["pending", "confirmed", "completed", "cancelled"], {
    required_error: "Please select a status",
  }),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

export default function NewBookingForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch customers from the API using Axios and SWR
  const { data: customers, error } = useSWR(
    "http://localhost:8080/api/customers",
    fetcher,
    { revalidateOnMount: true }
  );

  // Add new hooks to fetch drivers and cars
  const { data: drivers, error: driversError } = useSWR(
    "http://localhost:8080/api/drivers",
    fetcher
  );
  const { data: cars, error: carsError } = useSWR(
    "http://localhost:8080/api/cars",
    fetcher
  );

  // All hooks are called unconditionally
  const defaultValues: Partial<BookingFormValues> = {
    status: "pending",
  };

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues,
  });

  async function onSubmit(data: BookingFormValues) {
    setIsSubmitting(true);
    try {
      console.log("Form submitted:", data);

      axios.post("http://localhost:8080/api/bookings", data);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // router.push("/bookings");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (error) console.error("Failed to load customers:", error);
  if (driversError) console.error("Failed to load drivers:", driversError);
  if (carsError) console.error("Failed to load cars:", carsError);

  return (
    !customers || !drivers || !cars ? (
      <div>Loading...</div>
    ) : (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Booking Information</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="customer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a customer" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {customers.map((customer: { _id: string; name: string }) => (
                          <SelectItem key={customer._id} value={customer._id}>
                            <div className="flex items-center">
                              <User className="mr-2 h-4 w-4" />
                              {customer.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="driver"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Driver (Optional)</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a driver" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {drivers.map((driver:any) => (
                          <SelectItem key={driver._id} value={driver._id}>
                            <div className="flex items-center">
                              <User className="mr-2 h-4 w-4" />
                              {driver.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      You can assign a driver later
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="car"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Car (Optional)</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a car" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {cars.map((car:any) => (
                          <SelectItem key={car._id} value={car._id}>
                            <div className="flex items-center">
                              <Car className="mr-2 h-4 w-4" />
                              {car.model} ({car.licensePlate})
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      You can assign a car later
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="pickupLocation"
                render={({ field }) => (
                  <CitySelector
                    label="Pickup Location"
                    value={field.value}
                    onValueChange={(val) =>
                      form.setValue("pickupLocation", val)
                    }
                    errorMessage={form.formState.errors.pickupLocation?.message}
                  />
                )}
              />

              <FormField
                control={form.control}
                name="dropLocation"
                render={({ field }) => (
                  <CitySelector
                    label="Drop Location"
                    value={field.value}
                    onValueChange={(val) => form.setValue("dropLocation", val)}
                    errorMessage={form.formState.errors.dropLocation?.message}
                  />
                )}
              />

              <FormField
                control={form.control}
                name="fare"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fare</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <div className="absolute left-2.5 top-2.5 text-muted-foreground">
                          $
                        </div>
                        <Input
                          className="pl-8"
                          type="number"
                          placeholder="0.00"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <CardFooter className="flex justify-between px-0">
              <Button variant="outline" type="button" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Booking"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
    )
  );
}