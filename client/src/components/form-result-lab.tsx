"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon, CalendarX2, Save } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Form,
  FormControl,
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
import type { ResultLab } from "@/types/lab"
import { addResultLab } from "@/api/action"
import { FormSchema } from "@/types/schema-from"
import { showErrorToast, showLoadingToast, showSuccessToast } from "@/lib/toast"
import { useNavigate } from "react-router-dom"


export function FormResultLab() {
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),

  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const formattedDate = new Date(data.date).toLocaleDateString('en-CA');
    const dataLab: ResultLab = {
      date: formattedDate,
      results: {
        glucose: data.glucose,
        cholesterol: {
          ldl: data.ldl,
          hdl: data.hdl,
          total: (data.hdl + data.ldl),
        },
        bloodPressure: {
          systolic: data.systolic,
          diastolic: data.diastolic
        }
      }
    }

    const toastId = showLoadingToast(
      {
        header: "🧬 Adding your result...",
        description: "Please wait while we save your medical data.",
      }
    )

    try {
      await addResultLab(dataLab)
      showSuccessToast(
        {
          id: toastId,
          header: "✅ Result added successfully!",
          description: "Your latest health data has been saved.",
        }
      )

    } catch (error) {
      showErrorToast({
        header: "Failed to add result",
        id: toastId,
        description: `${error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again."}`,
      });

    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-5">

          <FormField
            control={form.control}
            name="glucose"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Glucose</FormLabel>
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
                <div className="h-4">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />


          <FormField
            control={form.control}
            name="hdl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="-mb-">Cholesterol</FormLabel>

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
                <div className=" h-4 mb-2">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ldl"
            render={({ field }) => (
              <FormItem className="-mt-5">
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
                <div className="h-4">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="systolic"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blood Pressure</FormLabel>
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

                <div className="h-4 mb-2">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="diastolic"
            render={({ field }) => (
              <FormItem className="-mt-5">
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
                <div className="h-4">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
                <div className="flex flex-row items-end gap-5 w-full">
              <FormItem className="flex flex-col w-65 ">
                <FormLabel>Checkup Date</FormLabel>
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
                  <div className="mb-1.5">
                    <FormMessage />
                  </div>
                </div>
            )}
          />
          <Alert  className="-mt-">
            <CalendarX2 />
            <AlertTitle>Choose a new date.</AlertTitle>
            <AlertDescription>
              Please choose a date you haven't used for a previous checkup.
            </AlertDescription>
          </Alert>

          <hr className="my-5"></hr>
          <div className="flex flex-col items-start gap-9 sm:gap-0 sm:flex-row justify-between  sm:items-center">
            <div className="flex flex-row gap-2 dark:text-zinc-300">
              <Save />
              <p className="font-semibold">Save Lab</p>
            </div>
            <div className="flex flex-row gap-2">
              <div
                className="border-gray-300 dark:text-purple-400 dark:border-purple-400 dark:hover:bg-zinc-950 dark:bg-zinc-900 
                w-30 flex items-center justify-center text-purple-900 px-5 text-sm hover:bg-gray-100 cursor-pointer border-2 rounded-md border-purple-900 "
                onClick={() => navigate(-1)}
              >
                Back
              </div>
              <Button type="submit" className=" border-purple-900  border-2 dark:hover:border-purple-950 dark:hover:bg-purple-950 text-white bg-purple-900 w-35">Next</Button>
            </div>
            </div>
        </div>

      </form>
    </Form>
  )
}
