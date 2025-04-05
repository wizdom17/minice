import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { ArrowRight } from "lucide-react"

export default function GiftCardCalculator() {
  return (
    <div className="flex flex-col lg:flex-row min-h-[80vh] lg:px-20 px-5">
      <div className="flex-1 p-4 md:p-8 lg:p-16 flex flex-col justify-center">
        <div className="max-w-2xl">
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">New</span>
            <span className="text-gray-500 text-sm flex items-center">
              Updated a few minutes ago <ArrowRight className="ml-1 h-3 w-3" />
            </span>
          </div>

          <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold text-navy-900 mb-6">
            Current Rates Of Gift Cards - In Naira, Cedis, & USD
          </h1>

          <p className="text-gray-600 md:text-lg text-[16px]">
            With our automated gift card rate calculator, you can get the rate of any gift card in real-time. Rates are
            updated frequently, multiple times daily, as the market value is volatile.
          </p>
        </div>
      </div>

      <div className="lg:w-[550px] bg-primary-bg rounded-md mt-5 lg:mt-0 p-8 lg:p-12 flex items-center">
        <div className="w-full space-y-6 bg-white p-4 rounded-md">
          <div className="space-y-2">
            <label htmlFor="category" className="text-gray-700 font-medium">
              Gift Card Category
            </label>
            <Select>
              <SelectTrigger className="w-full h-14 border-gray-300">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="amazon">Amazon</SelectItem>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="google">Google Play</SelectItem>
                <SelectItem value="steam">Steam</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="subcategory" className="text-gray-700 font-medium">
              Gift Card Subcategory
            </label>
            <Select>
              <SelectTrigger className="w-full h-14 border-gray-300">
                <SelectValue placeholder="Select Subcategory" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="physical">Physical</SelectItem>
                <SelectItem value="digital">Digital</SelectItem>
                <SelectItem value="ecode">E-Code</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="amount" className="text-gray-700 font-medium">
              Amount
            </label>
            <Input id="amount" type="number" placeholder="0" className="h-14 border-gray-300" />
          </div>

          <div className="space-y-2">
            <label htmlFor="payoutMethod" className="text-gray-700 font-medium">
              Payout Method
            </label>
            <div className="flex gap-3">
              <Select>
                <SelectTrigger className="w-full h-14 border-gray-300">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bank">Bank Transfer</SelectItem>
                  <SelectItem value="crypto">Cryptocurrency</SelectItem>
                  <SelectItem value="mobile">Mobile Money</SelectItem>
                </SelectContent>
              </Select>
              <Input className=" border-gray-300" />
            </div>
          </div>

          <Button className="w-full h-14 cursor-pointer bg-blue-500 hover:bg-blue-600 text-white rounded-md font-medium">
            Check Best Rates <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

