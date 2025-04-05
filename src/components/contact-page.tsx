"use client"

import type React from "react"

import { useState } from "react"
import { Facebook, Instagram, Linkedin, Mail, MessageSquare, Phone, Youtube } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    issueType: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, issueType: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Add your form submission logic here
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-navy-900 mb-10">Get In Touch Today!</h1>

        {/* Social Media Icons */}
        <div className="flex justify-center gap-4 mb-12">
          <a href="#" className="rounded-full bg-white p-2 shadow-sm">
            <Facebook className="h-6 w-6 text-[#1877F2]" />
          </a>
          <a href="#" className="rounded-full bg-white p-2 shadow-sm">
            <div className="h-6 w-6 bg-gradient-to-tr from-[#FFDC80] via-[#F56040] to-[#833AB4] rounded-md flex items-center justify-center">
              <Instagram className="h-5 w-5 text-white" />
            </div>
          </a>
          <a href="#" className="rounded-full bg-white p-2 shadow-sm">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"
                fill="black"
              />
            </svg>
          </a>
          <a href="#" className="rounded-full bg-white p-2 shadow-sm">
            <Youtube className="h-6 w-6 text-[#FF0000]" />
          </a>
          <a href="#" className="rounded-full bg-white p-2 shadow-sm">
            <Linkedin className="h-6 w-6 text-[#0A66C2]" />
          </a>
          <a href="#" className="rounded-full bg-white p-2 shadow-sm">
            <div className="h-6 w-6 bg-gradient-to-tr from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] rounded-full flex items-center justify-center">
              <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 1.5C6.2 1.5 1.5 6.2 1.5 12C1.5 17.8 6.2 22.5 12 22.5C17.8 22.5 22.5 17.8 22.5 12C22.5 6.2 17.8 1.5 12 1.5ZM18.75 10.5C18.75 14.25 15.75 17.25 12 17.25C8.25 17.25 5.25 14.25 5.25 10.5H7.5C7.5 13.05 9.45 15 12 15C14.55 15 16.5 13.05 16.5 10.5H18.75Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </a>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-white shadow-sm">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="bg-blue-500 rounded-full p-3 mb-4">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-xl font-bold mb-1">Call Us</h2>
              <p className="text-gray-600">+2342017003146</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="bg-blue-500 rounded-full p-3 mb-4">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-xl font-bold mb-1">Mail Us</h2>
              <p className="text-gray-600">help@prestmit.io (Support)</p>
              <p className="text-gray-600">partners@prestmit.io (Others)</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className="bg-blue-500 rounded-full p-3 mb-4">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-xl font-bold mb-1">Live Chat</h2>
              <Button className="bg-blue-500 hover:bg-blue-600 mt-2">Chat Now</Button>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <Card className="bg-white shadow-sm max-w-4xl mx-auto">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="fullName" className="font-medium">
                  Full Name
                </label>
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder="john doe"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="font-medium">
                  Your Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@yourmail.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="issueType" className="font-medium">
                  Issue Type
                </label>
                <Select onValueChange={handleSelectChange} value={formData.issueType}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="select issue type" />
                  </SelectTrigger>
                  <SelectContent className="w-full">
                    <SelectItem value="support">Support</SelectItem>
                    <SelectItem value="billing">Billing</SelectItem>
                    <SelectItem value="feature">Feature Request</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="font-medium">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="what do you need?"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label htmlFor="message" className="font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="hello there, give us more details here..."
                  rows={20}
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <div className="md:col-span-2 flex justify-center mt-4">
                <Button type="submit" className="bg-blue-500 hover:bg-blue-600 px-8">
                  Send Message
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

