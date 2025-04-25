
import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, MessageCircle, ThumbsUp, Calendar, Tag, User, Users, Clock, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
    initials: string;
  };
  category: string;
  tags: string[];
  datePosted: Date;
  likes: number;
  replies: number;
  solved?: boolean;
}

const samplePosts: ForumPost[] = [
  {
    id: "1",
    title: "Best practices for workflow automation in finance?",
    content: "I'm looking to automate our invoice processing workflow. Has anyone implemented something similar? What tools and approaches worked best for you?",
    author: {
      name: "Sarah Johnson",
      initials: "SJ",
    },
    category: "Workflows",
    tags: ["finance", "invoices", "automation"],
    datePosted: new Date(2025, 2, 15),
    likes: 24,
    replies: 8,
    solved: true,
  },
  {
    id: "2",
    title: "How to create custom form validations?",
    content: "I need to implement some custom validation rules for our customer onboarding form. Any tips on how to do this efficiently?",
    author: {
      name: "Michael Chen",
      initials: "MC",
    },
    category: "Forms",
    tags: ["forms", "validation", "onboarding"],
    datePosted: new Date(2025, 3, 2),
    likes: 15,
    replies: 12,
  },
  {
    id: "3",
    title: "Integrating external APIs with VegamAI",
    content: "I want to connect our CRM system with VegamAI workflows. Has anyone done this successfully? Looking for guidance on best practices.",
    author: {
      name: "Alex Rivera",
      initials: "AR",
    },
    category: "Integrations",
    tags: ["api", "crm", "integration"],
    datePosted: new Date(2025, 3, 10),
    likes: 32,
    replies: 17,
    solved: true,
  },
  {
    id: "4",
    title: "Dashboard performance optimization techniques?",
    content: "Our analytics dashboard is getting slow as we add more data. What are some ways to improve performance without sacrificing functionality?",
    author: {
      name: "Priya Patel",
      initials: "PP",
    },
    category: "Dashboards",
    tags: ["performance", "analytics", "optimization"],
    datePosted: new Date(2025, 3, 18),
    likes: 19,
    replies: 9,
  },
  {
    id: "5",
    title: "Using AI to generate workflow suggestions",
    content: "I'm curious about how others are using VegamAI to generate workflow suggestions. What prompts work best for complex business processes?",
    author: {
      name: "Jordan Taylor",
      initials: "JT",
    },
    category: "AI Features",
    tags: ["ai", "prompts", "workflows"],
    datePosted: new Date(2025, 3, 20),
    likes: 41,
    replies: 23,
  },
];

const categories = ["All", "Workflows", "Forms", "Dashboards", "Integrations", "AI Features", "General"];

const ForumPostCard = ({ post }: { post: ForumPost }) => {
  return (
    <Card className="mb-4 hover:border-primary/40 transition-colors cursor-pointer">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-1 mb-1">
              <Badge variant="outline" className="text-xs py-0 h-5">
                {post.category}
              </Badge>
              {post.solved && (
                <Badge variant="secondary" className="text-xs py-0 h-5 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  Solved
                </Badge>
              )}
            </div>
            <CardTitle className="text-lg font-medium">{post.title}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground line-clamp-2">{post.content}</p>
        <div className="flex flex-wrap gap-1 mt-2">
          {post.tags.map(tag => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-1 text-sm text-muted-foreground">
        <div className="flex flex-wrap justify-between items-center w-full">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={post.author.avatar} />
              <AvatarFallback>{post.author.initials}</AvatarFallback>
            </Avatar>
            <span>{post.author.name}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>{post.datePosted.toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <ThumbsUp size={14} />
              <span>{post.likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle size={14} />
              <span>{post.replies}</span>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

const Community = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("discussions");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredPosts = samplePosts.filter(post => {
    if (selectedCategory !== "All" && post.category !== selectedCategory) {
      return false;
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        post.title.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    return true;
  });
  
  const handleNewPost = () => {
    toast({
      title: "Create post",
      description: "This feature is coming soon!"
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      
      <div className="flex-1 md:ml-64">
        <div className="container mx-auto py-6 px-4 md:px-6">
          <header className="mb-6">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Users size={28} /> Community Forum
            </h1>
            <p className="text-muted-foreground">
              Connect with other VegamAI users, share ideas, and get help with your automation projects.
            </p>
          </header>
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-3/4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div className="flex items-center">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList>
                      <TabsTrigger value="discussions">Discussions</TabsTrigger>
                      <TabsTrigger value="questions">Questions</TabsTrigger>
                      <TabsTrigger value="announcements">Announcements</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                
                <Button onClick={handleNewPost} className="whitespace-nowrap">New Post</Button>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search discussions..." 
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <Filter size={16} />
                  <span className="text-sm">Filter:</span>
                  <select 
                    className="text-sm bg-transparent border-none focus:outline-none cursor-pointer"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsContent value="discussions" className="mt-0">
                  {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                      <ForumPostCard key={post.id} post={post} />
                    ))
                  ) : (
                    <div className="text-center py-12 border rounded-lg">
                      <p className="text-muted-foreground">No discussions found matching your criteria.</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="questions" className="mt-0">
                  <div className="text-center py-12 border rounded-lg">
                    <p className="text-muted-foreground">Questions tab content coming soon.</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="announcements" className="mt-0">
                  <div className="text-center py-12 border rounded-lg">
                    <p className="text-muted-foreground">Announcements tab content coming soon.</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="w-full md:w-1/4 space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Community Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Members</span>
                    <span className="font-medium">3,487</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Discussions</span>
                    <span className="font-medium">412</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Comments</span>
                    <span className="font-medium">2,851</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Top Contributors</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { name: "Alex Rivera", initials: "AR", posts: 42 },
                    { name: "Sarah Johnson", initials: "SJ", posts: 37 },
                    { name: "Priya Patel", initials: "PP", posts: 28 },
                    { name: "Jordan Taylor", initials: "JT", posts: 23 },
                  ].map((user, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7">
                          <AvatarFallback>{user.initials}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{user.name}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {user.posts} posts
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Popular Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1">
                    {["workflows", "automation", "ai", "forms", "integration", "dashboards", "api", "tips"].map((tag) => (
                      <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-primary/5">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
