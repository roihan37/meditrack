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
import { Icon12Hours, IconActivityHeartbeat } from "@tabler/icons-react"

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



  async function onSubmit(data: z.infer<typeof FormSchema>)  {
    const date = new Date(data.date);
    const formattedDate = date.toISOString().split('T')[0];
    const addReultForm = {
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
    const toastId = toast.loading("🧬 Adding your result...", {
      position: "top-right",
      description: "Please wait while we save your medical data.",
      duration: 999999, // tidak auto close
    });

    try {
            const access_token = localStorage.getItem("access_token")
            const headers: HeadersInit = {
              'Content-Type': 'application/json',
            }
          
            if (access_token) {
              headers["access_token"] = access_token
            }

            const response = await fetch('http://localhost:3000/lab-results',{
            method : 'POST',
            headers,
            body : JSON.stringify(addReultForm)
            })

            const responseJson = await response.json()
            if(!response.ok){
                throw new Error(responseJson.message)
            }
              
          
    toast.success("Result added successfully!", {
      id: toastId,
      position: "top-right",
      description: "Your latest health data has been saved.",
      duration : 10000
    });
            
            
              
            // navigate('/') 
            
        } catch (error) {
          toast.error("❌ Failed to add result", {
            id: toastId,
            position: "top-right",
            description: "Please try again later.",
          });
      
        }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-9">
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col ">
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
        <div></div>
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
         <div></div>
        
      
        
        
       
          <FormField
            control={form.control}
            name="hdl"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-row justify-between h-4 items-end cols-span-2">
                <FormLabel className="-mb-">Cholesterol</FormLabel>
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
                <div className="flex flex-row justify-between h-4 items-end">
                {/* <FormLabel>LDL</FormLabel> */}
                <FormMessage />
              </div>
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
              <div className="flex flex-row justify-between h-4 items-end">
                
                <FormMessage />
              </div>
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
              
            </FormItem>
          )}
        />
        </div>

        <Button type="submit" className="mt-10">Submit</Button>
      </form>
    </Form>
  )
}
