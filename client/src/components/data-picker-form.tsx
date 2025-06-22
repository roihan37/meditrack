"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"

const FormSchema = z.object({
  date: z.date({
    required_error: "A date of birth is required.",
  }),
  glucose: z
    .number({
      required_error: "Required",
      invalid_type_error: "Must be a number",
    })
    .min(1, { message: "Min 1" })
    .max(500, { message: "Max 500" }),

  ldl: z
    .number({
      required_error: "Required",
      invalid_type_error: "Must be a number",
    })
    .min(1, { message: "Min 1" })
    .max(300, { message: "Max 300" }),

  hdl: z
    .number({
      required_error: "Required",
      invalid_type_error: "Must be a number",
    })
    .min(1, { message: "Min 1" })
    .max(150, { message: "Max 150" }),

  systolic: z
    .number({
      required_error: "Required",
      invalid_type_error: "Must be a number",
    })
    .min(50, { message: "Min 50" })
    .max(250, { message: "Max 250" }),

  diastolic: z
    .number({
      required_error: "Required",
      invalid_type_error: "Must be a number",
    })
    .min(30, { message: "Min 30" })
    .max(150, { message: "Max 150" }),
});

export function DatePickerForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),

  })



  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data, '<<<<form data ');

    toast("You submitted the following values", {
      description: (
        <Button
      variant="outline"
      onClick={() =>
        toast("Event has been created", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        })
      }
    >
      Show Toast
    </Button>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <div className="flex flex-row justify-between h-5 items-end">
                <FormLabel>Checkup Date</FormLabel>
                <FormMessage />
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="glucose"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-row justify-between h-4 items-end">
                <FormLabel>Glucose</FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <Input
                  type="number"

                  placeholder="Glucose"
                  {...field}
                  value={field.value || ""}
                  onChange={(e) => {
                    const value = e.target.value.replace(/^0+/, "")
                    field.onChange(value ? Number(value) : "")
                  }}
                />
              </FormControl>

            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hdl"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-row justify-between h-4 items-end">
                <FormLabel>Cholesterol</FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <Input placeholder="High-Density Lipoprotein" type="number"
                  {...field}
                  value={field.value || ""}
                  onChange={(e) => {
                    const value = e.target.value.replace(/^0+/, "")
                    field.onChange(value ? Number(value) : "")
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ldl"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Low-Density Lipoprotein" type="number"
                  {...field}
                  value={field.value || ""}
                  onChange={(e) => {
                    const value = e.target.value.replace(/^0+/, "")
                    field.onChange(value ? Number(value) : "")
                  }}
                />
              </FormControl>

            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="systolic"
          render={({ field }) => (
            <FormItem>
              <div className="flex flex-row justify-between h-4 items-end">
                <FormLabel>Blood Pressure</FormLabel>
                <FormMessage />
              </div>
              <FormControl>
                <Input placeholder="Systolic" type="number"
                  {...field}
                  value={field.value || ""}
                  onChange={(e) => {
                    const value = e.target.value.replace(/^0+/, "")
                    field.onChange(value ? Number(value) : "")
                  }}
                />
              </FormControl>

            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="diastolic"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Diastolic" type="number"
                  {...field}
                  value={field.value || ""}
                  onChange={(e) => {
                    const value = e.target.value.replace(/^0+/, "")
                    field.onChange(value ? Number(value) : "")
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">Submit</Button>
      </form>
    </Form>
  )
}
