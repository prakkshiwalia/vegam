
import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LifeBuoy, MessageSquare, FileText, ArrowRight, ExternalLink, Mail, PlayCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const supportTopics = [
  { id: "getting-started", label: "Getting Started" },
  { id: "workflows", label: "Workflows" },
  { id: "artifacts", label: "Artifacts" },
  { id: "ai-assistant", label: "AI Assistant" },
  { id: "dashboards", label: "Dashboards" },
  { id: "integrations", label: "Integrations" },
  { id: "billing", label: "Billing & Account" },
];

const faqs = [
  {
    question: "How do I create my first workflow?",
    answer: "To create your first workflow, navigate to the Workflows page and click on the New Workflow button. Fill in the required details, define your workflow steps, and save your workflow. You can also use the AI assistant to help you generate a workflow based on your description."
  },
  {
    question: "Can I export my workflows and artifacts?",
    answer: "Yes, you can export workflows and artifacts in various formats. From the respective detail page, click on the Export option in the top-right menu. You can choose to export as JSON, PDF, or share directly with team members."
  },
  {
    question: "How does VegamAI handle sensitive data?",
    answer: "VegamAI takes data security very seriously. All data is encrypted both in transit and at rest. We do not store any sensitive data unless explicitly configured to do so. You can also set up custom data retention policies from the Settings page."
  },
  {
    question: "What's the difference between workflows and artifacts?",
    answer: "Workflows represent business processes with sequential steps and decision points. Artifacts are individual components like forms, reports, and dashboards that can be used independently or as part of workflows."
  },
  {
    question: "How can I integrate VegamAI with my existing systems?",
    answer: "VegamAI offers various integration options through our API. You can connect to common business tools via our pre-built connectors, or use webhooks and our REST API for custom integrations. Visit the Integrations page to explore options."
  },
  {
    question: "Is there a limit to how many workflows I can create?",
    answer: "Free accounts can create up to 5 workflows and 10 artifacts. Professional accounts have higher limits or unlimited resources depending on your subscription tier. You can view your current usage in the Settings page."
  },
  {
    question: "How do I share my workflows with team members?",
    answer: "To share a workflow, open it and click on the Share button. You can invite team members by email and set their permission level (view, edit, or admin). Team members will receive an email notification with access instructions."
  },
];

const videoTutorials = [
  {
    id: "getting-started",
    title: "Getting Started with VegamAI",
    description: "Learn the basics of VegamAI and how to navigate the platform.",
    duration: "5:24",
    thumbnail: "https://placehold.co/320x180?text=Getting+Started",
  },
  {
    id: "workflows",
    title: "Creating Your First Workflow",
    description: "Step-by-step guide to creating efficient business workflows.",
    duration: "8:12",
    thumbnail: "https://placehold.co/320x180?text=First+Workflow",
  },
  {
    id: "ai-assistant",
    title: "Leveraging the AI Assistant",
    description: "Get the most out of VegamAI's intelligent automation features.",
    duration: "6:45",
    thumbnail: "https://placehold.co/320x180?text=AI+Assistant",
  },
  {
    id: "dashboards",
    title: "Building Interactive Dashboards",
    description: "Create insightful dashboards to visualize your business data.",
    duration: "10:18",
    thumbnail: "https://placehold.co/320x180?text=Dashboards",
  },
];

const Support = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("help-center");
  const [selectedTopic, setSelectedTopic] = useState("getting-started");
  const [searchQuery, setSearchQuery] = useState("");
  const [contactFormData, setContactFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const handleTopicClick = (topicId: string) => {
    setSelectedTopic(topicId);
  };
  
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent",
      description: "We've received your message and will respond shortly."
    });
    setContactFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const filteredFaqs = searchQuery
    ? faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs;

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      
      <div className="flex-1 md:ml-64">
        <div className="container mx-auto py-6 px-4 md:px-6">
          <header className="mb-6">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <LifeBuoy size={28} /> Help & Support
            </h1>
            <p className="text-muted-foreground">
              Get the answers and assistance you need to make the most of VegamAI.
            </p>
          </header>
          
          <div className="flex justify-center mb-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
                <TabsTrigger value="help-center">Help Center</TabsTrigger>
                <TabsTrigger value="faqs">FAQs</TabsTrigger>
                <TabsTrigger value="contact">Contact Us</TabsTrigger>
              </TabsList>
            
              <TabsContent value="help-center" className="mt-0">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="lg:w-1/4">
                    <Card className="mb-6">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Help Topics</CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="px-4 pb-4 flex flex-col">
                          {supportTopics.map((topic) => (
                            <Button 
                              key={topic.id} 
                              variant="ghost" 
                              className={`justify-start ${selectedTopic === topic.id ? 'bg-primary/10 text-primary' : ''}`}
                              onClick={() => handleTopicClick(topic.id)}
                            >
                              {topic.label}
                            </Button>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Need More Help?</CardTitle>
                        <CardDescription>Our support team is here to help you</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4 pb-2">
                        <div className="flex items-center gap-2">
                          <Mail size={18} className="text-primary" />
                          <span>support@vegamai.com</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MessageSquare size={18} className="text-primary" />
                          <span>Live Chat (8am-8pm EST)</span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full" onClick={() => setActiveTab("contact")}>
                          Contact Support
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                  
                  <div className="lg:w-3/4 space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Documentation</CardTitle>
                        <CardDescription>Comprehensive guides and resources for using VegamAI</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {[
                          { title: "User Guide", description: "Complete documentation of all VegamAI features", icon: FileText },
                          { title: "API Reference", description: "Technical documentation for developers", icon: ExternalLink },
                          { title: "Best Practices", description: "Tips and strategies for workflow automation", icon: FileText },
                          { title: "Release Notes", description: "Latest features and improvements", icon: FileText }
                        ].map((item, i) => (
                          <div key={i} className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                                <item.icon size={20} className="text-primary" />
                              </div>
                              <div>
                                <h3 className="font-medium">{item.title}</h3>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                              </div>
                            </div>
                            <ArrowRight size={18} className="text-muted-foreground" />
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Video Tutorials</CardTitle>
                        <CardDescription>Learn through step-by-step video walkthroughs</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {videoTutorials.map((video) => (
                            <div key={video.id} className="border rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
                              <div className="relative">
                                <img src={video.thumbnail} alt={video.title} className="w-full h-auto" />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors">
                                  <PlayCircle size={48} className="text-white" />
                                </div>
                                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                  {video.duration}
                                </div>
                              </div>
                              <div className="p-3">
                                <h3 className="font-medium">{video.title}</h3>
                                <p className="text-sm text-muted-foreground">{video.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="faqs" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Frequently Asked Questions</CardTitle>
                    <CardDescription>Find quick answers to common questions</CardDescription>
                    <div className="relative mt-4">
                      <Input 
                        placeholder="Search FAQs..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="max-w-md"
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[500px]">
                      {filteredFaqs.length > 0 ? (
                        <Accordion type="single" collapsible className="space-y-1">
                          {filteredFaqs.map((faq, index) => (
                            <AccordionItem key={index} value={`faq-${index}`}>
                              <AccordionTrigger className="hover:bg-gray-50 dark:hover:bg-gray-800 px-4 text-left">
                                {faq.question}
                              </AccordionTrigger>
                              <AccordionContent className="px-4 pb-4">
                                <p className="text-muted-foreground">{faq.answer}</p>
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      ) : (
                        <div className="text-center py-12">
                          <p className="text-muted-foreground">No FAQs found matching your search. Try a different query.</p>
                        </div>
                      )}
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="contact" className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Contact Support</CardTitle>
                        <CardDescription>Send us a message and we'll get back to you soon</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={handleContactSubmit} className="space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label htmlFor="name" className="text-sm font-medium">Name</label>
                              <Input 
                                id="name" 
                                name="name" 
                                value={contactFormData.name}
                                onChange={handleInputChange}
                                required 
                              />
                            </div>
                            <div className="space-y-2">
                              <label htmlFor="email" className="text-sm font-medium">Email</label>
                              <Input 
                                id="email" 
                                name="email" 
                                type="email" 
                                value={contactFormData.email}
                                onChange={handleInputChange}
                                required 
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                            <Input 
                              id="subject" 
                              name="subject" 
                              value={contactFormData.subject}
                              onChange={handleInputChange}
                              required 
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium">Message</label>
                            <Textarea 
                              id="message" 
                              name="message" 
                              rows={6} 
                              value={contactFormData.message}
                              onChange={handleInputChange}
                              required 
                            />
                          </div>
                          
                          <Button type="submit" className="w-full">Send Message</Button>
                        </form>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Contact Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <p className="text-sm font-medium">Email</p>
                          <p className="text-sm text-muted-foreground">support@vegamai.com</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Support Hours</p>
                          <p className="text-sm text-muted-foreground">Monday-Friday: 8am - 8pm EST</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Response Time</p>
                          <p className="text-sm text-muted-foreground">Within 24 hours</p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Other Support Options</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {[
                          { title: "Community Forum", description: "Get help from other VegamAI users" },
                          { title: "Live Chat", description: "Chat with our support team in real-time" },
                          { title: "Schedule a Call", description: "Book a video call with a product expert" }
                        ].map((option, i) => (
                          <Button key={i} variant="outline" className="w-full justify-start h-auto py-3 px-4">
                            <div className="text-left">
                              <h3 className="font-medium">{option.title}</h3>
                              <p className="text-xs text-muted-foreground">{option.description}</p>
                            </div>
                          </Button>
                        ))}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
